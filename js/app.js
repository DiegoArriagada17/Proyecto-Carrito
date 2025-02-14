// Creacion de variables

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");

let articulosCarrito = [];

// Listado de eventos
cargarEventListeners();
function cargarEventListeners() {
  // Cuando agregas un curso presionando "Agregar al Carrito"
  listaCursos.addEventListener("click", agregarCurso);

  // Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  // Muestra los cursos guardados en localStorage
  document.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoHTML();
  });

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    // console.log("vaciando carrito"); // Revisar la selección del botón
    articulosCarrito = [];
    limpiarHTML(); // Limpiamos la tabla del carrito
  });
}
// console.log(carrito);
// console.log(listaCursos);

// Funciones

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
  // console.log(e.target);
}

// Función para eliminar datos del curso
function eliminarCurso(e) {
  // console.log(e.target.classList); // Comprobar el elemento que queremos seleccionar
  if (e.target.classList.contains("borrar-curso")) {
    // console.log(e.target.getAttribute("data-id")); // Comprobar el valor del atributo que deseamos eliminar
    const cursoId = e.target.getAttribute("data-id");

    // Elimina del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    console.log(articulosCarrito);

    carritoHTML(); // Volvemos a iterar sobre el carrito y actualizar el HTML
  }
}
// Lee el contenido del HTML al que le damos click y extrae la información del curso
function leerDatosCurso(curso) {
  // console.log(curso);

  // Crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  // console.log(infoCurso);

  // Revisa si un curso ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    // Actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // Retorna el objeto actualizado
      } else {
        return curso; // Retorna los no duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    // Agrega elementos al arreglo del carrito

    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  // console.log(articulosCarrito);
  carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
  // Limpiar el HTML antes de insertar
  limpiarHTML();
  // Recorre el carrito y genera HTML
  articulosCarrito.forEach((curso) => {
    // console.log(curso);
    const row = document.createElement("tr");
    row.innerHTML = `
    <td> <img src="${curso.imagen}" width="100"></td>
    <td>${curso.titulo}</td>
    <td>${curso.precio}</td>
    <td>${curso.cantidad}</td>
    <td><a href="#" class="borrar-curso" data-id="${curso.id}"> X </a></td>
    `;

    // Agrega el HTML del carrito al tbody
    contenedorCarrito.appendChild(row);
  });

  // Sincronizar el contenido del carrito con localStorage
  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}
// Elimina los cursos del tbody
function limpiarHTML() {
  // Forma lenta  // Lo que hace es reemplazar el contenido por un string vacio
  // contenedorCarrito.innerHTML = "";
  // Forma rápida
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
