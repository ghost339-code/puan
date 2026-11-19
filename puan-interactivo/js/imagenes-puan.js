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

// VARIABLES
let numeroImagen = 0;
let puntosActividad = 0;
let respondido = false;

// ELEMENTOS
const imagen = document.getElementById("imagen");
const opciones = document.getElementById("opciones");
const mensaje = document.getElementById("mensaje");
const puntajeTexto = document.getElementById("puntaje");
const progreso = document.getElementById("progreso");

// SUMAR PUNTOS IGUAL QUE VERDADERO O FALSO
function sumar(n) {
    localStorage.setItem(
        "puntaje",
        (Number(localStorage.getItem("puntaje")) || 0) + n
    );
}

// ACTUALIZAR PUNTAJE
function actualizarPuntaje() {
    puntajeTexto.textContent =
        "Puntaje de esta actividad: " + puntosActividad + " puntos";
}

// CARGAR IMAGEN
function cargarImagen() {

    if (numeroImagen >= preguntas.length) {

        imagen.style.display = "none";
        progreso.style.display = "none";
        document.getElementById("pregunta").style.display = "none";
        opciones.style.display = "none";

        mensaje.textContent =
            "¡Felicitaciones! Terminaste las 11 imágenes. " +
            "Sumaste " + puntosActividad + " puntos.";

        const botonMenu = document.createElement("a");
        botonMenu.href = "menu.html";
        botonMenu.className = "boton";
        botonMenu.textContent = "Volver al menú";

        document.querySelector("main").appendChild(botonMenu);

        return;
    }

    respondido = false;

    const actual = preguntas[numeroImagen];

    imagen.style.display = "block";
    opciones.style.display = "flex";

    imagen.onerror = function() {
        mensaje.textContent =
            "No se pudo cargar la imagen: " + actual.imagen;
    };

    imagen.src = actual.imagen;
    imagen.alt = "Imagen de Puan";

    progreso.textContent =
        "Imagen " + (numeroImagen + 1) +
        " de " + preguntas.length;

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

// COMPROBAR RESPUESTA
function comprobarRespuesta(respuesta) {

    if (respondido) return;

    respondido = true;

    const correcta = preguntas[numeroImagen].correcta;

    if (respuesta === correcta) {

        mensaje.textContent = "¡Correcto! Sumaste 10 puntos.";
        mensaje.style.color = "green";

        sumar(10);
        puntosActividad += 10;

    } else {

        mensaje.textContent =
            "¡Incorrecto! La respuesta correcta era: " + correcta;

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

// INICIAR JUEGO
cargarImagen();