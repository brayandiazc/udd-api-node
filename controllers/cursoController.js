// Importa el módulo de modelo de curso desde el archivo cursoModel en el directorio 'models'
const cursos = require("../models/cursoModel");

/**
 * Ruta: GET /cursos
 * Descripción: Devuelve la lista completa de cursos.
 * Respuesta: Un objeto JSON que contiene un mensaje y la lista de cursos.
 */
const obtenerCursos = (req, res) => {
  res.json({ mensaje: "Lista de cursos", cursos });
};

/**
 * Ruta: GET /curso/:id
 * Descripción: Devuelve la información de un curso según su ID.
 * Parámetros:
 *  - id (requerido): El ID del curso que se desea obtener.
 * Respuesta:
 *  - Si el curso es encontrado: Un objeto JSON con un mensaje y la información del curso.
 *  - Si no se encuentra el curso: Un mensaje de error con el código 404.
 */
const obtenerCursoPorId = (req, res) => {
  const { id } = req.params;
  const curso = cursos.find((c) => c.id === parseInt(id));

  if (!curso) {
    return res.status(404).json({ error: "Curso no encontrado" });
  }

  res.json({ mensaje: `Información del curso con ID: ${id}`, curso });
};

/**
 * Ruta: POST /cursos
 * Descripción: Crea un nuevo curso con los datos proporcionados.
 * Cuerpo de la solicitud:
 *  - nombre (requerido): El nombre del curso.
 *  - duracion (requerido): La duración del curso.
 *  - precio (requerido): El precio del curso.
 *  - instructor (requerido): El instructor del curso.
 *  - cupos (requerido): El número total de cupos.
 *  - categoria (requerido): La categoría del curso.
 * Respuesta: Un objeto JSON que contiene un mensaje y los detalles del curso recién creado.
 */
const crearCurso = (req, res) => {
  const { nombre, duracion, precio, instructor, cupos, categoria } = req.body;

  if (!nombre || !duracion || !precio || !instructor || !cupos || !categoria) {
    return res
      .status(400)
      .json({
        error:
          "Todos los campos son requeridos: nombre, duracion, precio, instructor, cupos, categoria",
      });
  }

  // Validar precio
  if (precio <= 0) {
    return res.status(400).json({ error: "El precio debe ser mayor a 0" });
  }

  // Validar cupos
  if (cupos <= 0) {
    return res.status(400).json({ error: "Los cupos deben ser mayor a 0" });
  }

  // Validar categoría
  const categoriasValidas = [
    "Backend",
    "Frontend",
    "Fundamentos",
    "Móvil",
    "DevOps",
    "Cloud",
    "Data Science",
  ];
  if (!categoriasValidas.includes(categoria)) {
    return res.status(400).json({ error: "Categoría no válida" });
  }

  const nuevoCurso = {
    id: cursos.length + 1,
    nombre,
    duracion,
    precio: parseInt(precio),
    instructor,
    cupos: parseInt(cupos),
    cuposDisponibles: parseInt(cupos),
    categoria,
    estado: "activo",
    fechaCreacion: new Date().toISOString().split("T")[0],
  };

  cursos.push(nuevoCurso);

  res
    .status(201)
    .json({ mensaje: "Curso creado exitosamente", curso: nuevoCurso });
};

/**
 * Ruta: PUT /curso/:id
 * Descripción: Actualiza los datos de un curso existente.
 * Parámetros:
 *  - id (requerido): El ID del curso que se desea actualizar.
 * Cuerpo de la solicitud:
 *  - nombre: El nuevo nombre del curso.
 *  - duracion: La nueva duración del curso.
 *  - precio: El nuevo precio del curso.
 *  - instructor: El nuevo instructor del curso.
 *  - cupos: El nuevo número total de cupos.
 *  - categoria: La nueva categoría del curso.
 *  - estado: El nuevo estado del curso.
 * Respuesta:
 *  - Si el curso es encontrado y actualizado: Un objeto JSON con el mensaje y los datos actualizados.
 *  - Si no se encuentra el curso: Un mensaje de error con el código 404.
 */
const actualizarCurso = (req, res) => {
  const { id } = req.params;
  const { nombre, duracion, precio, instructor, cupos, categoria, estado } =
    req.body;

  const curso = cursos.find((c) => c.id === parseInt(id));

  if (!curso) {
    return res.status(404).json({ error: "Curso no encontrado" });
  }

  // Validar precio si se proporciona
  if (precio !== undefined) {
    if (precio <= 0) {
      return res.status(400).json({ error: "El precio debe ser mayor a 0" });
    }
  }

  // Validar cupos si se proporciona
  if (cupos !== undefined) {
    if (cupos <= 0) {
      return res.status(400).json({ error: "Los cupos deben ser mayor a 0" });
    }

    // Verificar que no se reduzcan los cupos por debajo de los ocupados
    const cuposOcupados = curso.cupos - curso.cuposDisponibles;
    if (cupos < cuposOcupados) {
      return res.status(400).json({
        error: `No se pueden reducir los cupos a ${cupos} porque ya hay ${cuposOcupados} estudiantes inscritos`,
      });
    }
  }

  // Validar categoría si se proporciona
  if (categoria) {
    const categoriasValidas = [
      "Backend",
      "Frontend",
      "Fundamentos",
      "Móvil",
      "DevOps",
      "Cloud",
      "Data Science",
    ];
    if (!categoriasValidas.includes(categoria)) {
      return res.status(400).json({ error: "Categoría no válida" });
    }
  }

  // Validar estado si se proporciona
  if (estado) {
    const estadosValidos = ["activo", "inactivo", "completado"];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ error: "Estado no válido" });
    }
  }

  // Actualizar campos
  curso.nombre = nombre || curso.nombre;
  curso.duracion = duracion || curso.duracion;
  curso.precio = precio !== undefined ? parseInt(precio) : curso.precio;
  curso.instructor = instructor || curso.instructor;

  // Actualizar cupos y cupos disponibles
  if (cupos !== undefined) {
    const diferencia = cupos - curso.cupos;
    curso.cupos = parseInt(cupos);
    curso.cuposDisponibles += diferencia;
  }

  curso.categoria = categoria || curso.categoria;
  curso.estado = estado || curso.estado;

  res.json({
    mensaje: `Curso con ID: ${id} actualizado exitosamente`,
    curso,
  });
};

