const db = require("../config/db");

// GET /api/user/profile  (protegido)
const getProfile = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      `SELECT id_paciente, nombre_completo, correo, fecha_nacimiento, genero, fecha_registro
         FROM paciente WHERE id_paciente = ?`,
      [req.user.id_paciente]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(rows[0]);
  } catch (err) {
    next(err);
  }
};

// PUT /api/user/profile  (protegido)
const updateProfile = async (req, res, next) => {
  try {
    const { nombre_completo, fecha_nacimiento, genero } = req.body;
    await db.query(
      `UPDATE paciente
          SET nombre_completo = COALESCE(?, nombre_completo),
              fecha_nacimiento = COALESCE(?, fecha_nacimiento),
              genero = COALESCE(?, genero)
        WHERE id_paciente = ?`,
      [nombre_completo || null, fecha_nacimiento || null, genero || null, req.user.id_paciente]
    );
    res.status(200).json({ message: "Perfil actualizado correctamente" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, updateProfile };
