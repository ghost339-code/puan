const lugares = [
    {
        nombre: "Malteria Pampa S.A",
        imagen: "img/malteria.jpg",
        descripcion: "Es una importante planta industrial de Puan dedicada a la producción de malta, un ingrediente fundamental para elaborar cerveza.",
        lat: -37.54088, lng: -62.75544
    },
    {
        nombre: "Laguna de Puán",
        imagen: "img/laguna.jpg",
        descripcion: "Es uno de los principales atractivos turísticos de la localidad. Se destaca por sus paisajes, la pesca y los espacios recreativos al aire libre.",
        lat: -37.55408, lng: -62.79957
    },
    {
        nombre: "Milenium",
        imagen: "img/milenium.jpg",
        descripcion: "El Templo Mirador Millenium está en el Cerro de la Paz, junto a la laguna, fuera del casco urbano de Puan.",
        lat: -37.57952, lng: -62.76460
    },
    {
        nombre: "Polideportivo",
        imagen: "img/polideportivo.jpg",
        descripcion: "Es el Polideportivo Municipal, un espacio destinado a la práctica de deportes y actividades recreativas.",
        lat: -37.53671, lng: -62.76640
    },
    {
        nombre: "Predio de la FNCC",
        imagen: "img/fncc.jpg",
        descripcion: "Es el predio de la Fiesta Nacional de la Cebada Cervecera, a orillas de la laguna y a pocos kilómetros del pueblo.",
        lat: -37.54124, lng: -62.80858
    },
    {
        nombre: "Cancha de Tiro Federal",
        imagen: "img/tirofederal.jpg",
        descripcion: "Es la cancha de fútbol de Tiro Federal y Club Atlético de Puan.",
        lat: -37.53199, lng: -62.77200
    },
    {
        nombre: "Cancha de Puán Football Club",
        imagen: "img/puanfc.jpg",
        descripcion: "Es el estadio Evaristo García, donde juega de local Puan Football Club.",
        lat: -37.54721, lng: -62.76857
    },
    {
        nombre: "Cancha del Club Independiente",
        imagen: "img/cai.jpeg",
        descripcion: "Es la cancha del Club Atlético Independiente de Puan.",
        lat: -37.53925, lng: -62.76386
    }
];

const opciones = document.getElementById("opciones");
const etiquetaPuntos = document.getElementById("puntos");
const etiquetaRonda = document.getElementById("numero-ronda");
const totalRondas = document.getElementById("total-rondas");
const resultado = document.getElementById("resultado");
const informacion = document.getElementById("informacion");
const botonSiguiente = document.getElementById("siguiente");
const botonReiniciar = document.getElementById("reiniciar");
const botonAmpliarMapa = document.getElementById("boton-ampliar-mapa");
const contenedorMapa = document.getElementById("mapa-juego");
const fotoNoDisponible = document.getElementById("foto-no-disponible");

const mapa = L.map("mapa-juego", {
    scrollWheelZoom: true,
    zoomControl: true
});

L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
        attribution: "Tiles © Esri",
        maxZoom: 18
    }
).addTo(mapa);

const iconoPregunta = L.divIcon({
    className: "",
    html: '<div style="width:34px;height:34px;border-radius:50%;background:#e53935;border:3px solid white;box-shadow:0 2px 7px #333;color:white;font:bold 21px Arial;display:flex;align-items:center;justify-content:center;">?</div>',
    iconSize: [38, 38],
    iconAnchor: [19, 19]
});

const limites = L.latLngBounds(
    lugares.map(lugar => [lugar.lat, lugar.lng])
);
mapa.fitBounds(limites, { padding: [20, 20], maxZoom: 13 });

let marcador = null;
let ordenRondas = [];
let rondaActual = 0;
let puntos = 0;

function mezclar(lista) {
    return lista.slice().sort(() => Math.random() - 0.5);
}

function iniciarJuego() {
    ordenRondas = mezclar(lugares);
    rondaActual = 0;
    puntos = 0;
    etiquetaPuntos.textContent = puntos;
    totalRondas.textContent = lugares.length;
    botonReiniciar.hidden = true;
    document.getElementById("instruccion").hidden = false;
    mostrarRonda();
    mapa.invalidateSize();
}

