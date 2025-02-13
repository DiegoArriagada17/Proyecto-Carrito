// Creacion de variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  // Cuando agregas un curso presionando "Agregar al Carrito"
  listaCursos.addEventListener("click", agregarCurso);
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
  // console.log(e.target.classList);
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
  console.log(infoCurso);

  // Agregar elementos al carrito

  articulosCarrito = [...articulosCarrito, infoCurso];
  console.log(articulosCarrito);
  carritoHTML();
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
  // Limpiar el HTML antes de insertar
  limpiarHTML();
  // Recorre el carrito y genera HTML
  articulosCarrito.forEach((curso) => {
    console.log(curso);
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
<img src="
    </td>
<td>
${curso.titulo}
</td>
`;

    // Agrega el HTML del carrito al tbody
    contenedorCarrito.appendChild(row);
  });
}

// Elimina los cursos del tbody
function limpiarHTML() {
  // Forma lenta
  // contenedorCarrito.innerHTML = "";
  // Forma rápida
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
