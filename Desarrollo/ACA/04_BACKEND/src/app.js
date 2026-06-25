const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const emotionRoutes = require("./routes/emotion.routes");
const symptomRoutes = require("./routes/symptom.routes");
const sosRoutes = require("./routes/sos.routes");
const resourceRoutes = require("./routes/resource.routes");
const reminderRoutes = require("./routes/reminder.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

// Permite que la app móvil (Expo) consuma la API
app.use(cors());
// Permite recibir JSON en las peticiones
app.use(express.json());

// Ruta de prueba / health-check
app.get("/", (req, res) => {
  res.json({ message: "API ACA funcionando", status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/emotions", emotionRoutes);
app.use("/api/symptoms", symptomRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/reminders", reminderRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Recurso no encontrado" });
});

// Manejo de errores globales (siempre al final)
app.use(errorHandler);

module.exports = app;
