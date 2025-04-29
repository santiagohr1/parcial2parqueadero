module.exports = {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "parking_user",
    PASSWORD: process.env.DB_PASSWORD || "parking_password",
    DB: process.env.DB_NAME || "parking_db",
    dialect: "mysql",
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }
};