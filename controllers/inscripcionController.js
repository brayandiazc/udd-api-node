// Importa los módulos necesarios
const inscripciones = require("../models/inscripcionModel");
const estudiantes = require("../models/estudianteModel");
const cursos = require("../models/cursoModel");

/**
 * Ruta: GET /inscripciones
 * Descripción: Devuelve la lista completa de inscripciones con información detallada.
 * Respuesta: Un objeto JSON que contiene un mensaje y la lista de inscripciones con datos del estudiante y curso.
 */
const obtenerInscripciones = (req, res) => {
  const inscripcionesConDetalles = inscripciones.map((inscripcion) => {
    const estudiante = estudiantes.find(
      (e) => e.id === inscripcion.estudianteId
    );
    const curso = cursos.find((c) => c.id === inscripcion.cursoId);

    return {
      ...inscripcion,
      estudiante: {
        id: estudiante.id,
        nombre: estudiante.nombre,
        email: estudiante.email,
        carrera: estudiante.carrera,
      },
      curso: {
        id: curso.id,
        nombre: curso.nombre,
        instructor: curso.instructor,
        categoria: curso.categoria,
      },
    };
  });

  res.json({
    mensaje: "Lista de inscripciones",
    inscripciones: inscripcionesConDetalles,
  });
};

/**
 * Ruta: GET /inscripciones/:id
 * Descripción: Devuelve la información de una inscripción específica.
 * Parámetros:
 *  - id (requerido): El ID de la inscripción que se desea obtener.
 * Respuesta:
 *  - Si la inscripción es encontrada: Un objeto JSON con un mensaje y la información detallada.
 *  - Si no se encuentra la inscripción: Un mensaje de error con el código 404.
 */
const obtenerInscripcionPorId = (req, res) => {
  const { id } = req.params;
  const inscripcion = inscripciones.find((i) => i.id === parseInt(id));

  if (!inscripcion) {
    return res.status(404).json({ error: "Inscripción no encontrada" });
  }

  const estudiante = estudiantes.find((e) => e.id === inscripcion.estudianteId);
  const curso = cursos.find((c) => c.id === inscripcion.cursoId);

  const inscripcionConDetalles = {
    ...inscripcion,
    estudiante: {
      id: estudiante.id,
      nombre: estudiante.nombre,
      email: estudiante.email,
      carrera: estudiante.carrera,
    },
    curso: {
      id: curso.id,
      nombre: curso.nombre,
      instructor: curso.instructor,
      categoria: curso.categoria,
      precio: curso.precio,
    },
  };

  res.json({
    mensaje: `Información de la inscripción con ID: ${id}`,
    inscripcion: inscripcionConDetalles,
  });
};

/**
 * Ruta: POST /inscripciones
 * Descripción: Crea una nueva inscripción con validaciones.
 * Cuerpo de la solicitud:
 *  - estudianteId (requerido): El ID del estudiante.
 *  - cursoId (requerido): El ID del curso.
 * Respuesta: Un objeto JSON que contiene un mensaje y los detalles de la inscripción recién creada.
 */
const crearInscripcion = (req, res) => {
  const { estudianteId, cursoId } = req.body;

  // Validaciones
  if (!estudianteId || !cursoId) {
    return res
      .status(400)
      .json({ error: "El ID del estudiante y del curso son requeridos" });
  }

  // Verificar que el estudiante existe
  const estudiante = estudiantes.find((e) => e.id === parseInt(estudianteId));
  if (!estudiante) {
    return res.status(404).json({ error: "Estudiante no encontrado" });
  }

  // Verificar que el curso existe
  const curso = cursos.find((c) => c.id === parseInt(cursoId));
  if (!curso) {
    return res.status(404).json({ error: "Curso no encontrado" });
  }

  // Verificar que el curso tiene cupos disponibles
  if (curso.cuposDisponibles <= 0) {
    return res
      .status(400)
      .json({ error: "El curso no tiene cupos disponibles" });
  }

  // Verificar que el estudiante no esté ya inscrito en este curso
  const inscripcionExistente = inscripciones.find(
    (i) =>
      i.estudianteId === parseInt(estudianteId) &&
      i.cursoId === parseInt(cursoId) &&
      i.estado === "activa"
  );

  if (inscripcionExistente) {
    return res
      .status(400)
      .json({ error: "El estudiante ya está inscrito en este curso" });
  }

  // Crear la nueva inscripción
  const nuevaInscripcion = {
    id: inscripciones.length + 1,
    estudianteId: parseInt(estudianteId),
    cursoId: parseInt(cursoId),
    fechaInscripcion: new Date().toISOString().split("T")[0],
    estado: "activa",
    calificacion: null,
    fechaCompletado: null,
  };

  inscripciones.push(nuevaInscripcion);

  // Actualizar cupos disponibles del curso
  curso.cuposDisponibles--;

  res.status(201).json({
    mensaje: "Inscripción creada exitosamente",
    inscripcion: nuevaInscripcion,
    cuposDisponibles: curso.cuposDisponibles,
  });
};

/**
 * Ruta: PUT /inscripciones/:id
 * Descripción: Actualiza una inscripción existente (calificación, estado, etc.).
 * Parámetros:
 *  - id (requerido): El ID de la inscripción que se desea actualizar.
 * Cuerpo de la solicitud:
 *  - calificacion: La calificación del estudiante (1-5).
 *  - estado: El estado de la inscripción (activa, completada, cancelada).
 * Respuesta:
 *  - Si la inscripción es encontrada y actualizada: Un objeto JSON con el mensaje y los datos actualizados.
 *  - Si no se encuentra la inscripción: Un mensaje de error con el código 404.
 */
