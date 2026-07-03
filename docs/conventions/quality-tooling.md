# Convenciones de calidad y tooling

> Linters, formato, análisis estático y git hooks de udd-api-node.
> **Última actualización**: 2026-07-02

> **Estado actual**: el proyecto **no** tiene linter ni formateador configurado
> todavía. Solo existe un `.editorconfig` para uniformar estilos básicos del
> editor. Este documento recomienda el estándar a adoptar.

## Stack (recomendado a adoptar)

- **Linter**: ESLint (estándar de facto en Node.js).
- **Formateador**: Prettier.
- **Estilos de editor**: `.editorconfig` (ya presente en el repositorio).
- **Auditoría de dependencias**: `npm audit` (incluido con npm, sin instalar nada).
- **Orquestador de git hooks**: Husky (opcional, si se quieren checks automáticos).

## Git hooks (opcional, si se adopta Husky)

Estrategia sugerida: hooks baratos y rápidos en `pre-commit`, los más costosos en
`pre-push`. CI ejecuta todo de nuevo en el servidor.

### pre-commit (en cada commit)

- Linter (ESLint) sobre archivos cambiados.
- Formato automático (Prettier).
- Verificación de trailing whitespace, fin de archivo y conflictos sin resolver.

### pre-push (al subir)

- Linter completo.
- `npm audit` para revisar vulnerabilidades en dependencias.

## Reglas

- Cuando se adopte ESLint/Prettier, el código debe pasar linter y formato antes del
  merge.
- Respetar `.editorconfig` (indentación y fin de línea) en todos los archivos.
- Revisar `npm audit` periódicamente y ante cada actualización de dependencias.

## Comandos útiles

```bash
npm audit              # Auditar vulnerabilidades de dependencias
npm audit fix          # Corregir automáticamente las que sea posible

# Tras adoptar ESLint + Prettier (aún no configurados):
npx eslint .           # Linter
npx prettier --write . # Formatear
```

## Referencias

- [ESLint](https://eslint.org/) · [Prettier](https://prettier.io/)
- [npm audit](https://docs.npmjs.com/cli/commands/npm-audit)
- `.editorconfig` en la raíz del proyecto.