/**
 * Ruta: DELETE /curso/:id
 * Descripción: Elimina un curso de la lista según su ID.
 * Parámetros:
 *  - id (requerido): El ID del curso que se desea eliminar.
 * Respuesta:
 *  - Si el curso es encontrado y eliminado: Un objeto JSON con el mensaje de éxito.
 *  - Si no se encuentra el curso: Un mensaje de error con el código 404.
 */
const eliminarCurso = (req, res) => {
  const { id } = req.params;
  const indice = cursos.findIndex((c) => c.id === parseInt(id));

  if (indice === -1) {
    return res.status(404).json({ error: "Curso no encontrado" });
  }

  // Verificar si hay estudiantes inscritos
  const curso = cursos[indice];
  const estudiantesInscritos = curso.cupos - curso.cuposDisponibles;

  if (estudiantesInscritos > 0) {
    return res.status(400).json({
      error: `No se puede eliminar el curso porque tiene ${estudiantesInscritos} estudiantes inscritos`,
    });
  }

  cursos.splice(indice, 1);

  res.json({ mensaje: `Curso con ID: ${id} eliminado exitosamente` });
};

/**
 * Ruta: GET /cursos/categoria/:categoria
 * Descripción: Obtiene todos los cursos de una categoría específica.
 * Parámetros:
 *  - categoria (requerido): La categoría a filtrar.
 * Respuesta: Un objeto JSON con los cursos de la categoría especificada.
 */
const obtenerCursosPorCategoria = (req, res) => {
  const { categoria } = req.params;

  const cursosCategoria = cursos.filter(
    (c) => c.categoria.toLowerCase() === categoria.toLowerCase()
  );

  res.json({
    mensaje: `Cursos de la categoría: ${categoria}`,
    cursos: cursosCategoria,
    total: cursosCategoria.length,
  });
};

/**
 * Ruta: GET /cursos/instructor/:instructor
 * Descripción: Obtiene todos los cursos de un instructor específico.
 * Parámetros:
 *  - instructor (requerido): El nombre del instructor a filtrar.
 * Respuesta: Un objeto JSON con los cursos del instructor especificado.
 */
const obtenerCursosPorInstructor = (req, res) => {
  const { instructor } = req.params;

  const cursosInstructor = cursos.filter((c) =>
    c.instructor.toLowerCase().includes(instructor.toLowerCase())
  );

  res.json({
    mensaje: `Cursos del instructor: ${instructor}`,
    cursos: cursosInstructor,
    total: cursosInstructor.length,
  });
};

/**
 * Ruta: GET /cursos/disponibles
 * Descripción: Obtiene todos los cursos que tienen cupos disponibles.
 * Respuesta: Un objeto JSON con los cursos que tienen cupos disponibles.
 */
const obtenerCursosDisponibles = (req, res) => {
  const cursosDisponibles = cursos.filter((c) => c.cuposDisponibles > 0);

  res.json({
    mensaje: "Cursos con cupos disponibles",
    cursos: cursosDisponibles,
    total: cursosDisponibles.length,
  });
};

/**
 * Ruta: GET /cursos/precio/:min/:max
 * Descripción: Obtiene cursos dentro de un rango de precios.
 * Parámetros:
 *  - min (requerido): Precio mínimo.
 *  - max (requerido): Precio máximo.
 * Respuesta: Un objeto JSON con los cursos en el rango de precios especificado.
 */
const obtenerCursosPorPrecio = (req, res) => {
  const { min, max } = req.params;

  const cursosPrecio = cursos.filter(
    (c) => c.precio >= parseInt(min) && c.precio <= parseInt(max)
  );

  res.json({
    mensaje: `Cursos con precio entre $${min} y $${max}`,
    cursos: cursosPrecio,
    total: cursosPrecio.length,
  });
};

// Exporta los controladores para ser utilizados en las rutas
module.exports = {
  obtenerCursos,
  obtenerCursoPorId,
  crearCurso,
  actualizarCurso,
  eliminarCurso,
  obtenerCursosPorCategoria,
  obtenerCursosPorInstructor,
  obtenerCursosDisponibles,
  obtenerCursosPorPrecio,
};
