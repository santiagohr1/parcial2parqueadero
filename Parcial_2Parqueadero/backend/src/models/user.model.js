module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
        username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
        email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
        },
        password: {
        type: Sequelize.STRING,
        allowNull: false
        }
    });
    return User;
};