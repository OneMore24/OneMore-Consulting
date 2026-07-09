const mysql = require("mysql2/promise");

// Resuelve la configuración de la BD:
// - En la nube (Railway, etc.) suele venir una URL de conexión completa
//   (MYSQL_URL / DATABASE_URL).
// - En local se usan las variables individuales DB_* (.env).
function resolverConfig() {
  const url = process.env.MYSQL_URL || process.env.DATABASE_URL;
  if (url) {
    const u = new URL(url);
    return {
      host: u.hostname,
      port: Number(u.port) || 3306,
      user: decodeURIComponent(u.username),
      password: decodeURIComponent(u.password),
      database: u.pathname.replace(/^\//, ""),
    };
  }
  return {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "apoyo_emocional",
  };
}

// Pool de conexiones (más robusto que una conexión única para una API).
const pool = mysql.createPool({
  ...resolverConfig(),
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
    console.log("Conectado a MySQL");
  } catch (err) {
    console.error("Error de conexión a MySQL:", err.message);
  }
}

module.exports = pool;
module.exports.testConnection = testConnection;
