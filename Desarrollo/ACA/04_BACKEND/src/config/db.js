const mysql = require("mysql2/promise");

// Pool de conexiones (más robusto que una conexión única para una API).
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "apoyo_emocional",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Comprobación de arranque: avisa si la BD no está disponible.
async function testConnection() {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log("Conectado a MySQL (apoyo_emocional)");
  } catch (err) {
    console.error("Error de conexión a MySQL:", err.message);
  }
}

module.exports = pool;
module.exports.testConnection = testConnection;