function mostrarRonda() {
    const lugar = ordenRondas[rondaActual];
    etiquetaRonda.textContent = rondaActual + 1;
    resultado.textContent = "";
    informacion.hidden = true;
    informacion.style.display = "none";
    botonSiguiente.hidden = true;
    opciones.hidden = false;
    opciones.replaceChildren();

    if (marcador) {
        marcador.setLatLng([lugar.lat, lugar.lng]);
    } else {
        marcador = L.marker([lugar.lat, lugar.lng], {
            icon: iconoPregunta,
            keyboard: false,
            title: "Lugar para adivinar"
        }).addTo(mapa);
    }

    mapa.flyTo([lugar.lat, lugar.lng], 14, {
        animate: true,
        duration: 0.7
    });

    const incorrectas = mezclar(
        lugares.filter(opcion => opcion.nombre !== lugar.nombre)
    ).slice(0, 2);

    const tresOpciones = mezclar([lugar, ...incorrectas]);

    tresOpciones.forEach(function (opcion) {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "opcion";
        boton.textContent = opcion.nombre;
        boton.addEventListener("click", function () {
            responder(opcion, lugar);
        }, { once: true });
        opciones.appendChild(boton);
    });
}

function responder(opcion, lugar) {
    opciones.querySelectorAll("button").forEach(boton => boton.disabled = true);

    if (opcion.nombre === lugar.nombre) {
        puntos += 10;
        etiquetaPuntos.textContent = puntos;
        sumarPuntos(10);
        resultado.textContent = "¡Correcto! Sumaste 10 puntos al puntaje total.";
    } else {
        resultado.textContent =
            "No era ese. El lugar señalado es: " + lugar.nombre + ".";
    }

    document.getElementById("nombre-lugar").textContent = lugar.nombre;
    const imagen = document.getElementById("imagen-lugar");

    if (lugar.imagen) {
        imagen.src = lugar.imagen;
        imagen.alt = lugar.nombre;
        imagen.hidden = false;
        imagen.style.display = "block";
        fotoNoDisponible.hidden = true;
        fotoNoDisponible.style.display = "none";
    } else {
        imagen.removeAttribute("src");
        imagen.hidden = true;
        imagen.style.display = "none";
        fotoNoDisponible.hidden = false;
        fotoNoDisponible.style.display = "flex";
    }

    document.getElementById("descripcion-lugar").textContent =
        lugar.descripcion;

    informacion.hidden = false;
    informacion.style.display = "block";

    if (rondaActual < ordenRondas.length - 1) {
        botonSiguiente.hidden = false;
    } else {
        resultado.textContent +=
            " Juego terminado. Puntaje final: " +
            puntos +
            " de " +
            (lugares.length * 10) +
            ".";

        marcador.remove();
        marcador = null;
        document.getElementById("instruccion").hidden = true;
        botonReiniciar.hidden = false;
    }
}

botonSiguiente.addEventListener("click", function () {
    rondaActual++;
    mostrarRonda();
});

botonReiniciar.addEventListener("click", iniciarJuego);

botonAmpliarMapa.addEventListener("click", async function () {
    if (document.fullscreenElement === contenedorMapa) {
        await document.exitFullscreen();
    } else if (contenedorMapa.requestFullscreen) {
        await contenedorMapa.requestFullscreen();
    } else {
        contenedorMapa.style.height =
            contenedorMapa.style.height === "75vh" ? "380px" : "75vh";

        botonAmpliarMapa.textContent =
            contenedorMapa.style.height === "75vh"
                ? "Reducir mapa"
                : "Ampliar mapa";
    }

    mapa.invalidateSize();
});

document.addEventListener("fullscreenchange", function () {
    const ampliado = document.fullscreenElement === contenedorMapa;
    botonAmpliarMapa.textContent = ampliado
        ? "Reducir mapa"
        : "Ampliar mapa";

    mapa.invalidateSize();
});

iniciarJuego();