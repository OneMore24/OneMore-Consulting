const db = require("../config/db");

// GET /api/symptoms/catalog  (protegido) - catálogo de síntomas
const getCatalog = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      "SELECT id_sintoma, nombre, categoria FROM sintoma ORDER BY categoria, nombre"
    );
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

// POST /api/symptoms  (protegido)
// body: { nota_adicional, sintomas: [{ id_sintoma, intensidad }] }
const registerCrisis = async (req, res, next) => {
  const conn = await db.getConnection();
  try {
    const { nota_adicional, sintomas } = req.body;

    if (!Array.isArray(sintomas) || sintomas.length === 0) {
      conn.release();
      return res
        .status(400)
        .json({ message: "Debe registrar al menos un síntoma" });
    }

    await conn.beginTransaction();

    const [result] = await conn.query(
      `INSERT INTO registro_crisis_fisica (id_paciente, nota_adicional, fecha_hora)
       VALUES (?, ?, NOW())`,
      [req.user.id_paciente, nota_adicional || null]
    );
    const id_crisis = result.insertId;

    for (const s of sintomas) {
      await conn.query(
        `INSERT INTO detalle_crisis_sintoma (id_crisis, id_sintoma, intensidad)
         VALUES (?, ?, ?)`,
        [id_crisis, s.id_sintoma, s.intensidad || "Leve"]
      );
    }

    await conn.commit();
    res.status(201).json({
      message: "Síntomas registrados correctamente",
      id_crisis,
    });
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.release();
  }
};

// GET /api/symptoms  (protegido) - historial de crisis con sus síntomas
const getCrises = async (req, res, next) => {
  try {
    const [crises] = await db.query(
      `SELECT id_crisis, nota_adicional, fecha_hora
         FROM registro_crisis_fisica
        WHERE id_paciente = ?
        ORDER BY fecha_hora DESC`,
      [req.user.id_paciente]
    );

    for (const c of crises) {
      const [detalle] = await db.query(
        `SELECT s.id_sintoma, s.nombre, s.categoria, d.intensidad
           FROM detalle_crisis_sintoma d
           JOIN sintoma s ON s.id_sintoma = d.id_sintoma
          WHERE d.id_crisis = ?`,
        [c.id_crisis]
      );
      c.sintomas = detalle;
    }

    res.status(200).json(crises);
  } catch (err) {
    next(err);
  }
};

module.exports = { getCatalog, registerCrisis, getCrises };
