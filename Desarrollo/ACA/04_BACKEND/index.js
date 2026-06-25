require("dotenv").config();

const app = require("./src/app");
const { testConnection } = require("./src/config/db");

const PORT = process.env.PORT || 3000;

// Verifica la conexión a la BD antes de aceptar tráfico
testConnection();

app.listen(PORT, () => {
  console.log(`Servidor ACA corriendo en el puerto ${PORT}`);
});
