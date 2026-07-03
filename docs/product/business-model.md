# udd-api-node — Modelo de Valor (Proyecto Educativo)

> Este **no** es un producto comercial: es un proyecto educativo y open source sin
> fines de lucro. Por eso adaptamos el marco de negocio clásico (Lean Canvas) a su
> propósito real: **enseñar**. Donde la plantilla pide precios, ingresos o márgenes,
> se indica que **no aplica** (el proyecto es gratuito y de código abierto bajo licencia MIT).
> **Última actualización**: 2026-07-02

## 1. Problema

- Muchos estudiantes que empiezan con backend entienden la teoría de una API REST,
  pero no saben cómo **estructurar un proyecto real** con Node.js y Express.
- Los tutoriales suelen ser fragmentos sueltos: falta un ejemplo **completo y coherente**
  que integre modelos, controladores, rutas, validaciones, documentación y despliegue.
- **Alternativas actuales**: videos de YouTube, documentación oficial dispersa y
  cursos que rara vez muestran el proyecto de principio a fin ni buenas prácticas de organización.

## 2. Público (a quién sirve)

| Segmento                     | Descripción                                                        | Notas                                  |
| ---------------------------- | ----------------------------------------------------------------- | -------------------------------------- |
| Estudiantes de la UDD        | Alumnado de la Universidad del Desarrollo que refuerza backend.    | Público principal / motivo de origen.  |
| Personas aprendiendo Node/Express | Cualquiera que quiera un ejemplo real de API REST con MVC.    | Se benefician por ser open source.     |
| Docentes y mentores          | Quienes buscan material de apoyo para clases o mentorías.          | Pueden reutilizar y adaptar el código. |

- **Usuario ideal**: alguien con nociones básicas de JavaScript que quiere ver
  cómo se arma una API REST completa, paso a paso.
- **Primeros usuarios**: estudiantes de la UDD en instancias de reforzamiento.

## 3. Propuesta de valor

- Un **ejemplo funcional y completo** de API REST con Node.js + Express siguiendo MVC,
  con datos, validaciones, documentación interactiva y despliegue real, todo en un solo repositorio.
- **Concepto de alto nivel**: "un proyecto de referencia, no un tutorial suelto" — se
  puede clonar, ejecutar y estudiar de principio a fin.

## 4. Solución (el producto)

| Módulo / Capacidad          | Qué resuelve                                                                 |
| --------------------------- | ---------------------------------------------------------------------------- |
| API REST (Estudiantes/Cursos/Inscripciones) | Muestra CRUD real, filtros y relaciones entre entidades.    |
| Patrón MVC (`controllers/`, `models/`, `routes/`) | Enseña a separar responsabilidades en un backend.     |
| Datos simulados en memoria (seed) | Permite probar la API sin instalar ni configurar una base de datos.    |
| Validaciones de negocio     | Ilustran control de cupos, emails únicos, rangos y estados.                   |
| Documentación con Swagger (`/api-docs`) | Enseña a documentar y probar la API de forma interactiva.        |
| Vista con NES.css (`/`)     | Da un frontend simple y llamativo para explorar la API.                      |
| Despliegue en Vercel        | Muestra cómo llevar el proyecto a producción sin costo.                      |

## 5. Canales (cómo llega a las personas)

- Repositorio público en GitHub: <https://github.com/brayandiazc/udd-api-node>.
- Sesiones de reforzamiento y clases en la UDD.
- Demo en producción: <https://node-api-estudiantes.vercel.app> (docs en `/api-docs`).

## 6. Modelo de ingresos

- **No aplica.** El proyecto es **gratuito y open source** (licencia MIT). No hay planes,
  precios ni cobro alguno. El "retorno" es puramente educativo: aprendizaje y práctica.

## 7. Estructura de costos

- **Costos de operación**: prácticamente nulos. El despliegue en Vercel usa su capa
  gratuita y no hay base de datos ni servicios de pago.
- **Costo principal**: el **tiempo** de quien mantiene y explica el proyecto.

## 8. Métricas de éxito (educativas)

- Que una persona pueda **clonar, ejecutar y entender** el proyecto por su cuenta.
- Cantidad de estudiantes que lo usan como base para sus propios ejercicios.
- Señales de comunidad: estrellas, forks, issues y contribuciones en GitHub.

## 9. Ventaja / diferenciador

- Es un ejemplo **completo, en español y con tono didáctico**, pensado explícitamente
  para reforzamiento, no un fragmento aislado ni un boilerplate sin explicación.

## Decisiones pendientes

- [ ] Definir si se agrega una base de datos real como segundo ejemplo (ver [roadmap](roadmap.md)).
- [ ] Evaluar sumar autenticación (JWT) para enseñar seguridad en APIs.
