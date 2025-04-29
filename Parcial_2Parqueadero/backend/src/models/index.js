const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
}
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.role = require("./role.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.vehicleType = require("./vehicle-type.model.js")(sequelize, Sequelize);
db.parking = require("./parking.model.js")(sequelize, Sequelize);

// Relaciones
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.user.hasMany(db.parking);
db.parking.belongsTo(db.user);

db.vehicleType.hasMany(db.parking);
db.parking.belongsTo(db.vehicleType);

db.ROLES = ["ADMINISTRADOR", "ACOMODADOR", "CLIENTE"];

module.exports = db;