const actualizarInscripcion = (req, res) => {
  const { id } = req.params;
  const { calificacion, estado } = req.body;

  const inscripcion = inscripciones.find((i) => i.id === parseInt(id));

  if (!inscripcion) {
    return res.status(404).json({ error: "Inscripción no encontrada" });
  }

  // Validar calificación si se proporciona
  if (calificacion !== undefined) {
    if (calificacion < 1 || calificacion > 5) {
      return res
        .status(400)
        .json({ error: "La calificación debe estar entre 1 y 5" });
    }
    inscripcion.calificacion = calificacion;
  }

  // Validar estado si se proporciona
  if (estado !== undefined) {
    const estadosValidos = ["activa", "completada", "cancelada"];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ error: "Estado no válido" });
    }
    inscripcion.estado = estado;

    // Si se marca como completada, agregar fecha de completado
    if (estado === "completada" && !inscripcion.fechaCompletado) {
      inscripcion.fechaCompletado = new Date().toISOString().split("T")[0];
    }
  }

  res.json({
    mensaje: `Inscripción con ID: ${id} actualizada exitosamente`,
    inscripcion,
  });
};

/**
 * Ruta: DELETE /inscripciones/:id
 * Descripción: Cancela una inscripción (cambia estado a cancelada y libera cupo).
 * Parámetros:
 *  - id (requerido): El ID de la inscripción que se desea cancelar.
 * Respuesta:
 *  - Si la inscripción es encontrada y cancelada: Un objeto JSON con el mensaje de éxito.
 *  - Si no se encuentra la inscripción: Un mensaje de error con el código 404.
 */
const cancelarInscripcion = (req, res) => {
  const { id } = req.params;
  const inscripcion = inscripciones.find((i) => i.id === parseInt(id));

  if (!inscripcion) {
    return res.status(404).json({ error: "Inscripción no encontrada" });
  }

  if (inscripcion.estado === "cancelada") {
    return res.status(400).json({ error: "La inscripción ya está cancelada" });
  }

  // Cambiar estado a cancelada
  inscripcion.estado = "cancelada";

  // Liberar cupo del curso
  const curso = cursos.find((c) => c.id === inscripcion.cursoId);
  if (curso) {
    curso.cuposDisponibles++;
  }

  res.json({
    mensaje: `Inscripción con ID: ${id} cancelada exitosamente`,
    cuposDisponibles: curso ? curso.cuposDisponibles : null,
  });
};

/**
 * Ruta: GET /inscripciones/estudiante/:estudianteId
 * Descripción: Obtiene todas las inscripciones de un estudiante específico.
 * Parámetros:
 *  - estudianteId (requerido): El ID del estudiante.
 * Respuesta: Un objeto JSON con las inscripciones del estudiante.
 */
const obtenerInscripcionesPorEstudiante = (req, res) => {
  const { estudianteId } = req.params;

  const estudiante = estudiantes.find((e) => e.id === parseInt(estudianteId));
  if (!estudiante) {
    return res.status(404).json({ error: "Estudiante no encontrado" });
  }

  const inscripcionesEstudiante = inscripciones
    .filter((i) => i.estudianteId === parseInt(estudianteId))
    .map((inscripcion) => {
      const curso = cursos.find((c) => c.id === inscripcion.cursoId);
      return {
        ...inscripcion,
        curso: {
          id: curso.id,
          nombre: curso.nombre,
          instructor: curso.instructor,
          categoria: curso.categoria,
          duracion: curso.duracion,
        },
      };
    });

  res.json({
    mensaje: `Inscripciones del estudiante: ${estudiante.nombre}`,
    estudiante: {
      id: estudiante.id,
      nombre: estudiante.nombre,
      email: estudiante.email,
      carrera: estudiante.carrera,
    },
    inscripciones: inscripcionesEstudiante,
  });
};

/**
 * Ruta: GET /inscripciones/curso/:cursoId
 * Descripción: Obtiene todos los estudiantes inscritos en un curso específico.
 * Parámetros:
 *  - cursoId (requerido): El ID del curso.
 * Respuesta: Un objeto JSON con los estudiantes inscritos en el curso.
 */
const obtenerEstudiantesPorCurso = (req, res) => {
  const { cursoId } = req.params;

  const curso = cursos.find((c) => c.id === parseInt(cursoId));
  if (!curso) {
    return res.status(404).json({ error: "Curso no encontrado" });
  }

  const estudiantesInscritos = inscripciones
    .filter((i) => i.cursoId === parseInt(cursoId) && i.estado === "activa")
    .map((inscripcion) => {
      const estudiante = estudiantes.find(
        (e) => e.id === inscripcion.estudianteId
      );
      return {
        inscripcionId: inscripcion.id,
        fechaInscripcion: inscripcion.fechaInscripcion,
        calificacion: inscripcion.calificacion,
        estudiante: {
          id: estudiante.id,
          nombre: estudiante.nombre,
          email: estudiante.email,
          carrera: estudiante.carrera,
          semestre: estudiante.semestre,
        },
      };
    });

  res.json({
    mensaje: `Estudiantes inscritos en: ${curso.nombre}`,
    curso: {
      id: curso.id,
      nombre: curso.nombre,
      instructor: curso.instructor,
      categoria: curso.categoria,
      cuposDisponibles: curso.cuposDisponibles,
    },
    estudiantes: estudiantesInscritos,
    totalEstudiantes: estudiantesInscritos.length,
  });
};

// Exporta los métodos del controlador
module.exports = {
  obtenerInscripciones,
  obtenerInscripcionPorId,
  crearInscripcion,
  actualizarInscripcion,
  cancelarInscripcion,
  obtenerInscripcionesPorEstudiante,
  obtenerEstudiantesPorCurso,
};
