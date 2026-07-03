# Convenciones de autenticación y autorización

> Reglas transversales de autenticación y autorización en udd-api-node.
> Para cómo funciona la auth en este proyecto ver
> [`../architecture/auth.md`](../architecture/auth.md).
> **Última actualización**: 2026-07-02

> **Estado actual**: la API **no** implementa autenticación todavía. Todos los
> endpoints son públicos. Este documento describe las reglas a aplicar **cuando**
> se agregue auth (candidato de roadmap con JWT), para no improvisar la seguridad
> después.

## Stack (a adoptar)

- **Autenticación**: JSON Web Tokens (JWT) vía `jsonwebtoken`, enviados en el
  header `Authorization: Bearer <token>`.
- **Autorización**: middleware de Express que valida el token y, si aplica, el rol
  del usuario antes de ejecutar el controlador.
- **Hashing de contraseñas**: `bcrypt` (o `argon2`) con salt; nunca guardar
  contraseñas en texto plano.

## Reglas

- La autorización se valida **siempre en el servidor**, en cada request.
- Nunca confiar en checks de cliente para decisiones de seguridad.
- Las contraseñas se almacenan hasheadas con un algoritmo robusto y salt.
- Los tokens se firman con un secreto que vive en variables de entorno (ver
  [`secrets.md`](secrets.md)), nunca hardcodeado.
- Los tokens tienen expiración corta y se emiten de nuevo en cada login.
- Los flujos OAuth/SSO, si se agregan, se validan server-side (email y UID).

## Modelo (a definir al implementar)

- **Usuario**: `id` (PK), `email` (único), `passwordHash`, `rol`, `fechaCreacion`.
- **Sesión / token**: JWT sin estado (stateless), con `sub` (id de usuario),
  `rol` y `exp`.
- **Roles / permisos**: RBAC simple, por ejemplo `admin` y `estudiante`.

## Ejemplos

```js
// Middleware de verificación de token (Express + jsonwebtoken)
const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ error: "No autorizado" });
  }
}
```

## Comandos útiles

```bash
# Instalar las dependencias cuando se implemente auth
npm install jsonwebtoken bcrypt
```

## Referencias

- [`../architecture/auth.md`](../architecture/auth.md)
- [SECURITY.md](../../SECURITY.md)
- [Documentación de jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
