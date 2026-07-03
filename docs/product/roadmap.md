# Roadmap — udd-api-node

> Estado y dirección del proyecto. Documento vivo. Como proyecto educativo y open
> source, las prioridades buscan **enseñar más conceptos**, no facturar.
> **Última actualización**: 2026-07-02

## Leyenda

- ✅ Hecho
- 🚧 En curso
- 📋 Planificado
- ⏸️ Diferido

## Visión

Ser un proyecto de referencia, completo y en español, para aprender a construir APIs
REST con Node.js y Express. A futuro, ir incorporando -de forma incremental y didáctica-
las piezas que faltan en un backend "real" (persistencia, autenticación, pruebas y
reportes), de modo que cada mejora sea también una lección.

## Estado actual

Hoy en producción (Vercel) hay una API REST funcional con patrón MVC que gestiona
**estudiantes, cursos e inscripciones**, con validaciones de negocio, datos de ejemplo
(seed) en memoria, documentación interactiva con Swagger en `/api-docs` y una vista
estática con NES.css en `/`. No hay base de datos real, autenticación ni tests todavía;
esos son los ejes de este roadmap.

## Por fase / hito

### Fase 1 — Robustez y confianza 📋

- [ ] Añadir **pruebas automatizadas** con Jest + Supertest para los endpoints.
- [ ] Integrar la ejecución de tests en el CI (`.github/workflows/nodejs.yml`).
- [ ] Reemplazar el `npm test` placeholder por una suite real.

### Fase 2 — Persistencia real 📋

- [ ] Migrar de **datos en memoria** a una **base de datos real** (PostgreSQL o MongoDB).
- [ ] Introducir una capa de acceso a datos / ORM y mantener el patrón MVC.
- [ ] Documentar el cambio como ADR en [`../decisions/`](../decisions/README.md).

### Fase 3 — Seguridad 📋

- [ ] Implementar **autenticación con JWT** y proteger los endpoints de escritura.
- [ ] Definir roles básicos (p. ej. lectura pública vs. administración).

### Fase 4 — Valor para el usuario 📋

- [ ] Agregar **estadísticas y reportes** (p. ej. cursos más inscritos, cupos ocupados,
      promedios de calificación).
- [ ] Mejorar la **interfaz de usuario** (vista más rica sobre la API).

### Fase 5 — Expansión 📋

- [ ] Explorar una **aplicación móvil** que consuma la API.

## Backlog / ideas sin agendar

- Paginación y ordenamiento en los listados.
- Manejo de errores y respuestas más estandarizados.
- Ambientes formales de staging además de producción.

## Fuera de alcance (por ahora)

- Monetización o planes de pago: el proyecto es gratuito y open source (MIT).
- Funcionalidades ajenas al objetivo didáctico que compliquen el ejemplo sin enseñar
  un concepto claro.

## Cómo se actualiza este documento

- Revisar al cerrar cada fase o hito.
- Las decisiones que cambian el rumbo se registran como ADRs en [`../decisions/`](../decisions/README.md).
