const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
    return res.status(403).send({
    message: "No se proporcionó token!"
    });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
        return res.status(401).send({
        message: "No autorizado!"
        });
    }
    req.userId = decoded.id;
    next();
});
};

isAdmin = (req, res, next) => {
    db.user.findByPk(req.userId, {
    include: [{
        model: db.role,
        as: "roles",
        through: { attributes: [] }
    }]
}).then(user => {
    const isAdmin = user.roles.some(role => role.name === "ADMINISTRADOR");
    if (isAdmin) {
        next();
        return;
    }
    res.status(403).send({
        message: "Requiere rol de Administrador!"
    });
    });
};

isAttendant = (req, res, next) => {
    db.user.findByPk(req.userId, {
    include: [{
        model: db.role,
        as: "roles",
        through: { attributes: [] }
    }]
}).then(user => {
    const isAttendant = user.roles.some(role => role.name === "ACOMODADOR");
    if (isAttendant) {
        next();
        return;
    }
    res.status(403).send({
        message: "Requiere rol de Acomodador!"
    });
    });
};

isAdminOrAttendant = (req, res, next) => {
    db.user.findByPk(req.userId, {
    include: [{
    model: db.role,
    as: "roles",
    through: { attributes: [] }
    }]
}).then(user => {
    const isAdmin = user.roles.some(role => role.name === "ADMINISTRADOR");
    const isAttendant = user.roles.some(role => role.name === "ACOMODADOR");
    
    if (isAdmin || isAttendant) {
    next();
    return;
    }
    res.status(403).send({
    message: "Requiere rol de Administrador o Acomodador!"
    });
});
};

const authJwt = {
    verifyToken,
    isAdmin,
    isAttendant,
    isAdminOrAttendant
};
module.exports = authJwt;