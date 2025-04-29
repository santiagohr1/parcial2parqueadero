module.exports = (sequelize, Sequelize) => {
    const VehicleType = sequelize.define("vehicleType", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
        },
        description: {
        type: Sequelize.STRING
}
    });  
    return VehicleType;
};