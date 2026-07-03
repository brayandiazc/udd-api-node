# Convenciones

Esta carpeta documenta **cómo trabajamos** en udd-api-node (API de Estudiantes,
Cursos e Inscripciones): reglas y estándares transversales que aplican al día a
día, independientes de cualquier feature concreta.

> Diferencia con `docs/architecture/`: aquí van las **reglas** ("cómo modelamos
> datos"); en `architecture/` va **este** proyecto en concreto ("cuál es nuestro
> modelo de datos").

## Convenciones incluidas

| Convención                                     | Tema                                    |
| ---------------------------------------------- | --------------------------------------- |
| [authentication.md](authentication.md)         | Autenticación y autorización (roadmap)  |
| [database.md](database.md)                     | Modelado de datos (hoy en memoria)      |
| [deploy.md](deploy.md)                         | Despliegue en Vercel                    |
| [quality-tooling.md](quality-tooling.md)       | Linters, formato y auditoría            |
| [secrets.md](secrets.md)                       | Manejo de secretos y credenciales       |
| [testing.md](testing.md)                       | Estrategia y estándares de testing      |
| [views-and-layouts.md](views-and-layouts.md)   | Vistas y UI compartida                  |

## Convenciones opcionales no incluidas

Esta es una API educativa, así que se omitieron convenciones que no aplican a su
alcance actual. No están en esta carpeta, pero puedes crearlas con `_template.md`
si el proyecto crece:

- **branding.md** — identidad de marca y assets.
- **design-system.md** — sistema de diseño y componentes.
- **i18n.md** — internacionalización.
- **seo.md** — SEO y metadatos.
- **transactional-emails.md** — correos transaccionales.

También son candidatas si el proyecto evoluciona hacia un SaaS: pagos, webhooks,
multi-tenancy, administración, aceptación legal y observabilidad.

## Agregar una convención

Copia [`_template.md`](_template.md), renómbralo en `kebab-case` y documenta el
nuevo tema. Añádelo a la tabla de arriba.
