# Políticas Corporativas — OneMore Consulting

**Versión:** 1.0 · **Responsable:** Jefatura de Proyecto · **Estado:** Aprobado

Este documento establece el marco normativo que rige el comportamiento ético,
legal y técnico de los miembros de OneMore Consulting durante el ciclo de vida
de los proyectos.

## 1. Gestión de Datos Sensibles
- La información clínica y personal de los pacientes (proyecto ACA) es
  **confidencial**. Solo se accede a ella para fines de desarrollo y pruebas.
- Las contraseñas **nunca** se almacenan en texto plano: se aplica hash
  criptográfico unidireccional (bcrypt) antes de persistirlas.
- No se suben a Git credenciales, archivos `.env`, volcados de base de datos ni
  datos reales de pacientes. El archivo `.env.example` documenta las variables
  sin valores sensibles.

## 2. Confidencialidad (NDA)
- Todo integrante acepta no divulgar información de clientes, código fuente ni
  documentación interna a terceros sin autorización de la Jefatura de Proyecto.
- Los accesos a repositorios y entornos se otorgan según el rol de cada miembro.

## 3. Propiedad Intelectual
- El código y los activos digitales generados son propiedad del proyecto y se
  gestionan en el repositorio oficial de OneMore Consulting.
- El uso de librerías de terceros debe respetar sus licencias (MIT, Apache 2.0,
  etc.).

## 4. Reglas de Negocio
- Toda funcionalidad debe trazar a un requisito o caso de uso aprobado
  (ver `Desarrollo/ACA/02_REQUISITOS/`).
- Los cambios sobre artefactos en Línea Base requieren aprobación formal antes
  de integrarse (ver `Planes.md` → Gestión de la Configuración).
