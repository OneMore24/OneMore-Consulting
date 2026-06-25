const jwt = require("jsonwebtoken");

// Verifica el token JWT enviado en la cabecera Authorization: Bearer <token>
// y expone el id del paciente autenticado en req.user.
const verifyToken = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id_paciente: payload.id_paciente };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

module.exports = { verifyToken };
