# Convenciones de base de datos

> Reglas y estándares de modelado de datos en udd-api-node.
> Para el modelo de datos concreto del proyecto ver
> [`../architecture/database.md`](../architecture/database.md).
> **Última actualización**: 2026-07-02

> **Estado actual**: la API **no** usa una base de datos real. Los datos son
> **simulados en memoria** como arrays de JavaScript en `models/*.js`
> (`estudianteModel`, `cursoModel`, `inscripcionModel`). No hay ORM y los cambios
> **no persisten** al reiniciar el servidor. Este documento describe las
> convenciones a seguir **si** se migra a una base de datos real.

## Stack (a adoptar en una migración)

- **Motor**: por definir; una opción común y educativa es PostgreSQL.
- **Capa de acceso / ORM**: por definir (p. ej. Prisma o Sequelize para Node).
- **Migraciones**: la herramienta de migraciones del ORM elegido.

Hoy la "capa de acceso" es simplemente lectura y mutación de arrays en `models/`.

## Reglas de modelado

- **Primary keys**: `id` autoincremental y consistente en todas las entidades
  (como hoy en los datos en memoria).
- **Nombres**: mantener el idioma **español** del dominio (`nombre`, `edad`,
  `carrera`, `cuposDisponibles`). Al pasar a SQL, usar `snake_case` para tablas y
  columnas (p. ej. `cupos_disponibles`).
- **Timestamps**: cada tabla debería registrar su creación (hoy existe
  `fechaCreacion` / `fechaInscripcion`); al migrar, añadir también `updated_at`.
- **Foreign keys**: siempre con índice; `NOT NULL` salvo justificación explícita.
  `inscripcion.estudianteId` y `inscripcion.cursoId` son las FK del modelo.
- **Tipos preferidos**:

| Caso              | Tipo                                    |
| ----------------- | --------------------------------------- |
| Email             | `VARCHAR` con restricción `UNIQUE`      |
| Texto corto       | `VARCHAR`                               |
| Texto largo       | `TEXT`                                  |
| JSON estructurado | `JSONB`                                 |
| Dinero (precio)   | `INTEGER` (CLP, sin decimales)          |
| Booleano          | `BOOLEAN` con default                   |

## Reglas de negocio a preservar

Aunque hoy viven en los controladores, estas invariantes deben mantenerse (o
trasladarse a constraints/validaciones si se usa una BD real):

- Email de estudiante **único**.
- `edad` entre 16 y 100; `semestre` entre 1 y 12.
- Control de cupos: no inscribir sin `cuposDisponibles`; se decrementa al inscribir.
- Prevención de inscripciones duplicadas (mismo estudiante + mismo curso).
- Estados de inscripción: `activa`, `completada`, `cancelada`; `calificacion` 1–5.

## Migraciones (al adoptar una BD)

- Reversibles y no destructivas siempre que sea posible.
- Una migración por cambio lógico; nunca editar una migración ya aplicada en `main`.
- Revisar el impacto en datos existentes antes de aplicar en producción.

## Ejemplos

```sql
-- Esquema equivalente si se migrara el modelo a SQL
CREATE TABLE inscripcion (
  id             SERIAL PRIMARY KEY,
  estudiante_id  INTEGER NOT NULL REFERENCES estudiante(id),
  curso_id       INTEGER NOT NULL REFERENCES curso(id),
  estado         VARCHAR NOT NULL DEFAULT 'activa',
  calificacion   INTEGER,
  UNIQUE (estudiante_id, curso_id)
);
```

## Referencias

- [`../architecture/database.md`](../architecture/database.md)
- Documentación del ORM / motor de base de datos que se elija en la migración.
