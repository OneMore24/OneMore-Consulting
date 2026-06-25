const db = require("../config/db");

// POST /api/reminders  (protegido)
const createReminder = async (req, res, next) => {
  try {
    const { titulo, fecha } = req.body;
    if (!titulo || !fecha) {
      return res
        .status(400)
        .json({ message: "Título y fecha son obligatorios" });
    }

    const [result] = await db.query(
      `INSERT INTO recordatorio (id_paciente, titulo, fecha, activo)
       VALUES (?, ?, ?, 1)`,
      [req.user.id_paciente, titulo, fecha]
    );

    res.status(201).json({
      id_recordatorio: result.insertId,
      titulo,
      fecha,
      activo: 1,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/reminders  (protegido)
const getReminders = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM recordatorio WHERE id_paciente = ? ORDER BY fecha",
      [req.user.id_paciente]
    );
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

// PUT /api/reminders/:id  (protegido)
const updateReminder = async (req, res, next) => {
  try {
    const { titulo, fecha, activo } = req.body;
    const [result] = await db.query(
      `UPDATE recordatorio
          SET titulo = COALESCE(?, titulo),
              fecha  = COALESCE(?, fecha),
              activo = COALESCE(?, activo)
        WHERE id_recordatorio = ? AND id_paciente = ?`,
      [titulo ?? null, fecha ?? null, activo ?? null, req.params.id, req.user.id_paciente]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Recordatorio no encontrado" });
    }
    res.status(200).json({ message: "Recordatorio actualizado" });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/reminders/:id  (protegido)
const deleteReminder = async (req, res, next) => {
  try {
    const [result] = await db.query(
      "DELETE FROM recordatorio WHERE id_recordatorio = ? AND id_paciente = ?",
      [req.params.id, req.user.id_paciente]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Recordatorio no encontrado" });
    }
    res.status(200).json({ message: "Recordatorio eliminado" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createReminder,
  getReminders,
  updateReminder,
  deleteReminder,
};
