const preguntas = Array.from(document.querySelectorAll('.pregunta'));
const mensaje = document.getElementById('mensaje');
let preguntaActual = 0;

preguntas.forEach(function (pregunta) {
  pregunta.querySelectorAll('.opcion').forEach(function (boton) {
    boton.addEventListener('click', function () {
      if (boton.dataset.correcta !== 'true') {
        mensaje.textContent = 'Respuesta incorrecta. Intentá nuevamente.';
        return;
      }

      mensaje.textContent = '¡Correcto! Sumaste 10 puntos.';
      pregunta.querySelectorAll('.opcion').forEach(function (opcion) {
        opcion.disabled = true;
      });
      sumar(10);

      window.setTimeout(function () {
        pregunta.hidden = true;
        preguntaActual += 1;

        if (preguntaActual < preguntas.length) {
          preguntas[preguntaActual].hidden = false;
          mensaje.textContent = '';
        } else {
          mensaje.textContent = '¡Terminaste! Respondiste todas las preguntas.';
        }
      }, 1200);
    });
  });
});

function sumar(n) {
  localStorage.setItem('puntaje', (Number(localStorage.getItem('puntaje')) || 0) + n);
}
