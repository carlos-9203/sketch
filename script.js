// Seleccionamos el contenedor y el botón
const container = document.getElementById("container");
const newGridButton = document.getElementById("new-grid-button");

// Variable para controlar si el mouse está presionado
let isMouseDown = false;

// Detectar si el mouse está presionado o no
document.body.addEventListener("mousedown", () => (isMouseDown = true));
document.body.addEventListener("mouseup", () => (isMouseDown = false));

// Función para crear el grid
function createGrid(size) {
  // Limpiar cualquier grid existente
  container.innerHTML = "";

  // Configurar el tamaño dinámico del grid usando CSS
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  // Crear las celdas
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");

    // Eventos para pintar al mantener clic
    square.addEventListener("mousemove", () => {
      if (isMouseDown) darkenSquare(square);
    });
    square.addEventListener("mousedown", () => darkenSquare(square));

    container.appendChild(square);
  }
}

// Función para oscurecer el cuadrado progresivamente
function darkenSquare(square) {
  // Inicializar el nivel de oscuridad
  if (!square.dataset.darkness) {
    square.dataset.darkness = 0;
    square.style.backgroundColor = "rgb(255, 255, 255)"; // Blanco inicial
  }

  // Incrementar el nivel de oscuridad
  let darkness = parseInt(square.dataset.darkness) + 10;
  square.dataset.darkness = darkness;

  // Oscurecer el color actual hacia negro
  const currentColor = square.style.backgroundColor;
  const rgb = currentColor.match(/\d+/g).map(Number);
  const newColor = rgb.map(value => Math.max(value - Math.round(255 * (10 / 100)), 0)); // Reducir tono
  square.style.backgroundColor = `rgb(${newColor.join(",")})`;
}

// Crear un nuevo grid al hacer clic en el botón
newGridButton.addEventListener("click", () => {
  let gridSize = prompt("Enter grid size (max: 100):", 16);

  // Validar el tamaño del grid
  if (gridSize < 1 || gridSize > 100 || isNaN(gridSize)) {
    alert("Please enter a number between 1 and 100.");
    return;
  }

  createGrid(gridSize);
});

// Crear el grid inicial
createGrid(16);
