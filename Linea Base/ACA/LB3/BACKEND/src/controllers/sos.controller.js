// GET /api/sos - información de contención inmediata (contenido estático)
const getSOS = (req, res) => {
  res.status(200).json({
    mensaje: "Si estás pasando por una crisis, busca apoyo inmediato",
    recomendaciones: [
      "Respira profundamente durante un minuto.",
      "Contacta a un familiar o amigo de confianza.",
      "Acude al centro de salud más cercano si la situación empeora.",
    ],
    contactos: [
      { nombre: "Línea de salud mental (MINSA Perú)", telefono: "113" },
      { nombre: "Emergencias", telefono: "105" },
    ],
  });
};

module.exports = { getSOS };
