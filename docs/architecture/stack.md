# Stack Tecnológico

> Fuente de verdad de las tecnologías y versiones del proyecto.
> **Última actualización**: 2026-07-02

## Frontend

El "frontend" de este proyecto es intencionalmente mínimo: una única vista HTML
estática de bienvenida (`views/index.html`) servida en `/`. No hay framework de
UI ni bundler; el objetivo didáctico es la API, no la interfaz.

| Categoría | Tecnología                | Versión | Por qué |
| --------- | ------------------------- | ------- | ------- |
| Framework | No aplica (HTML estático) | —       | Es un proyecto educativo centrado en la API; una sola página HTML basta para presentar el proyecto. No hay React/Vue ni ningún framework SPA. |
| Estado    | No aplica                 | —       | Al ser una página estática sin lógica de cliente, no hay librería de manejo de estado. |
| Estilos   | NES.css                   | CDN     | Framework CSS de estilo retro (píxel-art tipo consola NES). Se eligió por su valor didáctico y lúdico: hace la vista atractiva sin complejidad. Se carga por CDN, no como dependencia npm. |
| Build     | No aplica                 | —       | El HTML se sirve tal cual; no hay paso de compilación ni empaquetado. |

## Backend

| Categoría           | Tecnología                     | Versión   | Por qué |
| ------------------- | ------------------------------ | --------- | ------- |
| Runtime             | Node.js                        | >= 14 (CI usa 20.x) | Entorno de ejecución JavaScript del lado del servidor; permite enseñar backend con el mismo lenguaje que el frontend. Gestor de paquetes: npm. |
| Framework           | Express                        | ^4.19.2   | Framework web minimalista y muy usado para APIs REST en Node. Su simplicidad lo hace ideal para enseñar rutas, middlewares y el patrón MVC. |
| ORM / capa de datos | No aplica (datos en memoria)   | —         | No hay ORM porque **no existe una base de datos real**: los datos son arrays JavaScript en `models/*.js`. Migrar a un ORM (p. ej. Prisma o Sequelize) es un candidato de roadmap. |
| Validación          | Validaciones manuales en controladores | —  | No se usa una librería dedicada (Joi/Zod). Las reglas de negocio (email único, edad 16–100, semestre 1–12, control de cupos, inscripciones duplicadas) se validan a mano en los controladores, lo que resulta más explícito con fines didácticos. |
| Documentación API   | swagger-jsdoc                  | ^6.2.8    | Genera la especificación OpenAPI 3.0 a partir de anotaciones `@swagger` en los archivos de rutas, manteniendo la doc junto al código. |
| Documentación API   | swagger-ui-express             | ^5.0.1    | Sirve una interfaz interactiva de la API en `/api-docs` a partir de la especificación generada. |
| Configuración       | dotenv                         | ^16.4.5   | Carga variables de entorno (`PORT`, `NODE_ENV`) desde un archivo `.env`, separando configuración de código. |

## Base de Datos

**Este proyecto no utiliza una base de datos real.** La persistencia se simula
con arrays JavaScript en memoria dentro de `models/*.js`. Los cambios (crear,
editar, eliminar) se pierden al reiniciar el servidor. Es una decisión
deliberada para simplificar el aprendizaje y centrar la atención en el diseño de
la API y el patrón MVC.

| Categoría | Tecnología                   | Versión | Por qué |
| --------- | ---------------------------- | ------- | ------- |
| Principal | Datos simulados en memoria   | —       | Arrays en `models/*.js`. Evita configurar un motor de BD y permite enfocarse en la API. Migrar a PostgreSQL/MongoDB es trabajo futuro. |
| Cache     | No aplica                    | —       | No hay capa de cache; el volumen de datos es pequeño y todo vive en memoria. |
| Cola      | No aplica                    | —       | No hay procesamiento asíncrono ni tareas en segundo plano. |

## DevOps & Herramientas

| Categoría    | Tecnología                                    |
| ------------ | --------------------------------------------- |
| CI/CD        | GitHub Actions (`.github/workflows/nodejs.yml`): en push/PR a `main` corre Node 20.x, `npm install` y `npm test`. |
| Contenedores | No aplica (no hay Docker)                      |
| Orquestación | No aplica                                      |
| Monitoreo    | No aplica                                      |
| Testing      | No implementado aún; `npm test` es un placeholder (`echo 'No tests yet' && exit 0`). |
| Despliegue   | Vercel (`vercel.json`, builder `@vercel/node`), deploy automático desde `main`. |
| Dev server   | nodemon ^3.1.4 (dev): reinicia el servidor al detectar cambios (`npm run dev`). |

## Servicios externos

| Servicio              | Uso                                             | Credenciales necesarias |
| --------------------- | ----------------------------------------------- | ----------------------- |
| Vercel                | Hosting y despliegue de la API en producción    | Ninguna en código (se configura en Vercel) |
| NES.css (CDN)         | Estilos retro de la vista `views/index.html`    | Ninguna (recurso público por CDN) |

No hay integraciones con APIs de terceros ni claves secretas en el proyecto.

## Justificación de elecciones

| Tecnología elegida         | Alternativa descartada        | Razón                 |
| -------------------------- | ----------------------------- | --------------------- |
| Express                    | Fastify, NestJS               | Express es el estándar más didáctico y difundido para aprender APIs REST en Node; menos "magia" y curva de aprendizaje suave. |
| Datos en memoria           | PostgreSQL / MongoDB + ORM    | Reduce la fricción de setup para estudiantes; el foco es la API y el MVC, no la administración de una BD. |
| Validaciones manuales      | Joi / Zod                     | Ver las validaciones escritas a mano hace más transparente la lógica de negocio para quien aprende. |
| swagger-jsdoc + swagger-ui-express | Postman / Redoc          | Mantiene la documentación como anotaciones junto al código y ofrece un UI interactivo sin servicios externos. |
| NES.css                    | Bootstrap / Tailwind          | Su estética retro es memorable y motivadora en un contexto educativo. |
| Vercel                     | Render / Railway / Heroku     | Deploy simple, gratuito para este tamaño e integrado con GitHub. |

## Versiones mínimas soportadas

- Node.js >= 14 (el pipeline de CI valida con la versión 20.x).
- npm (incluido con Node.js).
- Base de datos: no aplica (datos simulados en memoria).
