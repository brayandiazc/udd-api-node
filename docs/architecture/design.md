# Diseño — udd-api-node

> Decisiones de diseño técnico y de producto: cómo se resuelve el problema y
> cómo se ve y se siente el producto. Las decisiones relevantes se promueven a
> ADRs en [`../decisions/`](../decisions/README.md).
>
> **Última actualización**: 2026-07-02

## Contexto y objetivos

- **Problema**: los estudiantes de la UDD (Universidad del Desarrollo) necesitan un ejemplo completo y comprensible de cómo construir una API RESTful con Node.js y Express.
- **Objetivos**: enseñar, paso a paso, APIs REST, el patrón MVC, la documentación con Swagger, las validaciones de negocio y el despliegue en la nube; con un código legible y sin complejidad accidental.
- **No-objetivos**: no busca ser un sistema de producción, no maneja datos reales/sensibles, no implementa persistencia real ni autenticación (ver [`auth.md`](auth.md)).

## Requisitos

### Funcionales

- CRUD completo de **estudiantes**, **cursos** e **inscripciones**.
- Endpoints de filtrado (por carrera, semestre, categoría, instructor, disponibilidad, rango de precio) y de relación (inscripciones por estudiante y por curso).
- Validaciones de negocio: email único, edad 16–100, semestre 1–12, control de cupos, prevención de inscripciones duplicadas y calificación 1–5.
- Documentación interactiva de la API en `/api-docs`.
- Vista de bienvenida en `/`.

### No funcionales

- **Claridad/didáctica** por encima de la optimización: el código debe leerse fácil.
- **Simplicidad de setup**: datos en memoria, sin BD que configurar.
- **Portabilidad**: corre local con `npm start`/`npm run dev` y se despliega en Vercel.
- No se priorizan escalabilidad, alta disponibilidad ni seguridad (son un entorno de aprendizaje).

## Diseño propuesto

- **Enfoque general**: API RESTful sobre Express siguiendo MVC, con datos simulados en memoria. Ver el detalle en [`architecture.md`](architecture.md).
- **Componentes y flujos**: rutas (`routes/`) → controladores (`controllers/`) → modelos en memoria (`models/`). La vista HTML y Swagger UI se montan como capas de presentación. Ver [`architecture.md`](architecture.md).

## Alternativas consideradas

| Alternativa                    | Pros                                  | Contras                                | ¿Por qué se descartó?                         |
| ------------------------------ | ------------------------------------- | -------------------------------------- | --------------------------------------------- |
| Base de datos real + ORM       | Persistencia, realismo                | Setup y complejidad extra              | Distrae del objetivo didáctico central (la API y el MVC). |
| Framework más completo (NestJS)| Estructura y buenas prácticas         | Curva de aprendizaje alta, más "magia" | Express es más transparente para aprender.    |
| SPA (React/Vue) como frontend  | UI rica                               | Complejidad de build y estado          | El foco es la API; basta una vista HTML estática. |
| Bootstrap/Tailwind para la vista | Estética moderna                    | Menos memorable                        | NES.css es más lúdico y motivador en lo educativo. |

## Identidad visual y sistema de diseño

- **Principios de diseño**: claridad, tono didáctico y una estética lúdica que motive a aprender.
- **Vista HTML (`views/index.html`)**: página de bienvenida con **NES.css**, un framework CSS de estilo **retro / píxel-art** inspirado en la consola NES. Se carga por CDN. Presenta el proyecto y enlaza a la documentación.
- **Swagger UI (`/api-docs`)**: interfaz interactiva para explorar y probar los endpoints; es la "cara" técnica del producto y su documentación viva.
- **Tokens**: no hay un sistema formal de tokens de diseño; los estilos provienen de NES.css (paleta y tipografía retro predefinidas).
- **Componentes**: se usan los componentes/clases que provee NES.css (contenedores, botones, tipografía pixelada).

## Accesibilidad

- La estética retro de NES.css usa tipografía pixelada y colores marcados; conviene revisar el **contraste** con el objetivo WCAG AA en textos importantes.
- Al ser una única página informativa con poca interacción, la navegación por teclado es sencilla; aun así, todo enlace debe ser accesible y con foco visible.
- No es un objetivo prioritario del proyecto, pero se recomienda cuidarlo como buena práctica.

## Estados de la interfaz

La superficie de UI es mínima (una página estática y Swagger UI), por lo que los
estados clásicos (carga/vacío/error/éxito) recaen sobre todo en las **respuestas
de la API**, no en la vista HTML:

- **Éxito**: respuestas 200/201 con el JSON del recurso.
- **Error**: respuestas 400/404/500 con `{ "mensaje": "..." }`.
- **Vacío**: listados que devuelven un array vacío `[]`.
- **Carga**: gestionada por el cliente HTTP o por Swagger UI al ejecutar una petición.

## Modelo de datos afectado

Las entidades (Estudiante, Curso, Inscripcion) se documentan en
[`database.md`](database.md). Recordar que la persistencia es **en memoria**, no
una base de datos real.

## Riesgos y mitigaciones

| Riesgo                                          | Impacto | Mitigación                                                        |
| ----------------------------------------------- | ------- | ----------------------------------------------------------------- |
| Pérdida de datos al reiniciar (datos en memoria)| Bajo    | Es esperado y didáctico; se documenta claramente. Migrar a BD real es roadmap. |
| API pública sin autenticación                   | Medio   | No usar datos reales/sensibles; documentar el riesgo (ver [`auth.md`](auth.md)). |
| Ausencia de tests automatizados                 | Medio   | `npm test` es placeholder; añadir tests es trabajo futuro.        |
| Contraste/legibilidad de NES.css                | Bajo    | Revisar contraste de textos clave con objetivo WCAG AA.           |

## Preguntas abiertas

- [ ] ¿Se migrará a una base de datos real (PostgreSQL/MongoDB) con un ORM?
- [ ] ¿Se añadirá autenticación con JWT y roles?
- [ ] ¿Se incorporará una suite de tests automatizados?
