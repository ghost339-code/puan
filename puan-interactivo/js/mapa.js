
const lugares = {
    "Malteria Pampa S.A": {
        nombre: "Maltería Pampa S.A.",
        imagen: "img/malteria.jpg",
        descripcion: "Es una importante planta industrial de Puan dedicada a la producción de malta, un ingrediente fundamental para la elaboración de cerveza. "
    },

    "Laguna de Puán": {
        nombre: "Laguna de Puan",
        imagen: "img/laguna.jpg",
        descripcion: "Es uno de los principales atractivos turísticos de la localidad. Se destaca por sus paisajes, la pesca deportiva y los espacios recreativos para disfrutar al aire libre."
    },

    "Milenium": {
        nombre: "Milenium",
        imagen: "img/milenium.jpg",
        descripcion: "Es un atractivo turístico y religioso ubicado en el Cerro de la Paz. Desde allí se pueden apreciar hermosas vistas panorámicas de Puan y su laguna."
    },

    "Polideportivo": {
        nombre: "Polideportivo",
        imagen: "img/polideportivo.jpg",
        descripcion: "Es un espacio municipal destinado a la práctica de deportes y actividades recreativas. Cuenta con instalaciones para distintas disciplinas y eventos deportivos. "
    },

    "Predio de la FNCC": {
        nombre: "Predio de la FNCC",
        imagen: "img/fncc.jpg",
        descripcion: "Es el lugar donde se realiza la Fiesta Nacional de la Cebada Cervecera. Cuenta con espacios para espectáculos, ferias, gastronomía y actividades tradicionales. "
    },

    "Cancha de Tiro Federal": {
        nombre: "Cancha de Tiro Federal",
        imagen: "img/tirofederal.jpg",
        descripcion: "Es el predio deportivo de Tiro Federal y Club Atlético de Puan. Allí se disputan partidos de fútbol y se desarrollan actividades deportivas y sociales."
    },

    "Cancha de Puán Football Club": {
        nombre: "Cancha de Puan Football Club",
        imagen: "img/puanfc.jpg",
        descripcion: "Es el estadio Evaristo García, donde juega de local Puan Football Club. Es un espacio importante para el fútbol y la vida deportiva de la comunidad. "
    }
};

document.querySelectorAll(".opcion").forEach(function(boton) {

    boton.addEventListener("click", function() {

        const lugar = lugares[boton.textContent.trim()];

        if (lugar) {
            document.getElementById("nombre-lugar").textContent = lugar.nombre;

            const imagen = document.getElementById("imagen-lugar");
            imagen.src = lugar.imagen;
            imagen.alt = lugar.nombre;

            document.getElementById("descripcion-lugar").textContent = lugar.descripcion;

            document.getElementById("informacion").style.display = "block";
        }

    });

});
