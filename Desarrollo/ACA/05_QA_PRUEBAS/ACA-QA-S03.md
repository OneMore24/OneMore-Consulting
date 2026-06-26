# Reporte de Pruebas — Sprint 3 (ACA-QA-S03)

Proyecto: ACA — Aplicación para el Control de la Ansiedad
Sprint: 3 — Herramientas y SOS
Responsable de QA: David Aldana
Fecha: 09/06/2026

## 1. Alcance

Validación de las funcionalidades del Sprint 3: botón SOS, biblioteca de recursos, recordatorios (operaciones CRUD) y manejo de errores globales del backend.

## 2. Entorno

- Aplicación: React Native + Expo (Android).
- API: Node.js + Express en `http://localhost:3000`.
- Base de datos: MySQL `apoyo_emocional` (esquema `ACA-DB.sql`).

## 3. Casos de prueba

| ID | Caso | Resultado esperado | Resultado |
| :-- | :-- | :-- | :-- |
| TC-S03-01 | Consultar SOS | 200 con recomendaciones y contactos | Conforme |
| TC-S03-02 | Listar recursos sin sesión | 401 "Token no proporcionado" | Conforme |
| TC-S03-03 | Listar recursos con sesión | 200, lista con indicador de favorito | Conforme |
| TC-S03-04 | Marcar favorito | 201, el recurso queda como favorito | Conforme |
| TC-S03-05 | Quitar favorito | 200, el recurso deja de ser favorito | Conforme |
| TC-S03-06 | Crear recordatorio | 201 con identificador | Conforme |
| TC-S03-07 | Listar recordatorios | 200, solo los del paciente autenticado | Conforme |
| TC-S03-08 | Editar recordatorio | 200 "Recordatorio actualizado" | Conforme |
| TC-S03-09 | Eliminar recordatorio inexistente | 404 "Recordatorio no encontrado" | Conforme |
| TC-S03-10 | Error controlado | Respuesta JSON con mensaje, sin caída del servidor | Conforme |

## 4. Defectos detectados y resueltos

- D-01: los controladores de los fragmentos por sprint utilizaban `db` sin importarlo y un inicio de sesión con credenciales fijas. Se resolvió al ensamblar el backend único con acceso real a la base de datos y autenticación JWT.
- D-02: los recordatorios se almacenaban en memoria y se perdían al reiniciar. Se resolvió con la tabla `recordatorio` y operaciones CRUD persistentes por paciente.

## 5. Conclusión

Las funcionalidades del Sprint 3 cumplen los criterios de aceptación. La aplicación consume la API mediante la capa de servicios (`src/services/api.ts`) y degrada de forma controlada (datos locales) cuando no hay conexión.
