# Reporte de Pruebas — Sprint 3 (ACA-QA-S03)

**Proyecto:** ACA — App para el Control de la Ansiedad
**Sprint:** 3 — Herramientas y SOS
**Responsable QA:** David Aldana
**Fecha:** 09/06/2026

## 1. Alcance
Validación de las funcionalidades del Sprint 3: botón SOS, biblioteca de
recursos, recordatorios (CRUD) y manejo de errores globales del backend.

## 2. Entorno
- App: React Native + Expo (Android).
- API: Node.js + Express en `http://localhost:3000`.
- BD: MySQL `apoyo_emocional` (esquema `ACA-DB.sql`).

## 3. Casos de Prueba

| ID | Caso | Pasos | Resultado esperado | Estado |
| :-- | :-- | :-- | :-- | :--: |
| TC-S03-01 | Consultar SOS | `GET /api/sos` | 200 con recomendaciones y contactos | ✅ |
| TC-S03-02 | Listar recursos sin sesión | `GET /api/resources` sin token | 401 "Token no proporcionado" | ✅ |
| TC-S03-03 | Listar recursos con sesión | `GET /api/resources` con JWT | 200, lista con flag `favorito` | ✅ |
| TC-S03-04 | Marcar favorito | `POST /api/resources/1/favorito` | 201, recurso queda como favorito | ✅ |
| TC-S03-05 | Quitar favorito | `DELETE /api/resources/1/favorito` | 200, recurso deja de ser favorito | ✅ |
| TC-S03-06 | Crear recordatorio | `POST /api/reminders` con título y fecha | 201 con `id_recordatorio` | ✅ |
| TC-S03-07 | Listar recordatorios | `GET /api/reminders` | 200, solo del paciente autenticado | ✅ |
| TC-S03-08 | Editar recordatorio | `PUT /api/reminders/:id` | 200 "Recordatorio actualizado" | ✅ |
| TC-S03-09 | Eliminar recordatorio inexistente | `DELETE /api/reminders/9999` | 404 "Recordatorio no encontrado" | ✅ |
| TC-S03-10 | Error controlado | Petición inválida | Respuesta JSON con `message`, sin caída del servidor | ✅ |

## 4. Defectos detectados y resueltos
- **D-01:** Los controladores de los fragmentos por sprint usaban `db` sin
  importarlo y un login *hardcodeado*. **Resuelto** al ensamblar el backend
  único con acceso real a BD y autenticación JWT.
- **D-02:** Los recordatorios se almacenaban en un arreglo en memoria (se
  perdían al reiniciar). **Resuelto** con la tabla `recordatorio` y CRUD
  persistente por paciente.

## 5. Conclusión
Las funcionalidades del Sprint 3 cumplen los criterios de aceptación. La UI
consume la API mediante la capa de servicios (`src/services/api.ts`) y degrada
de forma controlada (datos locales) cuando no hay conexión.
