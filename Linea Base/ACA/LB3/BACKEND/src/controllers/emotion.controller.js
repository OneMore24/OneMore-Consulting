const db = require("../config/db");

// POST /api/emotions  (protegido)
const registerEmotion = async (req, res, next) => {
  try {
    const { estado_animo, nota_descriptiva } = req.body;

    if (estado_animo === undefined || estado_animo === null) {
      return res
        .status(400)
        .json({ message: "El estado de ánimo es obligatorio" });
    }
    const valor = Number(estado_animo);
    if (Number.isNaN(valor) || valor < 1 || valor > 10) {
      return res
        .status(400)
        .json({ message: "El estado de ánimo debe estar entre 1 y 10" });
    }

    const [result] = await db.query(
      `INSERT INTO registro_emocional (id_paciente, estado_animo, nota_descriptiva, fecha_hora)
       VALUES (?, ?, ?, NOW())`,
      [req.user.id_paciente, valor, nota_descriptiva || null]
    );

    res.status(201).json({
      message: "Registro emocional guardado correctamente",
      id_registro_emocional: result.insertId,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/emotions?desde=YYYY-MM-DD&hasta=YYYY-MM-DD  (protegido)
const getEmotions = async (req, res, next) => {
  try {
    const { desde, hasta } = req.query;

    let sql =
      "SELECT * FROM registro_emocional WHERE id_paciente = ?";
    const params = [req.user.id_paciente];

    if (desde && hasta) {
      sql += " AND DATE(fecha_hora) BETWEEN ? AND ?";
      params.push(desde, hasta);
    }
    sql += " ORDER BY fecha_hora DESC";

    const [rows] = await db.query(sql, params);
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

module.exports = { registerEmotion, getEmotions };
