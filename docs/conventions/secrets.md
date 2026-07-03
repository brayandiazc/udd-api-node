# Convenciones de secretos y credenciales

> Cómo gestionamos secretos en udd-api-node.
> **Última actualización**: 2026-07-02

## Filosofía

- Los secretos **nunca** se commitean en texto plano.
- Separación clara entre **configuración** (no sensible) y **secretos** (sensible).

En este proyecto la configuración se carga con `dotenv` desde un archivo `.env`
local. Hoy las variables usadas son `PORT` (puerto local, por defecto 3000) y
`NODE_ENV`; ninguna es realmente secreta, pero la práctica se mantiene para cuando
se agreguen credenciales (p. ej. un `JWT_SECRET` al implementar autenticación).

## Dónde vive cada cosa

| Tipo                         | Dónde                                           |
| ---------------------------- | ----------------------------------------------- |
| Configuración local          | Archivo `.env` (ignorado por git)               |
| Contrato de variables        | `.env.example` (versionado, sin valores reales) |
| Variables en producción      | Environment Variables de Vercel                 |
| Secretos de CI/CD            | Secrets de GitHub Actions                       |

## Reglas

- El archivo `.env` está en `.gitignore`; solo se versiona `.env.example` (sin valores).
- `.env.example` es el **contrato**: documenta qué variables necesita la app
  (`PORT`, `NODE_ENV`) sin exponer valores.
- En producción, las variables se cargan desde las Environment Variables de Vercel,
  no desde un `.env` subido.
- Comparte secretos con nuevos colaboradores **fuera de banda** (nunca por git,
  email plano ni chat público).
- Rota credenciales periódicamente (sugerido cada 90 días) y de inmediato ante
  sospecha de fuga.
- Si un secreto se commitea por error: **rota el secreto primero**, luego limpia la
  historia.

## Ejemplos

```bash
# Copiar la plantilla de variables
cp .env.example .env
# Completar valores reales (que nunca se suben). Ejemplo de contenido:
# PORT=3000
# NODE_ENV=development
```

## Comandos útiles

```bash
# Agregar/actualizar una variable en producción (CLI de Vercel)
vercel env add NOMBRE_VARIABLE
```

## Referencias

- [SECURITY.md](../../SECURITY.md) — política de seguridad.
- [Environment Variables en Vercel](https://vercel.com/docs/projects/environment-variables)
