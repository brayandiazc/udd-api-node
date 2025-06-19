// Importa el módulo de modelo de estudiante desde el archivo estudianteModel en el directorio 'models'
const estudiantes = require("../models/estudianteModel");

/**
 * Ruta: GET /estudiantes
 * Descripción: Devuelve la lista completa de estudiantes.
 * Respuesta: Un objeto JSON que contiene un mensaje y la lista de estudiantes.
 */
const obtenerEstudiantes = (req, res) => {
  res.json({ mensaje: "Lista de estudiantes", estudiantes });
};

/**
 * Ruta: GET /estudiante/:id
 * Descripción: Devuelve la información de un estudiante según su ID.
 * Parámetros:
 *  - id (requerido): El ID del estudiante que se desea obtener.
 * Respuesta:
 *  - Si el estudiante es encontrado: Un objeto JSON con un mensaje y la información del estudiante.
 *  - Si no se encuentra el estudiante: Un mensaje de error con el código 404.
 */
const obtenerEstudiantePorId = (req, res) => {
  const { id } = req.params;
  const estudiante = estudiantes.find((e) => e.id === parseInt(id));

  if (!estudiante) {
    return res.status(404).json({ error: "Estudiante no encontrado" });
  }

  res.json({ mensaje: `Información del estudiante con ID: ${id}`, estudiante });
};

/**
 * Ruta: POST /estudiantes
 * Descripción: Crea un nuevo estudiante con los datos proporcionados.
 * Cuerpo de la solicitud:
 *  - nombre (requerido): El nombre del estudiante.
 *  - edad (requerido): La edad del estudiante.
 *  - email (requerido): El email del estudiante.
 *  - carrera (requerido): La carrera del estudiante.
 *  - semestre (requerido): El semestre del estudiante.
 * Respuesta: Un objeto JSON que contiene un mensaje y los detalles del estudiante recién creado.
 */
const crearEstudiante = (req, res) => {
  const { nombre, edad, email, carrera, semestre } = req.body;

  if (!nombre || !edad || !email || !carrera || !semestre) {
    return res
      .status(400)
      .json({
        error:
          "Todos los campos son requeridos: nombre, edad, email, carrera, semestre",
      });
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Formato de email inválido" });
  }

  // Validar que el email no esté duplicado
  const emailExistente = estudiantes.find((e) => e.email === email);
  if (emailExistente) {
    return res.status(400).json({ error: "El email ya está registrado" });
  }

  // Validar edad
  if (edad < 16 || edad > 100) {
    return res
      .status(400)
      .json({ error: "La edad debe estar entre 16 y 100 años" });
  }

  // Validar semestre
  if (semestre < 1 || semestre > 12) {
    return res
      .status(400)
      .json({ error: "El semestre debe estar entre 1 y 12" });
  }

  const nuevoEstudiante = {
    id: estudiantes.length + 1,
    nombre,
    edad: parseInt(edad),
    email,
    carrera,
    semestre: parseInt(semestre),
    estado: "activo",
    fechaCreacion: new Date().toISOString().split("T")[0],
  };

  estudiantes.push(nuevoEstudiante);

  res.status(201).json({
    mensaje: "Estudiante creado exitosamente",
    estudiante: nuevoEstudiante,
  });
};

/**
 * Ruta: PUT /estudiante/:id
 * Descripción: Actualiza los datos de un estudiante existente.
 * Parámetros:
 *  - id (requerido): El ID del estudiante que se desea actualizar.
 * Cuerpo de la solicitud:
 *  - nombre: El nuevo nombre del estudiante.
 *  - edad: La nueva edad del estudiante.
 *  - email: El nuevo email del estudiante.
 *  - carrera: La nueva carrera del estudiante.
 *  - semestre: El nuevo semestre del estudiante.
 *  - estado: El nuevo estado del estudiante.
 * Respuesta:
 *  - Si el estudiante es encontrado y actualizado: Un objeto JSON con el mensaje y los datos actualizados.
 *  - Si no se encuentra el estudiante: Un mensaje de error con el código 404.
 */
