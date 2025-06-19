// Propósito: Define las rutas de la API para el recurso de inscripciones
const express = require("express");
const router = express.Router();
const inscripcionController = require("../controllers/inscripcionController");

/**
 * @swagger
 * /inscripciones:
 *   get:
 *     summary: Obtiene todas las inscripciones con información detallada
 *     responses:
 *       200:
 *         description: Lista de inscripciones con datos de estudiantes y cursos
 */
router.get("/", inscripcionController.obtenerInscripciones);

/**
 * @swagger
 * /inscripciones/{id}:
 *   get:
 *     summary: Obtiene una inscripción específica por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la inscripción
 *     responses:
 *       200:
 *         description: Detalle de la inscripción
 *       404:
 *         description: Inscripción no encontrada
 */
router.get("/:id", inscripcionController.obtenerInscripcionPorId);

/**
 * @swagger
 * /inscripciones:
 *   post:
 *     summary: Crea una nueva inscripción de estudiante a curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estudianteId:
 *                 type: integer
 *                 description: ID del estudiante
 *               cursoId:
 *                 type: integer
 *                 description: ID del curso
 *             required:
 *               - estudianteId
 *               - cursoId
 *     responses:
 *       201:
 *         description: Inscripción creada exitosamente
 *       400:
 *         description: Error de validación o curso sin cupos
 *       404:
 *         description: Estudiante o curso no encontrado
 */
router.post("/", inscripcionController.crearInscripcion);

/**
 * @swagger
 * /inscripciones/{id}:
 *   put:
 *     summary: Actualiza una inscripción (calificación, estado)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la inscripción a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               calificacion:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Calificación del estudiante (1-5)
 *               estado:
 *                 type: string
 *                 enum: [activa, completada, cancelada]
 *                 description: Estado de la inscripción
 *     responses:
 *       200:
 *         description: Inscripción actualizada
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Inscripción no encontrada
 */
router.put("/:id", inscripcionController.actualizarInscripcion);

/**
 * @swagger
 * /inscripciones/{id}:
 *   delete:
 *     summary: Cancela una inscripción (libera cupo del curso)
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la inscripción a cancelar
 *     responses:
 *       200:
 *         description: Inscripción cancelada exitosamente
 *       400:
 *         description: Inscripción ya cancelada
 *       404:
 *         description: Inscripción no encontrada
 */
router.delete("/:id", inscripcionController.cancelarInscripcion);

/**
 * @swagger
 * /inscripciones/estudiante/{estudianteId}:
 *   get:
 *     summary: Obtiene todas las inscripciones de un estudiante específico
 *     parameters:
 *       - in: path
 *         name: estudianteId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del estudiante
 *     responses:
 *       200:
 *         description: Inscripciones del estudiante
 *       404:
 *         description: Estudiante no encontrado
 */
router.get(
  "/estudiante/:estudianteId",
  inscripcionController.obtenerInscripcionesPorEstudiante
);

/**
 * @swagger
 * /inscripciones/curso/{cursoId}:
 *   get:
 *     summary: Obtiene todos los estudiantes inscritos en un curso específico
 *     parameters:
 *       - in: path
 *         name: cursoId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Estudiantes inscritos en el curso
 *       404:
 *         description: Curso no encontrado
 */
router.get("/curso/:cursoId", inscripcionController.obtenerEstudiantesPorCurso);

// Exporta el router para ser utilizado en la aplicación principal
module.exports = router;
