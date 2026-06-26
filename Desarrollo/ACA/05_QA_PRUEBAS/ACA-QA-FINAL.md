# Reporte Final de Aseguramiento de la Calidad (ACA-QA-FINAL)

Proyecto: ACA — Aplicación para el Control de la Ansiedad
Cliente: Clínica Anxiety
Responsable de QA: David Aldana
Fecha: 10/06/2026

## 1. Objetivo

Verificar que el producto cumple los casos de uso fundamentales (CU01–CU06) y que las tres capas (aplicación móvil, API REST y base de datos) se encuentran integradas.

## 2. Resultados por caso de uso

| CU | Descripción | Cobertura | Resultado |
| :-- | :-- | :-- | :-- |
| CU01 | Registro de paciente | Registro con validación, hash bcrypt y JWT | Conforme |
| CU02 | Acceso del paciente | Inicio de sesión, bloqueo por intentos y recuperación de contraseña | Conforme |
| CU03 | Registro de diario emocional | `POST/GET /api/emotions` con persistencia | Conforme |
| CU04 | Registro de síntomas físicos | `POST/GET /api/symptoms` y catálogo | Conforme |
| CU05 | Visualización de seguimiento y gráficas | Historial emocional con filtro por fechas | Conforme |
| CU06 | Herramientas de apoyo | SOS, recursos con favoritos y recordatorios | Conforme |

## 3. Pruebas de integración (aplicación, API y base de datos)

- Autenticación de extremo a extremo: el inicio de sesión y el registro desde la aplicación obtienen un JWT real del backend.
- Seguridad: las rutas protegidas rechazan las peticiones sin token (401). Las contraseñas se almacenan con hash (`password_hash`), nunca en texto plano.
- Recuperación de contraseña: flujo enlazado desde el inicio de sesión, con `token_recuperacion` y expiración.
- Persistencia: el diario emocional se guarda y se recupera desde la base de datos al iniciar sesión; los recordatorios creados se conservan por paciente.

## 4. Pruebas no funcionales

| Aspecto | Verificación | Resultado |
| :-- | :-- | :-- |
| Integridad referencial | Claves foráneas con `ON DELETE CASCADE` (`ACA-DB.sql`) | Conforme |
| Manejo de errores | Middleware global con respuestas JSON uniformes | Conforme |
| Resiliencia de red | La aplicación conserva datos locales si la API no responde | Conforme |
| Configuración | Variables sensibles en `.env`, fuera del control de versiones | Conforme |

## 5. Observaciones y trabajo futuro

- Persistencia de la sesión entre reinicios: el JWT se mantiene en memoria. Se recomienda almacenarlo con `expo-secure-store`.
- Servicio de correo: el token de recuperación se entrega en la respuesta con fines de demostración; en producción debe enviarse por correo electrónico.
- Pruebas de extremo a extremo con base de datos: requieren una instancia MySQL activa con el esquema `ACA-DB.sql` cargado.

## 6. Conclusión

El producto satisface los criterios de aceptación de los casos de uso CU01–CU06 y se encuentra integrado en sus tres capas. Se considera apto para la entrega final (`ACA-FIN.apk`), con las observaciones de la sección 5 como mejoras posteriores.
