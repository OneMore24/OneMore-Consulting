# ACA — Aplicación para el Control de la Ansiedad

**Cliente:** Clínica Anxiety
**Estado:** En desarrollo. Aplicación móvil, backend y base de datos integrados.

## Descripción del producto

ACA es una aplicación móvil (Android) para el monitoreo y la contención de crisis de ansiedad del paciente. Proporciona herramientas de autogestión y trazabilidad de su bienestar emocional, conforme a los casos de uso fundamentales del sistema (CU01 a CU06).

## Requisitos fundamentales

1. Registro y acceso del paciente: alta de cuenta, inicio de sesión y recuperación de contraseña.
2. Diario emocional: registro del estado de ánimo y notas, con historial y tendencias.
3. Registro de síntomas físicos: bitácora de crisis y su sintomatología.
4. Modo SOS: acceso rápido a ejercicios de respiración y contactos de emergencia.
5. Biblioteca de recursos y recordatorios: material de apoyo y recordatorios configurables.

El alcance de esta versión cubre las funcionalidades del paciente (CU01–CU06). Un panel para el terapeuta se contempla como evolución futura, fuera de la línea base actual.

## Stack tecnológico

- Aplicación móvil: React Native + Expo (TypeScript) — `03_FRONTED/`
- Backend / API REST: Node.js + Express — `04_BACKEND/`
- Base de datos: MySQL (esquema en `04_BACKEND/database/ACA-DB.sql`, conforme a `ACA-DER.pdf`)
- Seguridad: contraseñas con hash bcrypt y sesión mediante JWT
- Arquitectura: cliente (aplicación) – servidor (API REST) – base de datos

## Estructura del proyecto

| Carpeta | Contenido |
| :--- | :--- |
| `01_GESTION/` | Gestión del proyecto: cronograma, actas y project charter |
| `02_REQUISITOS/` | Requisitos, casos de uso, DER, prototipos y plan de pruebas |
| `03_FRONTED/` | Aplicación móvil (React Native + Expo) |
| `04_BACKEND/` | API REST (Node.js / Express) y esquema MySQL |
| `05_QA_PRUEBAS/` | Reportes de pruebas y manual de usuario |

Para la puesta en marcha, consulte los archivos `README.md` de `03_FRONTED/` y `04_BACKEND/`.
