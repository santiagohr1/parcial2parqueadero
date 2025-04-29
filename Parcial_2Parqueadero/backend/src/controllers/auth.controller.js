const db = require("../models");
const User = db.user;
const Role = db.role;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");

exports.signup = (req, res) => {
const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
});

user.save()
    .then(user => {
    Role.findOne({ where: { name: "CLIENTE" } })
        .then(role => {
        user.setRoles([role.id])
            .then(() => {
            res.send({ message: "Usuario registrado correctamente!" });
            });
        });
    })
    .catch(err => {
    res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
User.findOne({
    where: {
    username: req.body.username
    },
    include: [{
    model: Role,
    as: "roles",
    attributes: ["id", "name"],
    through: {
        attributes: []
    }
    }]
})
    .then(user => {
    if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
    }

    const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
    );

    if (!passwordIsValid) {
        return res.status(401).send({
        accessToken: null,
        message: "Contraseña inválida!"
        });
    }

        const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration
    });

        const authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());

    res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
    });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};