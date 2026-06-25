# ACA · Backend (API REST)

API REST del proyecto **ACA (App para el Control de la Ansiedad)** — Clínica Anxiety.

> Este proyecto reemplaza, ya ensamblado y ejecutable, los fragmentos históricos
> que se entregaron por sprint en los archivos `ACA-S0X-*.rar` de esta carpeta.

## Stack

- **Node.js + Express** (API REST)
- **MySQL** (`mysql2/promise`) — base de datos `apoyo_emocional`
- **bcryptjs** (hash de contraseñas) + **jsonwebtoken** (sesión JWT)

## Requisitos

- Node.js 18+
- MySQL 8+

## Puesta en marcha

```bash
# 1) Instalar dependencias
npm install

# 2) Crear la base de datos y las tablas
mysql -u root -p < database/ACA-DB.sql

# 3) Configurar variables de entorno
cp .env.example .env   # y ajusta credenciales / JWT_SECRET

# 4) Levantar el servidor
npm start              # http://localhost:3000
```

## Endpoints

| Método | Ruta | Protegido | Descripción |
| :-- | :-- | :--: | :-- |
| GET | `/` | — | Health-check |
| POST | `/api/auth/register` | — | Registro de paciente (devuelve JWT) |
| POST | `/api/auth/login` | — | Login (devuelve JWT) |
| POST | `/api/auth/forgot-password` | — | Genera token de recuperación |
| POST | `/api/auth/reset-password` | — | Restablece contraseña con token |
| GET | `/api/user/profile` | ✓ | Perfil del paciente autenticado |
| PUT | `/api/user/profile` | ✓ | Actualiza datos del perfil |
| POST | `/api/emotions` | ✓ | Registra estado emocional (1–10) |
| GET | `/api/emotions` | ✓ | Historial emocional (`?desde=&hasta=`) |
| GET | `/api/symptoms/catalog` | ✓ | Catálogo de síntomas |
| POST | `/api/symptoms` | ✓ | Registra una crisis con síntomas |
| GET | `/api/symptoms` | ✓ | Historial de crisis |
| GET | `/api/sos` | — | Recomendaciones y contactos de emergencia |
| GET | `/api/resources` | ✓ | Biblioteca de recursos (marca favoritos) |
| POST | `/api/resources/:id/favorito` | ✓ | Añade recurso a favoritos |
| DELETE | `/api/resources/:id/favorito` | ✓ | Quita recurso de favoritos |
| POST | `/api/reminders` | ✓ | Crea recordatorio |
| GET | `/api/reminders` | ✓ | Lista recordatorios |
| PUT | `/api/reminders/:id` | ✓ | Actualiza recordatorio |
| DELETE | `/api/reminders/:id` | ✓ | Elimina recordatorio |

Las rutas protegidas requieren la cabecera `Authorization: Bearer <token>`.

## Estructura

```
04_BACKEND/
├── database/ACA-DB.sql        # Esquema + datos semilla (según ACA-DER.pdf)
├── index.js                   # Punto de entrada
└── src/
    ├── app.js                 # Configuración de Express
    ├── config/db.js           # Pool de conexiones MySQL
    ├── controllers/           # Lógica de cada módulo
    ├── routes/                # Definición de endpoints
    └── middlewares/           # auth (JWT), validación, errores
```
