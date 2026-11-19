  const preguntas = [
    {
        imagen: "img/terminal.jpg",
        correcta: "Terminal",
        opciones: ["Terminal", "Escuela Almafuerte", "Polideportivo"]
    },
    {
        imagen: "img/palomar.jpg",
        correcta: "Palomar",
        opciones: ["Museo", "Palomar", "Estación de tren"]
    },
    {
        imagen: "img/estaciondetren.jpg",
        correcta: "Estación de tren",
        opciones: ["Estación de tren", "malteria", "Laguna de Puan"]
    },
    {
        imagen: "img/ruinas.jpg",
        correcta: "Ruinas históricas",
        opciones: ["Predio FNCC", "Ruinas históricas", "Terminal"]
    },
    {
        imagen: "img/predio.jpg",
        correcta: "Predio FNCC",
        opciones: ["Polideportivo", "Predio FNCC", "Museo"]
    },
    {
        imagen: "img/fuerte.jpg",
        correcta: "fuerte de puan",
        opciones: ["entrada de puan", "fuerte de puan", "Polideportivo"]
    },
    {
        imagen: "img/polideportivo.jpg",
        correcta: "Polideportivo",
        opciones: ["Laguna de Puan", "Predio FNCC", "Polideportivo"]
    },
    {
        imagen: "img/centrodeinformatica.jpg",
        correcta: "Centro de Informática",
        opciones: ["Museo", "Centro de Informática", "Escuela Almafuerte"]
    },
    {
        imagen: "img/museo.jpg",
        correcta: "Museo",
        opciones: ["Palomar", "Museo", "Terminal"]
    },
    {
        imagen: "img/laguna.jpg",
        correcta: "Laguna de Puan",
        opciones: ["Laguna de Puan", "malteria", "Ruinas históricas"]
    },
    {
        imagen: "img/malteria.jpg",
        correcta: "malteria",
        opciones: ["Estación de tren", "malteria", "Centro de Informática"]
    }
];

let numeroImagen = 0;
let puntajeImagenes = 0;
let respondido = false;

const imagen = document.getElementById("imagen");
const opciones = document.getElementById("opciones");
const mensaje = document.getElementById("mensaje");
const puntajeTexto = document.getElementById("puntaje");
const progreso = document.getElementById("progreso");
const pregunta = document.getElementById("pregunta");

// Sumar puntos al puntaje general
function sumarPuntos(cantidad) {
    let total = Number(localStorage.getItem("puntaje")) || 0;
    total += cantidad;
    localStorage.setItem("puntaje", total);
}

// Mostrar puntaje
function actualizarPuntaje() {
    puntajeTexto.textContent =
        "Puntaje: " + puntajeImagenes + " puntos";
}

// Cargar imagen
function cargarImagen() {
    if (numeroImagen >= preguntas.length) {
        terminarJuego();
        return;
    }

    respondido = false;

    const actual = preguntas[numeroImagen];

    imagen.style.display = "block";
    progreso.style.display = "block";
    pregunta.style.display = "block";
    opciones.style.display = "flex";

    imagen.src = actual.imagen;
    imagen.alt = "Imagen de Puan";

    progreso.textContent =
        "Imagen " + (numeroImagen + 1) + " de " + preguntas.length;

    pregunta.textContent = "¿Qué lugar aparece?";
    mensaje.textContent = "";
    opciones.innerHTML = "";

    actual.opciones.forEach(function(respuesta) {
        const boton = document.createElement("button");

        boton.className = "opcion";
        boton.textContent = respuesta;

        boton.addEventListener("click", function() {
            comprobarRespuesta(respuesta);
        });

        opciones.appendChild(boton);
    });

    actualizarPuntaje();
}

// Comprobar respuesta
function comprobarRespuesta(respuesta) {
    if (respondido) return;

    respondido = true;

    const correcta = preguntas[numeroImagen].correcta;

    if (respuesta === correcta) {
        mensaje.textContent = "¡Correcto! Sumaste 10 puntos.";
        mensaje.style.color = "green";

        puntajeImagenes += 10;
        sumarPuntos(10);
    } else {
        mensaje.textContent =
            "¡Incorrecto! La respuesta correcta era: " + correcta + ".";
        mensaje.style.color = "red";
    }

    opciones.querySelectorAll("button").forEach(function(boton) {
        boton.disabled = true;
    });

    actualizarPuntaje();

    setTimeout(function() {
        numeroImagen++;
        cargarImagen();
    }, 1500);
}

// Finalizar juego y guardar resultado
function terminarJuego() {
    imagen.style.display = "none";
    progreso.style.display = "none";
    pregunta.style.display = "none";
    opciones.style.display = "none";

    mensaje.textContent =
        "¡Completaste todas las imágenes! Obtuviste " +
        puntajeImagenes + " puntos.";

    mensaje.style.color = "green";

    const total = Number(localStorage.getItem("puntaje")) || 0;

    const resultado = {
        nombre: "Participante",
        puntaje: total
    };

    localStorage.setItem("ultimoResultado", JSON.stringify(resultado));

    let resultados = JSON.parse(localStorage.getItem("resultados")) || [];

    const indice = resultados.findIndex(function(persona) {
        return persona.nombre === "Participante";
    });

    if (indice >= 0) {
        resultados[indice].puntaje = total;
    } else {
        resultados.push(resultado);
    }

    localStorage.setItem("resultados", JSON.stringify(resultados));

    puntajeTexto.textContent = "Puntaje general: " + total + " puntos";
}

// Iniciar
cargarImagen()
