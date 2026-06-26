# ACA — Backend (API REST)

API REST del proyecto ACA (Aplicación para el Control de la Ansiedad), Clínica Anxiety.

Este proyecto reemplaza, ya ensamblado y ejecutable, los fragmentos históricos que se entregaron por sprint en los archivos `ACA-S0X-*.rar` de esta carpeta.

## Stack

- Node.js + Express (API REST)
- MySQL (`mysql2/promise`), base de datos `apoyo_emocional`
- bcryptjs (hash de contraseñas) y jsonwebtoken (sesión JWT)

## Requisitos

- Node.js 18 o superior
- MySQL 8 o superior

## Puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Crear la base de datos y las tablas
mysql -u root -p < database/ACA-DB.sql

# 3. Configurar variables de entorno
cp .env.example .env   # ajustar credenciales y JWT_SECRET

# 4. Iniciar el servidor
npm start              # http://localhost:3000
```

Para el despliegue en la nube, consulte `DESPLIEGUE-RAILWAY.md`.

## Endpoints

| Método | Ruta | Requiere sesión | Descripción |
| :-- | :-- | :--: | :-- |
| GET | `/` | No | Verificación de estado |
| POST | `/api/auth/register` | No | Registro de paciente (devuelve JWT) |
| POST | `/api/auth/login` | No | Inicio de sesión (devuelve JWT) |
| POST | `/api/auth/forgot-password` | No | Genera token de recuperación |
| POST | `/api/auth/reset-password` | No | Restablece la contraseña con un token |
| GET | `/api/user/profile` | Sí | Perfil del paciente autenticado |
| PUT | `/api/user/profile` | Sí | Actualiza los datos del perfil |
| POST | `/api/emotions` | Sí | Registra el estado emocional (1–10) |
| GET | `/api/emotions` | Sí | Historial emocional (`?desde=&hasta=`) |
| GET | `/api/symptoms/catalog` | Sí | Catálogo de síntomas |
| POST | `/api/symptoms` | Sí | Registra una crisis con sus síntomas |
| GET | `/api/symptoms` | Sí | Historial de crisis |
| GET | `/api/sos` | No | Recomendaciones y contactos de emergencia |
| GET | `/api/resources` | Sí | Biblioteca de recursos (indica favoritos) |
| POST | `/api/resources/:id/favorito` | Sí | Añade un recurso a favoritos |
| DELETE | `/api/resources/:id/favorito` | Sí | Quita un recurso de favoritos |
| POST | `/api/reminders` | Sí | Crea un recordatorio |
| GET | `/api/reminders` | Sí | Lista los recordatorios |
| PUT | `/api/reminders/:id` | Sí | Actualiza un recordatorio |
| DELETE | `/api/reminders/:id` | Sí | Elimina un recordatorio |

Las rutas protegidas requieren la cabecera `Authorization: Bearer <token>`.

## Estructura

```
04_BACKEND/
├── database/ACA-DB.sql          # Esquema y datos semilla (conforme a ACA-DER.pdf)
├── database/ACA-DB-deploy.sql   # Esquema para BD existente (despliegue en la nube)
├── index.js                     # Punto de entrada
└── src/
    ├── app.js                   # Configuración de Express
    ├── config/db.js             # Pool de conexiones MySQL
    ├── controllers/             # Lógica de cada módulo
    ├── routes/                  # Definición de endpoints
    └── middlewares/             # Autenticación (JWT), validación y errores
```
