// Definición de los días de la semana
const days = [
  "DOMINGO",
  "LUNES",
  "MARTES",
  "MIÉRCOLES",
  "JUEVES",
  "VIERNES",
  "SÁBADO",
];

// Variables globales para el formato de la hora y la zona horaria
let formato24Horas = true; // Indica si se utiliza el formato de 24 horas (true) o de 12 horas (false)
let zonaHoraria = "UTC"; // Almacena la zona horaria actual, inicializado con "UTC" (Tiempo Universal Coordinado)

// Función para actualizar el reloj
//calcula la hora localizada, actualiza el HTML y aplica animaciones.
function updateClock() {
  animateClockUpdate(); // Invoca la función para animar la actualización del reloj

  const now = new Date(); // Obtiene la fecha y hora actual del sistema
  const localTime = new Date(
    now.toLocaleString("en-US", { timeZone: zonaHoraria })
  ); // Convierte la hora actual a la zona horaria especificada

  // Obtención de las horas, minutos y segundos
  const hours = formato24Horas
    ? localTime.getHours() // Si el formato es de 24 horas, obtiene las horas directamente
    : localTime.getHours() % 12 || 12; // Si es de 12 horas, convierte las horas a formato de 12 horas y maneja la medianoche como 12

  // Actualización de la hora en el HTML
  document.getElementById("hora").innerText =
    zeroPadding(hours, 2) + // Añade ceros a la izquierda si es necesario
    ":" +
    zeroPadding(localTime.getMinutes(), 2) + // Añade ceros a la izquierda si es necesario
    ":" +
    zeroPadding(localTime.getSeconds(), 2); // Añade ceros a la izquierda si es necesario

  // Actualización del formato de la hora en el HTML
  document.getElementById("formato").innerText = formato24Horas
    ? "Formato: 24 horas"
    : "Formato: 12 horas"; // Muestra el formato correspondiente en el elemento con id "formato"

  // Actualización de la fecha en el HTML
  //Obtiene el elemento con el ID "fecha" en el HTML.
  document.getElementById("fecha").innerText =
    //El texto se forma utilizando una plantilla de cadena de texto que:
    //Obtiene el año de la fecha. - Obtiene el mes, agrega ceros a la izquierda si es necesario.
    `${localTime.getFullYear()}-${zeroPadding(
      localTime.getMonth() + 1,
      2
      //    //Obtiene el día del mes, agrega ceros a la izquierda si es necesario.
      //Agrega el nombre del día de la semana obtenido del array days.
    )}-${zeroPadding(localTime.getDate(), 2)} ${days[localTime.getDay()]}`;
}

// Evento para cambiar el formato de la hora al hacer clic en el botón
document.getElementById("toggleFormato").addEventListener("click", function () {
  formato24Horas = !formato24Horas; // Invierte el valor actual del formato de 24 horas
  updateClock(); // Actualiza el reloj con el nuevo formato
});

// Actualización inicial del reloj y establecimiento de la actualización periódica
updateClock(); // Actualiza el reloj inmediatamente al cargar la página
setInterval(updateClock, 1000); // Establece una actualización periódica cada segundo (1000 milisegundos)

// Función para agregar ceros a la izquierda de un número
function zeroPadding(number, digit) {
  return String(number).padStart(digit, "0"); // Convierte el número a cadena y añade ceros a la izquierda según la cantidad especificada en 'digit'
}

// Función para animar la actualización del reloj
function animateClockUpdate() {
  const clockElement = document.querySelector(".clock"); // Selecciona el elemento con la clase 'clock'
  clockElement.classList.add("animate"); // Agrega la clase 'animate' para aplicar la animación
  setTimeout(() => {
    clockElement.classList.remove("animate"); // Retira la clase 'animate' después de 300 milisegundos para detener la animación
  }, 300);
}

// Función para cambiar la zona horaria
function cambiarZonaHoraria(nuevaZonaHoraria) {
  zonaHoraria = nuevaZonaHoraria; // Actualiza la variable global de zona horaria
  updateClock(); // Actualiza el reloj con la nueva zona horaria
}

// Función para cambiar el tema de color del cuerpo del documento
function cambiarTema(color) {
  document.body.style.backgroundColor = color; // Establece el color de fondo del cuerpo del documento según el parámetro 'color'
}
