// Validaciones de entrada reutilizables.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateRegister = (req, res, next) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ message: "El correo no es válido" });
  }
  if (String(password).length < 6) {
    return res
      .status(400)
      .json({ message: "La contraseña debe tener al menos 6 caracteres" });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y contraseña son obligatorios" });
  }

  next();
};

module.exports = { validateRegister, validateLogin };
