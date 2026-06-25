# 📅 Planes de Gestión y Ejecución — OneMore Consulting

**Versión:** 1.0 · **Estado:** Aprobado

Planificación estratégica para el cumplimiento de hitos y la mitigación de
riesgos del portafolio, con foco en el proyecto principal **ACA**.

## 1. Cronograma Maestro (ACA)
- Inicio: **09/04/2026** · Fin: **11/06/2026** (ver `01_GESTION/ACA-GP.xlsx`).
- Hitos:
  - **Hito 1 — Análisis** (03/05/2026): requisitos y casos de uso.
  - **Hito 2 — Diseño** (14/05/2026): arquitectura, DER, prototipos, plan de pruebas.
  - **Hito 3 — Desarrollo y Despliegue** (11/06/2026): Sprints 1–4 y entrega final.
- Sprints: S1 Acceso y Perfil · S2 Diario y Seguimiento · S3 Herramientas y SOS ·
  S4 Revisiones finales.

## 2. Gestión de la Configuración
- Artefactos versionados en Git. Hitos congelados como **Líneas Base**
  (`Linea Base/ACA/LB1..LB3`).
- Cambios sobre Línea Base: vía Pull Request con aprobación de Jefatura de
  Proyecto. Ver `Documentos/Planes/Plan de Gestion de la Configuracion.docx`.

## 3. Aseguramiento de la Calidad (QA)
- Plan y diseño de casos de prueba en `02_REQUISITOS/`.
- Reportes de ejecución por sprint y reporte final en `05_QA_PRUEBAS/`.
- Criterio de aceptación: cada caso de uso (CU01–CU06) verificado funcionalmente.

## 4. Gestión de Riesgos (matriz resumida)
| Riesgo | Impacto | Mitigación |
| :-- | :-- | :-- |
| Backend no integrado con la app | Alto | Capa de API y contrato REST definidos; integración por módulo |
| Pérdida de datos sensibles | Alto | Hash de contraseñas, `.env` fuera de Git, FKs con `ON DELETE CASCADE` |
| Desfase de cronograma | Medio | Seguimiento por sprint e hitos congelados en Línea Base |
| Dependencia de un solo integrante por módulo | Medio | Revisión cruzada por PR |
