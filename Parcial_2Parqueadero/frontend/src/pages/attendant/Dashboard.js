import React from 'react';
import { Layout, Typography, message } from 'antd';
import ParkingTable from '../../components/parking/ParkingTable';

const { Content } = Layout;
const { Title } = Typography;

const AttendantDashboard = () => {
    const handleEdit = (values) => {
    // Lógica específica para acomodador
    message.success('Ubicación actualizada correctamente');
};

    return (
    <Content style={{ padding: '24px' }}>
        <Title level={2}>Panel de Acomodador</Title>
        <ParkingTable onEdit={handleEdit} />
    </Content>
    );
};

export default AttendantDashboard;