// Manejador global de errores. Las funciones async de los controladores
// reenvían aquí cualquier excepción mediante next(err).
const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Errores controlados que adjuntan un status propio
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  // Violación de UNIQUE (p. ej. correo duplicado) en MySQL
  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({ message: "El recurso ya existe" });
  }

  res.status(500).json({ message: "Error interno del servidor" });
};

module.exports = errorHandler;