const actualizarEstudiante = (req, res) => {
  const { id } = req.params;
  const { nombre, edad, email, carrera, semestre, estado } = req.body;

  const estudiante = estudiantes.find((e) => e.id === parseInt(id));

  if (!estudiante) {
    return res.status(404).json({ error: "Estudiante no encontrado" });
  }

  // Validar email si se proporciona
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Formato de email inválido" });
    }

    // Verificar que el email no esté duplicado (excluyendo el estudiante actual)
    const emailExistente = estudiantes.find(
      (e) => e.email === email && e.id !== parseInt(id)
    );
    if (emailExistente) {
      return res
        .status(400)
        .json({ error: "El email ya está registrado por otro estudiante" });
    }
  }

  // Validar edad si se proporciona
  if (edad !== undefined) {
    if (edad < 16 || edad > 100) {
      return res
        .status(400)
        .json({ error: "La edad debe estar entre 16 y 100 años" });
    }
  }

  // Validar semestre si se proporciona
  if (semestre !== undefined) {
    if (semestre < 1 || semestre > 12) {
      return res
        .status(400)
        .json({ error: "El semestre debe estar entre 1 y 12" });
    }
  }

  // Validar estado si se proporciona
  if (estado) {
    const estadosValidos = ["activo", "inactivo", "graduado"];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ error: "Estado no válido" });
    }
  }

  // Actualizar campos
  estudiante.nombre = nombre || estudiante.nombre;
  estudiante.edad = edad !== undefined ? parseInt(edad) : estudiante.edad;
  estudiante.email = email || estudiante.email;
  estudiante.carrera = carrera || estudiante.carrera;
  estudiante.semestre =
    semestre !== undefined ? parseInt(semestre) : estudiante.semestre;
  estudiante.estado = estado || estudiante.estado;

  res.json({
    mensaje: `Estudiante con ID: ${id} actualizado exitosamente`,
    estudiante,
  });
};

/**
 * Ruta: DELETE /estudiante/:id
 * Descripción: Elimina un estudiante de la lista según su ID.
 * Parámetros:
 *  - id (requerido): El ID del estudiante que se desea eliminar.
 * Respuesta:
 *  - Si el estudiante es encontrado y eliminado: Un objeto JSON con el mensaje de éxito.
 *  - Si no se encuentra el estudiante: Un mensaje de error con el código 404.
 */
const eliminarEstudiante = (req, res) => {
  const { id } = req.params;
  const indice = estudiantes.findIndex((e) => e.id === parseInt(id));

  if (indice === -1) {
    return res.status(404).json({ error: "Estudiante no encontrado" });
  }

  estudiantes.splice(indice, 1);

  res.json({ mensaje: `Estudiante con ID: ${id} eliminado exitosamente` });
};

/**
 * Ruta: GET /estudiantes/carrera/:carrera
 * Descripción: Obtiene todos los estudiantes de una carrera específica.
 * Parámetros:
 *  - carrera (requerido): La carrera a filtrar.
 * Respuesta: Un objeto JSON con los estudiantes de la carrera especificada.
 */
const obtenerEstudiantesPorCarrera = (req, res) => {
  const { carrera } = req.params;

  const estudiantesCarrera = estudiantes.filter((e) =>
    e.carrera.toLowerCase().includes(carrera.toLowerCase())
  );

  res.json({
    mensaje: `Estudiantes de la carrera: ${carrera}`,
    estudiantes: estudiantesCarrera,
    total: estudiantesCarrera.length,
  });
};

/**
 * Ruta: GET /estudiantes/semestre/:semestre
 * Descripción: Obtiene todos los estudiantes de un semestre específico.
 * Parámetros:
 *  - semestre (requerido): El semestre a filtrar.
 * Respuesta: Un objeto JSON con los estudiantes del semestre especificado.
 */
const obtenerEstudiantesPorSemestre = (req, res) => {
  const { semestre } = req.params;

  const estudiantesSemestre = estudiantes.filter(
    (e) => e.semestre === parseInt(semestre)
  );

  res.json({
    mensaje: `Estudiantes del semestre: ${semestre}`,
    estudiantes: estudiantesSemestre,
    total: estudiantesSemestre.length,
  });
};

// Exporta los métodos del controlador para ser utilizados en las rutas
module.exports = {
  obtenerEstudiantes,
  obtenerEstudiantePorId,
  crearEstudiante,
  actualizarEstudiante,
  eliminarEstudiante,
  obtenerEstudiantesPorCarrera,
  obtenerEstudiantesPorSemestre,
};
