# 🧠 ACA (App para el Control de la Ansiedad)

**Cliente:** Clínica Anxiety
**Estado Actual:** 🟢 En Desarrollo — Frontend, Backend y Base de Datos integrados

### 📌 Descripción del Producto
**ACA** es una aplicación móvil (Android) diseñada para el monitoreo y la contención de crisis de ansiedad del **paciente**, proporcionando herramientas de autogestión y trazabilidad de su bienestar emocional (Casos de Uso CU01–CU06).

### 📋 Requisitos Fundamentales
1. **Registro y acceso del paciente:** alta de cuenta, login y recuperación de contraseña.
2. **Diario emocional:** registro del estado de ánimo y notas, con historial y tendencias.
3. **Registro de síntomas físicos:** bitácora de crisis y su sintomatología.
4. **Modo SOS:** acceso rápido a ejercicios de respiración y contactos de emergencia.
5. **Biblioteca de recursos y recordatorios:** material de apoyo y recordatorios configurables.

> El alcance de esta versión cubre las funcionalidades del **paciente** (CU01–CU06 del cronograma). Un panel para el terapeuta queda como evolución futura, fuera de la línea base actual.

### 💻 Stack Tecnológico (real)
* **App móvil:** React Native + Expo (TypeScript) — `03_FRONTED/`
* **Backend / API REST:** Node.js + Express — `04_BACKEND/`
* **Base de Datos:** MySQL (esquema en `04_BACKEND/database/ACA-DB.sql`, según `ACA-DER.pdf`)
* **Seguridad:** contraseñas con hash bcrypt y sesión por JWT
* **Arquitectura:** Cliente (app) ↔ Servidor (API REST) ↔ Base de Datos

### 📂 Estructura
| Carpeta | Contenido |
| :--- | :--- |
| `01_GESTION/` | Gestión del proyecto (cronograma, actas, project charter) |
| `02_REQUISITOS/` | Requisitos, casos de uso, DER, prototipos, plan de pruebas |
| `03_FRONTED/` | App móvil (React Native + Expo) |
| `04_BACKEND/` | API REST (Node/Express) + esquema MySQL |
| `05_QA_PRUEBAS/` | Reportes de pruebas |

> *Para levantar el proyecto, ver los `README.md` de `03_FRONTED/` y `04_BACKEND/`.*