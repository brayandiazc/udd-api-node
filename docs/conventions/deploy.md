# Convenciones de despliegue

> Operaciones de producción de udd-api-node. Fuente de verdad de cómo se
> despliega y se opera el sistema.
> **Última actualización**: 2026-07-02

## Stack de infraestructura

- **Hosting / cómputo**: Vercel (builder `@vercel/node`, configurado en `vercel.json`).
- **DNS / TLS**: gestionados por Vercel (dominio `*.vercel.app` con HTTPS automático).
- **Contenedores / orquestación**: no aplica. Vercel ejecuta la app como función
  serverless de Node; no hay contenedores propios.
- **CI**: GitHub Actions (`.github/workflows/nodejs.yml`) corre en push/PR a `main`
  con Node 20.x, ejecutando `npm install` y `npm test`.

## Ambientes

No hay ambientes de staging ni desarrollo formales. Solo existe producción, que se
despliega automáticamente desde `main`.

| Ambiente   | URL                                          | Rama   | Deploy     |
| ---------- | -------------------------------------------- | ------ | ---------- |
| Producción | https://node-api-estudiantes.vercel.app      | `main` | Automático |

Docs en producción: https://node-api-estudiantes.vercel.app/api-docs

## Reglas

- Solo se despliega a producción desde `main`; cada push a `main` dispara un deploy
  automático en Vercel.
- Las variables de entorno y secretos se gestionan según [`secrets.md`](secrets.md)
  (en Vercel, mediante Environment Variables).
- **No hay migraciones de base de datos**: los datos son simulados en memoria, así
  que no existe un paso de migración en el despliegue.
- Verificar que la app responde tras cada deploy.

## Procedimiento de deploy

El deploy es automático al hacer merge a `main`. En local se ejecuta con:

```bash
# Iniciar el servidor (mismo comando que usa Vercel como entrypoint)
npm start
```

## Rollback

- Vercel conserva los deploys anteriores. Para revertir, promover un deployment
  previo desde el dashboard de Vercel ("Rollback" / "Promote to Production").
- Alternativa vía git: revertir el commit en `main` para gatillar un nuevo deploy.

## Verificación post-deploy

- La aplicación sirve la vista en `/` y la documentación Swagger en `/api-docs`.
- Comprobación rápida tras un deploy:

```bash
curl https://node-api-estudiantes.vercel.app/estudiantes
```

## Referencias

- [Documentación de Vercel para Node.js](https://vercel.com/docs)
- `vercel.json` en la raíz del proyecto.
