# Directrices Técnicas — OneMore Consulting

**Versión:** 1.0 · **Estado:** En revisión

Guías operativas para mantener calidad y consistencia técnica en los proyectos.
Las convenciones de lenguaje se aplican según el stack de **cada** proyecto
(ver el `README` de cada uno); a continuación, las del proyecto principal **ACA**.

## 1. Estándares de Codificación (ACA)
- **Frontend:** TypeScript + React Native (Expo). Componentes funcionales con
  hooks. Nombres de componentes en `PascalCase`, hooks en `camelCase`.
- **Backend:** Node.js + Express. Estructura por capas:
  `routes → controllers → (config/db)`. Validaciones en `middlewares`.
- **Base de Datos:** MySQL. Nombres de tablas y columnas en `snake_case`,
  en español, alineados con el diccionario de datos del `ACA-DER.pdf`.
- Indentación de 2 espacios; evitar lógica de negocio dentro de las rutas.

## 2. Control de Versiones (Git Flow)
- Ramas por integrante / funcionalidad; integración a `main` mediante
  **Pull Request** revisado.
- **Convención de commits:** `tipo(ámbito): descripción`
  (p. ej. `feat(ACA-S01-LOG): UI de login`). Tipos: `feat`, `fix`, `chore`,
  `docs`, `test`.

## 3. Documentación de Código
- Comentar el *porqué*, no el *qué* obvio.
- Cada módulo del backend documenta sus endpoints en `04_BACKEND/README.md`.
- Los diagramas y diccionarios de datos se mantienen en `02_REQUISITOS/`.

## 4. Seguridad
- Entradas validadas en el servidor (no confiar solo en el cliente).
- Rutas protegidas mediante verificación de **JWT**.
- Secretos y credenciales fuera del control de versiones (`.env`).
