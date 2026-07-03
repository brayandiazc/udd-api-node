# Referencia de API

> Endpoints, autenticación y convenciones de la API de **udd-api-node**.
> Documentación interactiva (Swagger UI): `/api-docs`
> — local: http://localhost:3000/api-docs
> — producción: https://node-api-estudiantes.vercel.app/api-docs
>
> **Última actualización**: 2026-07-02

## Convenciones generales

- **URL base**: `http://localhost:3000` (local) · `https://node-api-estudiantes.vercel.app` (producción).
- **Versionado**: no hay prefijo de versión en la ruta; los recursos cuelgan de la raíz (`/estudiantes`, `/cursos`, `/inscripciones`).
- **Formato**: JSON (`Content-Type: application/json`).
- **Fechas**: se manejan como cadenas con formato `YYYY-MM-DD` (p. ej. `"2024-01-15"`).

## Autenticación de la API

- **No hay autenticación**: la API es **pública**. No se requiere token ni API key.
- Ver [`auth.md`](auth.md) para el estado actual y el plan futuro (JWT).

## Manejo de errores

Los errores se devuelven como JSON con un mensaje legible, por ejemplo:

```json
{
  "mensaje": "Estudiante no encontrado"
}
```

| Código HTTP | Significado                                             |
| ----------- | ------------------------------------------------------ |
| 200         | Éxito (GET, PUT, DELETE)                                |
| 201         | Recurso creado (POST)                                  |
| 400         | Solicitud inválida (validación fallida, cupos, duplicado) |
| 404         | Recurso no encontrado                                  |
| 500         | Error interno del servidor                             |

> No se usan los códigos 401/403 porque no hay autenticación, ni 429 porque no hay rate limiting.

## Paginación, filtrado y ordenamiento

- **Paginación**: no implementada; los listados devuelven todos los registros.
- **Filtrado**: se hace con endpoints específicos por ruta (p. ej. `/cursos/categoria/:categoria`), no con query strings.
- **Ordenamiento**: no implementado.

## Endpoints

### Estudiantes (`/estudiantes`)

```http
GET    /estudiantes                    # Listar todos los estudiantes
GET    /estudiantes/:id                # Obtener un estudiante por id
POST   /estudiantes                    # Crear un estudiante
PUT    /estudiantes/:id                # Actualizar un estudiante
DELETE /estudiantes/:id                # Eliminar un estudiante
GET    /estudiantes/carrera/:carrera   # Filtrar por carrera
GET    /estudiantes/semestre/:semestre # Filtrar por semestre
```

**Ejemplo — crear un estudiante:**

```http
POST /estudiantes
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "edad": 20,
  "email": "juan.perez@email.com",
  "carrera": "Ingeniería Informática",
  "semestre": 4,
  "estado": "activo"
}
```

**Respuesta (201 Created):**

```json
{
  "id": 23,
  "nombre": "Juan Pérez",
  "edad": 20,
  "email": "juan.perez@email.com",
  "carrera": "Ingeniería Informática",
  "semestre": 4,
  "estado": "activo",
  "fechaCreacion": "2026-07-02"
}
```

### Cursos (`/cursos`)

```http
GET    /cursos                         # Listar todos los cursos
GET    /cursos/:id                     # Obtener un curso por id
POST   /cursos                         # Crear un curso
PUT    /cursos/:id                     # Actualizar un curso
DELETE /cursos/:id                     # Eliminar un curso
GET    /cursos/categoria/:categoria    # Filtrar por categoría
GET    /cursos/instructor/:instructor  # Filtrar por instructor
GET    /cursos/disponibles             # Solo cursos con cupos disponibles
GET    /cursos/precio/:min/:max        # Filtrar por rango de precio
```

**Ejemplo — obtener un curso (`GET /cursos/1`):**

```json
{
  "id": 1,
  "nombre": "Curso de Node.js",
  "duracion": "4 semanas",
  "precio": 150000,
  "instructor": "Carlos Mendoza",
  "cupos": 25,
  "cuposDisponibles": 18,
  "categoria": "Backend",
  "estado": "activo",
  "fechaCreacion": "2024-01-10"
}
```

### Inscripciones (`/inscripciones`)

```http
GET    /inscripciones                          # Listar todas las inscripciones
GET    /inscripciones/:id                       # Obtener una inscripción por id
POST   /inscripciones                           # Crear una inscripción
PUT    /inscripciones/:id                       # Actualizar una inscripción
DELETE /inscripciones/:id                       # Eliminar una inscripción
GET    /inscripciones/estudiante/:estudianteId  # Inscripciones de un estudiante
GET    /inscripciones/curso/:cursoId            # Inscripciones de un curso
```

**Ejemplo — crear una inscripción:**

```http
POST /inscripciones
Content-Type: application/json

{
  "estudianteId": 1,
  "cursoId": 1
}
```

**Respuesta (201 Created):**

```json
{
  "id": 30,
  "estudianteId": 1,
  "cursoId": 1,
  "fechaInscripcion": "2026-07-02",
  "estado": "activa",
  "calificacion": null,
  "fechaCompletado": null
}
```

**Respuesta de error (400) si no hay cupos o la inscripción está duplicada:**

```json
{
  "mensaje": "No hay cupos disponibles para este curso"
}
```

## Rate limiting

- **No aplica**: la API no impone límite de tasa.

## Webhooks (si aplica)

- **No aplica**: la API no envía ni recibe webhooks.

## Changelog de la API

- Sin versionado formal de la API. Los cambios se registran en el historial de
  Git del repositorio. La documentación viva de cada endpoint está en Swagger UI
  (`/api-docs`), generada desde las anotaciones `@swagger` de `routes/*.js`.
