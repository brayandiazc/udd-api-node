# Convenciones de vistas y layouts

> Cómo organizamos vistas y UI compartida en udd-api-node.
> **Última actualización**: 2026-07-02

> **Estado actual**: la interfaz de este proyecto es mínima: una sola vista HTML
> estática (`views/index.html`) servida en `/`, con estética retro mediante
> **NES.css**. No hay motor de plantillas, layouts múltiples ni sistema de
> autenticación en la UI. La documentación interactiva de la API vive aparte, en
> `/api-docs` (Swagger UI).

## Vistas

| Vista                | Uso                                            |
| -------------------- | ---------------------------------------------- |
| `views/index.html`   | Página de inicio estática (guía y presentación)|
| `/api-docs`          | Documentación interactiva OpenAPI (Swagger UI) |

No existen (todavía) layouts diferenciados de marketing, auth o app. Si la UI
crece, conviene extraer un layout base y parciales reutilizables.

## Elementos compartidos

- **Estilos**: NES.css da el look retro común; mantener la coherencia visual con
  esa librería.
- **Head**: metadatos básicos de la página (título y charset) en `index.html`.

## Reglas

- Reutiliza estilos y marcado; no dupliques bloques si la vista crece.
- La vista contempla su propósito educativo: enlaces claros a `/api-docs` y a los
  recursos principales de la API.
- Separa estructura (HTML) de estilos (NES.css) de comportamiento (JS, si se añade).

## Estructura

```text
views/
└── index.html    # vista estática servida en "/"
```

## Referencias

- [NES.css](https://nostalgic-css.github.io/NES.css/)
- Swagger UI servido en `/api-docs` (configurado en `index.js`).
