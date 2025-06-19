// Propósito: Manejar las rutas de la API relacionadas con los cursos
const express = require("express");
const router = express.Router();
const cursoController = require("../controllers/cursoController");

/**
 * @swagger
 * /cursos:
 *   get:
 *     summary: Obtiene todos los cursos
 *     responses:
 *       200:
 *         description: Lista de cursos
 */
router.get("/", cursoController.obtenerCursos);

/**
 * @swagger
 * /cursos/{id}:
 *   get:
 *     summary: Obtiene un curso por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Detalle del curso
 *       404:
 *         description: Curso no encontrado
 */
router.get("/:id", cursoController.obtenerCursoPorId);

/**
 * @swagger
 * /cursos:
 *   post:
 *     summary: Crea un nuevo curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del curso
 *               duracion:
 *                 type: string
 *                 description: Duración del curso
 *               precio:
 *                 type: integer
 *                 minimum: 1
 *                 description: Precio del curso
 *               instructor:
 *                 type: string
 *                 description: Nombre del instructor
 *               cupos:
 *                 type: integer
 *                 minimum: 1
 *                 description: Número total de cupos
 *               categoria:
 *                 type: string
 *                 enum: [Backend, Frontend, Fundamentos, Móvil, DevOps, Cloud, Data Science]
 *                 description: Categoría del curso
 *             required:
 *               - nombre
 *               - duracion
 *               - precio
 *               - instructor
 *               - cupos
 *               - categoria
 *     responses:
 *       201:
 *         description: Curso creado exitosamente
 *       400:
 *         description: Faltan parámetros requeridos o datos inválidos
 */
router.post("/", cursoController.crearCurso);

/**
 * @swagger
 * /cursos/{id}:
 *   put:
 *     summary: Actualiza un curso
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del curso a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del curso
 *               duracion:
 *                 type: string
 *                 description: Duración del curso
 *               precio:
 *                 type: integer
 *                 minimum: 1
 *                 description: Precio del curso
 *               instructor:
 *                 type: string
 *                 description: Nombre del instructor
 *               cupos:
 *                 type: integer
 *                 minimum: 1
 *                 description: Número total de cupos
 *               categoria:
 *                 type: string
 *                 enum: [Backend, Frontend, Fundamentos, Móvil, DevOps, Cloud, Data Science]
 *                 description: Categoría del curso
 *               estado:
 *                 type: string
 *                 enum: [activo, inactivo, completado]
 *                 description: Estado del curso
 *     responses:
 *       200:
 *         description: Curso actualizado
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Curso no encontrado
 */
router.put("/:id", cursoController.actualizarCurso);

/**
 * @swagger
 * /cursos/{id}:
 *   delete:
 *     summary: Elimina un curso por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del curso a eliminar
 *     responses:
 *       200:
 *         description: Curso eliminado
 *       400:
 *         description: No se puede eliminar curso con estudiantes inscritos
 *       404:
 *         description: Curso no encontrado
 */
router.delete("/:id", cursoController.eliminarCurso);

/**
 * @swagger
 * /cursos/categoria/{categoria}:
 *   get:
 *     summary: Obtiene cursos por categoría
 *     parameters:
 *       - in: path
 *         name: categoria
 *         schema:
 *           type: string
 *         required: true
 *         description: Categoría del curso a filtrar
 *     responses:
 *       200:
 *         description: Lista de cursos de la categoría especificada
 */
router.get("/categoria/:categoria", cursoController.obtenerCursosPorCategoria);

/**
 * @swagger
 * /cursos/instructor/{instructor}:
 *   get:
 *     summary: Obtiene cursos por instructor
 *     parameters:
 *       - in: path
 *         name: instructor
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre del instructor a filtrar
 *     responses:
 *       200:
 *         description: Lista de cursos del instructor especificado
 */
router.get(
  "/instructor/:instructor",
  cursoController.obtenerCursosPorInstructor
);

/**
 * @swagger
 * /cursos/disponibles:
 *   get:
 *     summary: Obtiene cursos con cupos disponibles
 *     responses:
 *       200:
 *         description: Lista de cursos que tienen cupos disponibles
 */
router.get("/disponibles", cursoController.obtenerCursosDisponibles);

/**
 * @swagger
 * /cursos/precio/{min}/{max}:
 *   get:
 *     summary: Obtiene cursos por rango de precio
 *     parameters:
 *       - in: path
 *         name: min
 *         schema:
 *           type: integer
 *         required: true
 *         description: Precio mínimo
 *       - in: path
 *         name: max
 *         schema:
 *           type: integer
 *         required: true
 *         description: Precio máximo
 *     responses:
 *       200:
 *         description: Lista de cursos en el rango de precio especificado
 */
router.get("/precio/:min/:max", cursoController.obtenerCursosPorPrecio);

// Exporta el router para ser utilizado en la aplicación principal
module.exports = router;
