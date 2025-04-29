const app = require("./app");
const db = require("./models");
const Role = db.role;

const PORT = process.env.PORT || 8080;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Base de datos sincronizada");
  initial();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
});

function initial() {
  Role.create({
    id: 1,
    name: "ADMINISTRADOR"
  });
  
  Role.create({
    id: 2,
    name: "ACOMODADOR"
  });
  
  Role.create({
    id: 3,
    name: "CLIENTE"
});
}