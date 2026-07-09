const db = require("../config/db");

// GET /api/resources  (protegido) - biblioteca de recursos, marca favoritos del paciente
const getResources = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      `SELECT r.*,
              (f.id_recurso IS NOT NULL) AS favorito
         FROM recurso_apoyo r
         LEFT JOIN recurso_favorito f
           ON f.id_recurso = r.id_recurso AND f.id_paciente = ?
        ORDER BY r.titulo`,
      [req.user.id_paciente]
    );
    // Normaliza el flag a booleano
    rows.forEach((r) => (r.favorito = !!r.favorito));
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

// POST /api/resources/:id/favorito  (protegido)
const addFavorite = async (req, res, next) => {
  try {
    await db.query(
      `INSERT IGNORE INTO recurso_favorito (id_paciente, id_recurso, fecha_agregado)
       VALUES (?, ?, NOW())`,
      [req.user.id_paciente, req.params.id]
    );
    res.status(201).json({ message: "Recurso añadido a favoritos" });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/resources/:id/favorito  (protegido)
const removeFavorite = async (req, res, next) => {
  try {
    await db.query(
      "DELETE FROM recurso_favorito WHERE id_paciente = ? AND id_recurso = ?",
      [req.user.id_paciente, req.params.id]
    );
    res.status(200).json({ message: "Recurso eliminado de favoritos" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getResources, addFavorite, removeFavorite };
