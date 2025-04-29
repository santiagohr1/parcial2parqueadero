module.exports = {
    secret: process.env.JWT_SECRET || "parking_secret_key",
    jwtExpiration: 3600,          // 1 hora
    jwtRefreshExpiration: 86400   // 24 horas
};