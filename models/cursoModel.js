// Simulamos una base de datos con listas de cursos
const cursos = [
  {
    id: 1,
    nombre: "Curso de Node.js",
    duracion: "4 semanas",
    precio: 150000,
    instructor: "Carlos Mendoza",
    cupos: 25,
    cuposDisponibles: 18,
    categoria: "Backend",
    estado: "activo",
    fechaCreacion: "2024-01-10",
  },
  {
    id: 2,
    nombre: "Curso de React",
    duracion: "6 semanas",
    precio: 180000,
    instructor: "Ana Rodríguez",
    cupos: 30,
    cuposDisponibles: 12,
    categoria: "Frontend",
    estado: "activo",
    fechaCreacion: "2024-01-05",
  },
  {
    id: 3,
    nombre: "Curso de JavaScript Avanzado",
    duracion: "5 semanas",
    precio: 120000,
    instructor: "Luis Pérez",
    cupos: 20,
    cuposDisponibles: 8,
    categoria: "Fundamentos",
    estado: "activo",
    fechaCreacion: "2024-01-15",
  },
  {
    id: 4,
    nombre: "Curso de Python para Principiantes",
    duracion: "8 semanas",
    precio: 200000,
    instructor: "María González",
    cupos: 35,
    cuposDisponibles: 22,
    categoria: "Fundamentos",
    estado: "activo",
    fechaCreacion: "2024-01-20",
  },
  {
    id: 5,
    nombre: "Curso de Java Básico",
    duracion: "10 semanas",
    precio: 250000,
    instructor: "Roberto Silva",
    cupos: 25,
    cuposDisponibles: 15,
    categoria: "Backend",
    estado: "activo",
    fechaCreacion: "2024-01-12",
  },
  {
    id: 6,
    nombre: "Curso de Angular",
    duracion: "7 semanas",
    precio: 190000,
    instructor: "Carmen López",
    cupos: 28,
    cuposDisponibles: 10,
    categoria: "Frontend",
    estado: "activo",
    fechaCreacion: "2024-01-08",
  },
  {
    id: 7,
    nombre: "Curso de Vue.js",
    duracion: "5 semanas",
    precio: 160000,
    instructor: "Diego Torres",
    cupos: 22,
    cuposDisponibles: 14,
    categoria: "Frontend",
    estado: "activo",
    fechaCreacion: "2024-01-25",
  },
  {
    id: 8,
    nombre: "Curso de TypeScript",
    duracion: "4 semanas",
    precio: 140000,
    instructor: "Sofia Ramírez",
    cupos: 20,
    cuposDisponibles: 6,
    categoria: "Fundamentos",
    estado: "activo",
    fechaCreacion: "2024-02-01",
  },
  {
    id: 9,
    nombre: "Curso de PHP y MySQL",
    duracion: "6 semanas",
    precio: 170000,
    instructor: "Andrés Morales",
    cupos: 25,
    cuposDisponibles: 19,
    categoria: "Backend",
    estado: "activo",
    fechaCreacion: "2024-01-18",
  },
  {
    id: 10,
    nombre: "Curso de C# y .NET",
    duracion: "8 semanas",
    precio: 220000,
    instructor: "Valentina Herrera",
    cupos: 30,
    cuposDisponibles: 16,
    categoria: "Backend",
    estado: "activo",
    fechaCreacion: "2024-01-22",
  },
  {
    id: 11,
    nombre: "Curso de Ruby on Rails",
    duracion: "7 semanas",
    precio: 180000,
    instructor: "Miguel Rojas",
    cupos: 18,
    cuposDisponibles: 11,
    categoria: "Backend",
    estado: "activo",
    fechaCreacion: "2024-01-30",
  },
  {
    id: 12,
    nombre: "Curso de Django",
    duracion: "6 semanas",
    precio: 160000,
    instructor: "Daniela Jiménez",
    cupos: 24,
    cuposDisponibles: 13,
    categoria: "Backend",
    estado: "activo",
    fechaCreacion: "2024-02-05",
  },
  {
    id: 13,
    nombre: "Curso de Flutter",
    duracion: "9 semanas",
    precio: 280000,
    instructor: "Alejandro Ruiz",
    cupos: 20,
    cuposDisponibles: 7,
    categoria: "Móvil",
    estado: "activo",
    fechaCreacion: "2024-01-28",
  },
  {
    id: 14,
    nombre: "Curso de React Native",
    duracion: "8 semanas",
    precio: 240000,
    instructor: "Natalia Vega",
    cupos: 25,
    cuposDisponibles: 9,
    categoria: "Móvil",
    estado: "activo",
    fechaCreacion: "2024-02-02",
  },
  {
    id: 15,
    nombre: "Curso de Swift para iOS",
    duracion: "10 semanas",
    precio: 320000,
    instructor: "Gabriel Paredes",
    cupos: 15,
    cuposDisponibles: 4,
    categoria: "Móvil",
    estado: "activo",
    fechaCreacion: "2024-01-14",
  },
  {
    id: 16,
    nombre: "Curso de Kotlin para Android",
    duracion: "9 semanas",
    precio: 300000,
    instructor: "Lucía Fuentes",
    cupos: 18,
    cuposDisponibles: 8,
    categoria: "Móvil",
    estado: "activo",
    fechaCreacion: "2024-01-16",
  },
  {
    id: 17,
    nombre: "Curso de Go (Golang)",
    duracion: "6 semanas",
    precio: 200000,
    instructor: "Ricardo Soto",
    cupos: 22,
    cuposDisponibles: 12,
    categoria: "Backend",
    estado: "activo",
    fechaCreacion: "2024-02-08",
  },
  {
    id: 18,
    nombre: "Curso de Rust",
    duracion: "8 semanas",
    precio: 260000,
    instructor: "Paula Contreras",
    cupos: 16,
    cuposDisponibles: 5,
    categoria: "Backend",
    estado: "activo",
    fechaCreacion: "2024-02-10",
  },
  {
    id: 19,
    nombre: "Curso de Docker y Kubernetes",
    duracion: "5 semanas",
    precio: 180000,
    instructor: "Juan Pérez",
    cupos: 30,
    cuposDisponibles: 20,
    categoria: "DevOps",
    estado: "activo",
    fechaCreacion: "2024-02-12",
  },
  {
    id: 20,
    nombre: "Curso de AWS Cloud",
    duracion: "7 semanas",
    precio: 220000,
    instructor: "Ana Gómez",
    cupos: 25,
    cuposDisponibles: 14,
    categoria: "Cloud",
    estado: "activo",
    fechaCreacion: "2024-02-15",
  },
  {
    id: 21,
    nombre: "Curso de Machine Learning con Python",
    duracion: "12 semanas",
    precio: 400000,
    instructor: "Carlos Rodríguez",
    cupos: 20,
    cuposDisponibles: 6,
    categoria: "Data Science",
    estado: "activo",
    fechaCreacion: "2024-01-05",
  },
  {
    id: 22,
    nombre: "Curso de Data Science",
    duracion: "10 semanas",
    precio: 350000,
    instructor: "María López",
    cupos: 18,
    cuposDisponibles: 3,
    categoria: "Data Science",
    estado: "activo",
    fechaCreacion: "2024-01-08",
  },
];

module.exports = cursos;
