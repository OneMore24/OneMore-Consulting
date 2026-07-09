const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const MAX_ATTEMPTS = parseInt(process.env.MAX_LOGIN_ATTEMPTS || "5", 10);
const LOCK_MINUTES = parseInt(process.env.LOCK_MINUTES || "15", 10);

function signToken(paciente) {
  return jwt.sign({ id_paciente: paciente.id_paciente }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

function publicUser(p) {
  return {
    id: p.id_paciente,
    nombre: p.nombre_completo,
    correo: p.correo,
  };
}

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { nombre, email, password, fecha_nacimiento, genero } = req.body;

    const [exists] = await db.query(
      "SELECT id_paciente FROM paciente WHERE correo = ?",
      [email]
    );
    if (exists.length > 0) {
      return res.status(409).json({ message: "El correo ya está registrado" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO paciente
         (nombre_completo, correo, password_hash, fecha_nacimiento, genero, fecha_registro)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [nombre, email, password_hash, fecha_nacimiento || null, genero || null]
    );

    const paciente = {
      id_paciente: result.insertId,
      nombre_completo: nombre,
      correo: email,
    };

    res.status(201).json({
      message: "Usuario registrado correctamente",
      token: signToken(paciente),
      usuario: publicUser(paciente),
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM paciente WHERE correo = ?",
      [email]
    );
    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const paciente = rows[0];

    // Bloqueo temporal por intentos fallidos
    if (paciente.bloqueado_hasta && new Date(paciente.bloqueado_hasta) > new Date()) {
      return res.status(423).json({
        message: "Cuenta bloqueada temporalmente. Inténtalo más tarde.",
      });
    }

    const ok = await bcrypt.compare(password, paciente.password_hash);
    if (!ok) {
      const intentos = (paciente.intentos_fallidos || 0) + 1;
      if (intentos >= MAX_ATTEMPTS) {
        await db.query(
          "UPDATE paciente SET intentos_fallidos = 0, bloqueado_hasta = DATE_ADD(NOW(), INTERVAL ? MINUTE) WHERE id_paciente = ?",
          [LOCK_MINUTES, paciente.id_paciente]
        );
      } else {
        await db.query(
          "UPDATE paciente SET intentos_fallidos = ? WHERE id_paciente = ?",
          [intentos, paciente.id_paciente]
        );
      }
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Login correcto: limpia contadores
    await db.query(
      "UPDATE paciente SET intentos_fallidos = 0, bloqueado_hasta = NULL WHERE id_paciente = ?",
      [paciente.id_paciente]
    );

    res.status(200).json({
      message: "Login exitoso",
      token: signToken(paciente),
      usuario: publicUser(paciente),
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/forgot-password
// Genera un token de recuperación. (Sin servicio de correo: se devuelve en la
// respuesta para fines de desarrollo/demostración.)
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "El correo es obligatorio" });
    }

    const [rows] = await db.query(
      "SELECT id_paciente FROM paciente WHERE correo = ?",
      [email]
    );

    // Respuesta uniforme para no revelar si el correo existe
    const genericMsg = {
      message: "Si el correo está registrado, se enviará un enlace de recuperación",
    };
    if (rows.length === 0) {
      return res.status(200).json(genericMsg);
    }

    const token = crypto.randomBytes(32).toString("hex");
    await db.query(
      `INSERT INTO token_recuperacion (id_paciente, token, fecha_expiracion, usado)
       VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 30 MINUTE), 0)`,
      [rows[0].id_paciente, token]
    );

    res.status(200).json({ ...genericMsg, token_dev: token });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/reset-password  { token, password }
const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res
        .status(400)
        .json({ message: "Token y nueva contraseña son obligatorios" });
    }
    if (String(password).length < 6) {
      return res
        .status(400)
        .json({ message: "La contraseña debe tener al menos 6 caracteres" });
    }

    const [rows] = await db.query(
      `SELECT * FROM token_recuperacion
       WHERE token = ? AND usado = 0 AND fecha_expiracion > NOW()`,
      [token]
    );
    if (rows.length === 0) {
      return res.status(400).json({ message: "Token inválido o expirado" });
    }

    const password_hash = await bcrypt.hash(password, 10);
    await db.query(
      "UPDATE paciente SET password_hash = ? WHERE id_paciente = ?",
      [password_hash, rows[0].id_paciente]
    );
    await db.query(
      "UPDATE token_recuperacion SET usado = 1 WHERE id_token = ?",
      [rows[0].id_token]
    );

    res.status(200).json({ message: "Contraseña actualizada correctamente" });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, forgotPassword, resetPassword };
