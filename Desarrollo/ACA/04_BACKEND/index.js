require("dotenv").config();

const app = require("./src/app");
const { testConnection } = require("./src/config/db");

const PORT = process.env.PORT || 3000;

// Verifica la conexión a la BD antes de aceptar tráfico
testConnection();

// Escucha en 0.0.0.0 para ser accesible desde otros dispositivos de la red
// local (p. ej. la app instalada en un celular en la misma Wi-Fi).
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor ACA corriendo en el puerto ${PORT}`);
});
