import React, { useState, useEffect } from "react";
import { Table, Space, Button, Tag, Input, message } from "antd";
import ParkingService from "../../services/parking.service";
import ParkingForm from "./ParkingForm";

const { Search } = Input;

const ParkingTable = ({ userRole }) => {
  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedParking, setSelectedParking] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchParkings();
  }, []);

  const fetchParkings = () => {
    setLoading(true);
    ParkingService.getAll()
      .then(response => {
        setParkings(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching parkings:", error);
        message.error("Error al cargar los registros");
        setLoading(false);
      });
  };

  const formatTime = (time) => {
    if (!time) return '-';
    const hours = Math.floor(time / 100);
    const minutes = time % 100;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const columns = [
    {
      title: 'Placa',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
    },
    {
      title: 'Hora Entrada',
      dataIndex: 'entryTime',
      key: 'entryTime',
      render: time => formatTime(time),
    },
    {
      title: 'Hora Salida',
      dataIndex: 'exitTime',
      key: 'exitTime',
      render: time => formatTime(time),
    },
    {
      title: 'Ubicación',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: status => (
        <Tag color={status === 'active' ? 'green' : 'volcano'}>
          {status === 'active' ? 'Activo' : 'Completado'}
        </Tag>
      ),
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            onClick={() => handleEdit(record)}
            disabled={userRole === 'CLIENTE'}
          >
            Editar
          </Button>
          <Button 
            danger 
            onClick={() => handleDelete(record.id)}
            disabled={userRole !== 'ADMINISTRADOR'}
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (parking) => {
    setSelectedParking(parking);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    ParkingService.remove(id)
      .then(() => {
        message.success("Registro eliminado correctamente");
        fetchParkings();
      })
      .catch(error => {
        console.error("Error deleting parking:", error);
        message.error("Error al eliminar el registro");
      });
  };

  const handleSearch = (value) => {
    setSearchText(value);
    if (value === "") {
      fetchParkings();
    } else {
      ParkingService.findByLicensePlate(value)
        .then(response => {
          setParkings(response.data);
        })
        .catch(error => {
          console.error("Error searching parkings:", error);
          message.error("Error en la búsqueda");
        });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Search
          placeholder="Buscar por placa"
          allowClear
          enterButton="Buscar"
          size="large"
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
        
        {userRole !== 'CLIENTE' && (
          <Button 
            type="primary" 
            onClick={() => {
              setSelectedParking(null);
              setShowForm(true);
            }}
          >
            Nuevo Registro
          </Button>
        )}
      </div>

        <Table 
        columns={columns} 
        dataSource={parkings} 
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        />

        {showForm && (
        <ParkingForm
            visible={showForm}
            onCancel={() => setShowForm(false)}
            onSuccess={() => {
            setShowForm(false);
            fetchParkings();
            }}
            record={selectedParking}
            userRole={userRole}
        />
        )}
    </div>
    );
};

export default ParkingTable;