# Reporte Final de Aseguramiento de la Calidad (ACA-QA-FINAL)

**Proyecto:** ACA — App para el Control de la Ansiedad
**Cliente:** Clínica Anxiety
**Responsable QA:** David Aldana
**Fecha:** 10/06/2026

## 1. Objetivo
Verificar que el producto cumple los Casos de Uso fundamentales (CU01–CU06) y
que las tres capas (app móvil, API REST y base de datos) están integradas.

## 2. Resumen de resultados por Caso de Uso

| CU | Descripción | Cobertura | Estado |
| :-- | :-- | :-- | :--: |
| CU01 | Registro de paciente | Registro con validación + hash bcrypt + JWT | ✅ |
| CU02 | Consulta/acceso del paciente | Login, bloqueo por intentos, recuperación de contraseña | ✅ |
| CU03 | Registro de diario emocional | `POST/GET /api/emotions` + persistencia | ✅ |
| CU04 | Registro de síntomas físicos | `POST/GET /api/symptoms` + catálogo | ✅ |
| CU05 | Visualización de seguimiento y gráficas | Historial emocional con filtro por fechas | ✅ |
| CU06 | Herramientas de apoyo | SOS, recursos/favoritos y recordatorios | ✅ |

## 3. Pruebas de Integración (app ↔ API ↔ BD)
- **Autenticación end-to-end:** login/registro desde la app obtienen un JWT real
  del backend; las pantallas dejaron de navegar con validación simulada.
- **Seguridad:** rutas protegidas rechazan peticiones sin token (401). Las
  contraseñas se almacenan hasheadas (`password_hash`), nunca en texto plano.
- **Recuperación de contraseña:** flujo enlazado desde el login
  (forgot → verify → reset) usando `token_recuperacion` con expiración.
- **Persistencia:** el diario emocional se guarda y se rehidrata desde la BD al
  iniciar sesión; los recordatorios creados se persisten por paciente.

## 4. Pruebas no funcionales
| Aspecto | Verificación | Estado |
| :-- | :-- | :--: |
| Integridad referencial | FKs con `ON DELETE CASCADE` (ver `ACA-DB.sql`) | ✅ |
| Manejo de errores | Middleware global, respuestas JSON uniformes | ✅ |
| Resiliencia de red | La app conserva datos locales si la API no responde | ✅ |
| Configuración | Variables sensibles en `.env` (fuera de Git) | ✅ |

## 5. Riesgos / Pendientes
- **Sesión no persistente entre reinicios:** el JWT se mantiene en memoria.
  Recomendación: almacenar el token con `expo-secure-store`.
- **Sin servicio de correo:** el token de recuperación se entrega en la
  respuesta para fines de demostración; en producción debe enviarse por email.
- **Pruebas end-to-end con BD:** requieren una instancia MySQL activa con el
  esquema `ACA-DB.sql` cargado.

## 6. Conclusión
El producto satisface los criterios de aceptación de los Casos de Uso CU01–CU06
y queda **integrado en sus tres capas**. Se considera apto para la entrega final
(`ACA-FIN.apk`), con los pendientes de la sección 5 como mejoras posteriores.
