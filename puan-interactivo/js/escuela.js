
const preguntas = Array.from(document.querySelectorAll('.pregunta'));

const mensajeFinal = document.getElementById('mensaje-final');

let preguntaActual = 0;
let puntosActividad = 0;

preguntas.forEach(function (pregunta) {

    const mensaje = pregunta.querySelector('.mensaje-respuesta');
    const opciones = pregunta.querySelectorAll('.opcion');

    opciones.forEach(function (boton) {

        boton.addEventListener('click', function () {

            // Evitar responder más de una vez
            if (opciones[0].disabled) {
                return;
            }

            // Desactivar las opciones
            opciones.forEach(function (opcion) {
                opcion.disabled = true;
            });

            // Comprobar respuesta
            if (boton.dataset.correcta === 'true') {

                mensaje.textContent = '¡Correcto! Sumaste 10 puntos.';

                sumarPuntos(10);
                puntosActividad += 10;

            } else {

                mensaje.textContent = 'Respuesta incorrecta. No sumaste puntos.';

            }

            // Pasar a la siguiente pregunta
            setTimeout(function () {

                pregunta.hidden = true;
                preguntaActual++;

                if (preguntaActual < preguntas.length) {

                    preguntas[preguntaActual].hidden = false;

                } else {

                    mensajeFinal.innerHTML =
                        '¡Felicitaciones! Terminaste las 10 preguntas.<br>' +
                        'Tu puntaje total fue de: ' + puntosActividad + ' puntos.';

                }

            }, 1200);

        });

    });

});

        // // Seleccionar todas las preguntas
        // const preguntas = document.querySelectorAll(".pregunta");

        // // Comenzar por la primera pregunta
        // let preguntaActual = 0;

        // // Tiempo de espera antes de cambiar de pregunta
        // const tiempoEspera = 1500;

        // // Mostrar solamente la primera pregunta
        // preguntas.forEach((pregunta, indice) => {
        //     pregunta.hidden = indice !== 0;
        // });

        // // Seleccionar todos los botones de respuestas
        // document.querySelectorAll(".opcion").forEach(boton => {

        //     boton.addEventListener("click", function() {

        //         const pregunta = preguntas[preguntaActual];

        //         const botones = pregunta.querySelectorAll(".opcion");

        //         const mensaje = pregunta.querySelector(".mensaje-respuesta");

        //         // Evitar responder más de una vez
        //         if (botones[0].disabled) {
        //             return;
        //         }

        //         // Comprobar si la respuesta es correcta
        //         if (this.dataset.correcta === "true") {

        //             // Mostrar mensaje de respuesta correcta
        //             mensaje.textContent =
        //                 "¡Respuesta correcta! +10 puntos.";

        //             mensaje.style.color = "green";

        //             // Sumar 10 puntos al puntaje acumulado
        //             sumarPuntos(10);

        //             // Desactivar las respuestas
        //             botones.forEach(b => {
        //                 b.disabled = true;
        //             });

        //             // Esperar antes de pasar a la siguiente pregunta
        //             setTimeout(() => {

        //                 // Ocultar pregunta actual
        //                 pregunta.hidden = true;

        //                 // Pasar a la siguiente pregunta
        //                 preguntaActual++;

        //                 if (preguntaActual < preguntas.length) {

        //                     // Mostrar siguiente pregunta
        //                     preguntas[preguntaActual].hidden = false;

        //                 } else {

        //                     // Mostrar mensaje final
        //                     document.getElementById("mensaje-final").textContent =
        //                         "¡Felicitaciones! Terminaste el juego. ¡Sumaste tus puntos!";

        //                     document.getElementById("mensaje-final")
        //                         .style.color = "green";

        //                 }

        //             }, tiempoEspera);

        //         } else {

        //             // Mostrar mensaje de respuesta incorrecta
        //             mensaje.textContent =
        //                 "¡Respuesta incorrecta! Intentá nuevamente.";

        //             mensaje.style.color = "red";

        //         }

        //     });

        // });

