# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/)
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security

## [1.1.0] - 2026-07-02

### Added

- Adopción de la estructura de la plantilla `project-starter-template-es`.
- Suite de documentación en `docs/`: arquitectura (`architecture`, `stack`,
  `database`, `api`, `auth`, `design`), producto (`business-model`, `roadmap`),
  decisiones (ADRs), convenciones y glosario.
- Archivos de gobernanza: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`,
  `CHANGELOG.md`.
- Plantillas de GitHub: issues (`bug_report`, `feature_request`,
  `documentation_request`, `support_question`, `task`), `PULL_REQUEST_TEMPLATE.md`,
  `dependabot.yml`, `labeler.yml`, `FUNDING.yml` y scripts de utilidad.
- Higiene del repositorio: `.editorconfig` y `.env.example` documentado.

### Changed

- `README.md` reescrito siguiendo la estructura de la plantilla, con contenido
  real del proyecto.
- Metadatos de `package.json` actualizados (nombre, descripción, licencia MIT,
  keywords y repositorio).

### Removed

- Plantillas de GitHub duplicadas (`pull_request_template.md`,
  `ISSUE_TEMPLATE/issue-template.md`) reemplazadas por las de la plantilla.

## [1.0.0] - 2025-06-19

### Added

- API RESTful educativa de estudiantes, cursos e inscripciones con patrón MVC.
- CRUD y filtros avanzados (por carrera, semestre, categoría, instructor,
  disponibilidad y rango de precio).
- Validaciones de negocio: email único, control de cupos, rangos de edad y
  semestre, y prevención de inscripciones duplicadas.
- Documentación interactiva con Swagger UI en `/api-docs`.
- Vista de inicio con estilo retro (NES.css) y despliegue en Vercel.

[Unreleased]: https://github.com/brayandiazc/udd-api-node/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/brayandiazc/udd-api-node/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/brayandiazc/udd-api-node/releases/tag/v1.0.0
