# Convenciones de testing

> Cómo escribimos y ejecutamos tests en udd-api-node.
> **Última actualización**: 2026-07-02

> **Estado actual**: el proyecto **no** tiene tests todavía. El script `npm test`
> es un placeholder (`echo 'No tests yet' && exit 0`) que el CI ejecuta sin fallar.
> Este documento recomienda el estándar a adoptar.

## Stack (recomendado a adoptar)

- **Framework de tests**: Jest.
- **Tests de API / integración**: Supertest (levanta la app Express y golpea sus
  endpoints).
- **Cobertura**: la cobertura integrada de Jest (`jest --coverage`).

## Tipos de test

| Tipo         | Qué cubre                                         | Carpeta sugerida       |
| ------------ | ------------------------------------------------- | ---------------------- |
| Unitarios    | Lógica de `controllers/` y `models/` aislada      | `tests/unit/`          |
| Integración  | Endpoints completos (rutas + controller + modelo) | `tests/integration/`   |

Como los datos son simulados en memoria, no se necesita una base de datos de
prueba: cada suite puede trabajar sobre los arrays de `models/` y resetearlos entre
tests para mantener el determinismo.

## Reglas

- Todo cambio funcional se acompaña de tests (una vez adoptado el framework).
- Estructura **Arrange-Act-Assert** (AAA): preparar, ejecutar, verificar.
- Un test verifica **una** cosa; nombres descriptivos del comportamiento esperado.
- Los tests deben ser deterministas (sin dependencia de red, reloj o orden).
- Cubrir en especial las validaciones de negocio: email único, rango de edad
  (16–100) y semestre (1–12), control de cupos y prevención de inscripciones
  duplicadas.

## Ejemplos

```js
// tests/integration/estudiantes.test.js  (Jest + Supertest)
const request = require("supertest");
const app = require("../../index");

describe("GET /estudiantes", () => {
  it("responde 200 con la lista de estudiantes", async () => {
    // Arrange / Act
    const res = await request(app).get("/estudiantes");
    // Assert
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
```

## Comandos útiles

```bash
npm test                 # Ejecutar todos los tests (hoy es un placeholder)

# Tras adoptar Jest + Supertest (aún no configurados):
npx jest                 # Ejecutar la suite
npx jest --coverage      # Con reporte de cobertura
npx jest --watch         # Modo watch
```

## Referencias

- [Jest](https://jestjs.io/) · [Supertest](https://github.com/ladjs/supertest)
