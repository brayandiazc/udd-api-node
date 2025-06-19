// Propósito: Define las rutas de la API para el recurso de estudiantes
const express = require("express");
const router = express.Router();
const estudianteController = require("../controllers/estudianteController");

/**
 * @swagger
 * /estudiantes:
 *   get:
 *     summary: Obtiene todos los estudiantes
 *     responses:
 *       200:
 *         description: Lista de estudiantes
 */
router.get("/", estudianteController.obtenerEstudiantes);

/**
 * @swagger
 * /estudiantes/{id}:
 *   get:
 *     summary: Obtiene un estudiante por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del estudiante
 *     responses:
 *       200:
 *         description: Detalle del estudiante
 *       404:
 *         description: Estudiante no encontrado
 */
router.get("/:id", estudianteController.obtenerEstudiantePorId);

/**
 * @swagger
 * /estudiantes:
 *   post:
 *     summary: Crea un nuevo estudiante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre completo del estudiante
 *               edad:
 *                 type: integer
 *                 minimum: 16
 *                 maximum: 100
 *                 description: Edad del estudiante
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del estudiante
 *               carrera:
 *                 type: string
 *                 description: Carrera del estudiante
 *               semestre:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 12
 *                 description: Semestre actual del estudiante
 *             required:
 *               - nombre
 *               - edad
 *               - email
 *               - carrera
 *               - semestre
 *     responses:
 *       201:
 *         description: Estudiante creado exitosamente
 *       400:
 *         description: Faltan parámetros requeridos o datos inválidos
 */
router.post("/", estudianteController.crearEstudiante);

/**
 * @swagger
 * /estudiantes/{id}:
 *   put:
 *     summary: Actualiza un estudiante
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del estudiante a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre completo del estudiante
 *               edad:
 *                 type: integer
 *                 minimum: 16
 *                 maximum: 100
 *                 description: Edad del estudiante
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del estudiante
 *               carrera:
 *                 type: string
 *                 description: Carrera del estudiante
 *               semestre:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 12
 *                 description: Semestre actual del estudiante
 *               estado:
 *                 type: string
 *                 enum: [activo, inactivo, graduado]
 *                 description: Estado del estudiante
 *     responses:
 *       200:
 *         description: Estudiante actualizado
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Estudiante no encontrado
 */
router.put("/:id", estudianteController.actualizarEstudiante);

/**
 * @swagger
 * /estudiantes/{id}:
 *   delete:
 *     summary: Elimina un estudiante por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del estudiante a eliminar
 *     responses:
 *       200:
 *         description: Estudiante eliminado
 *       404:
 *         description: Estudiante no encontrado
 */
router.delete("/:id", estudianteController.eliminarEstudiante);

/**
 * @swagger
 * /estudiantes/carrera/{carrera}:
 *   get:
 *     summary: Obtiene estudiantes por carrera
 *     parameters:
 *       - in: path
 *         name: carrera
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la carrera a filtrar
 *     responses:
 *       200:
 *         description: Lista de estudiantes de la carrera especificada
 */
router.get(
  "/carrera/:carrera",
  estudianteController.obtenerEstudiantesPorCarrera
);

/**
 * @swagger
 * /estudiantes/semestre/{semestre}:
 *   get:
 *     summary: Obtiene estudiantes por semestre
 *     parameters:
 *       - in: path
 *         name: semestre
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 12
 *         required: true
 *         description: Número del semestre a filtrar
 *     responses:
 *       200:
 *         description: Lista de estudiantes del semestre especificado
 */
router.get(
  "/semestre/:semestre",
  estudianteController.obtenerEstudiantesPorSemestre
);

// Exporta el router para ser utilizado en la aplicación principal
module.exports = router;
