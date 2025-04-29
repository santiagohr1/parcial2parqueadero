const { authJwt } = require("../middlewares");
const controller = require("../controllers/parking.controller");

module.exports = function(app) {
app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

    app.post(
    "/api/parking",
    [authJwt.verifyToken, authJwt.isAdminOrAttendant],
    controller.create
);

    app.get(
    "/api/parking",
    [authJwt.verifyToken],
    controller.findAll
);

    app.put(
    "/api/parking/:id",
    [authJwt.verifyToken, authJwt.isAdminOrAttendant],
    controller.update
);

    app.delete(
    "/api/parking/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.delete
);
};