# Glosario

Vocabulario compartido del dominio y del proyecto. Mantén las definiciones cortas
y sin ambigüedad para que todo el equipo use los términos de la misma forma.

> **Última actualización**: 2026-07-02

| Término              | Definición                                                                                                                                                              |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Calificación         | Nota de una inscripción completada, en el rango 1–5. Se registra al finalizar el curso. Ver [`architecture/database.md`](architecture/database.md).                    |
| Carrera              | Programa académico al que pertenece un estudiante (texto libre). Se puede filtrar el listado de estudiantes por carrera.                                               |
| Categoría            | Clasificación temática de un curso: `Backend`, `Frontend`, `Fundamentos`, `Móvil`, `DevOps`, `Cloud` o `Data Science`.                                                 |
| Controlador (Controller) | Capa del patrón MVC que contiene la lógica de negocio y coordina modelos y respuestas. Vive en `controllers/`.                                                     |
| Cupo                 | Plaza disponible en un curso. `cupos` es el total y `cuposDisponibles` los libres; se decrementa al inscribir y bloquea nuevas inscripciones cuando llega a 0.         |
| Curso                | Entidad que representa una asignatura o taller. Tiene nombre, duración, precio (CLP), instructor, cupos, categoría y estado. Hay 22 cursos de ejemplo (seed).          |
| Endpoint             | Ruta HTTP expuesta por la API (p. ej. `GET /estudiantes/:id`). El catálogo completo está en [`architecture/api.md`](architecture/api.md).                              |
| Estado               | Situación de una entidad. Estudiante: `activo`, `inactivo` o `graduado`. Inscripción: `activa`, `completada` o `cancelada`.                                            |
| Estudiante           | Entidad principal del dominio. Tiene id, nombre, edad (16–100), email único, carrera, semestre (1–12) y estado. Hay 22 estudiantes de ejemplo (seed).                  |
| Inscripción          | Relación entre un estudiante y un curso (tabla puente). Registra `estudianteId`, `cursoId`, fecha, estado y calificación. Un estudiante no puede inscribirse dos veces al mismo curso. |
| Modelo (Model)       | Capa del patrón MVC que representa y almacena los datos. Aquí son **arrays en memoria** en `models/`, no una base de datos real.                                        |
| MVC                  | Patrón _Model–View–Controller_ que separa datos (modelos), lógica (controladores) y presentación (vistas). Es la arquitectura base del proyecto.                       |
| OpenAPI              | Especificación estándar para describir APIs REST (antes Swagger). Este proyecto usa OpenAPI 3.0 generado con `swagger-jsdoc`.                                           |
| Ruta (Route)         | Definición que asocia un método HTTP y una URL con un controlador. Vive en `routes/` e incluye las anotaciones `@swagger`.                                             |
| Seed                 | Datos de ejemplo precargados en memoria al iniciar la app (22 estudiantes y 22 cursos) para poder probar la API sin crear todo a mano.                                 |
| Semestre             | Nivel académico del estudiante, un número entero de 1 a 12. Se puede filtrar el listado de estudiantes por semestre.                                                   |
| Swagger              | Conjunto de herramientas para documentar y probar la API. `swagger-ui-express` sirve una interfaz interactiva en `/api-docs`.                                          |
| Vista (View)         | Capa del patrón MVC para la presentación. Aquí es una única página estática `views/index.html` con estilo retro NES.css, servida en `/`.                               |

> Convención: ordena los términos alfabéticamente y enlaza al documento donde se
> detalla cada concepto cuando aplique.
