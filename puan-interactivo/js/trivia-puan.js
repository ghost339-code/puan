/* ===== SOLO PARA PRUEBAS =====
   Si comun.js no cargó, define funciones vacías.
   Borrá este bloque cuando comun.js esté funcionando. */
if (typeof iniciarParticipante === 'undefined') {
  window.iniciarParticipante = n => console.warn('Falta comun.js: iniciarParticipante', n);
  window.sumarPuntos = p => console.warn('Falta comun.js: sumarPuntos', p);
  window.finalizarPartida = () => console.warn('Falta comun.js: finalizarPartida');
}

/* ===== TRIVIA ===== */
const $ = id => document.getElementById(id);
let i = 0, puntos = 0;           // puntos = aciertos de ESTA actividad (el total lo lleva comun.js)
const VALOR = 10;                // puntos por respuesta correcta

const PREGUNTAS = [
  {p:"¿Qué significa el nombre Puán?", o:["Tierra de vientos","Dos soles","Lugar de piedras"], c:1},
  {p:"¿Qué hay en el medio de la Laguna de Puán?", o:["Un faro","Una isla","Un castillo"], c:1},
  {p:"¿Qué animal prehistórico se puede conocer en el museo de Puán?", o:["Un dinosaurio carnívoro","Un gliptodonte","Un mamut lanudo"], c:1},
  {p:"¿Qué tiene de particular el Mirador Millenium?", o:["Tiene rampas de acceso en espiral","Está construido dentro de la laguna","Es una torre de madera"], c:0},
  {p:"¿Qué fiesta nacional es característica de Puán?", o:["Fiesta Nacional del Trigo","Fiesta Nacional de la Cebada Cervecera","Fiesta Nacional del Panqueque"], c:1},
  {p:"¿Qué famoso cantante está relacionado con la llamada Casita de Gardel?", o:["Carlos Gardel","Atahualpa Yupanqui","Melbourne"], c:0},
  {p:"Mito o realidad: ¿Es cierto que Carlos Gardel cantó en la famosa Casita de Gardel de Puán en 1924?", o:["Mito","Realidad"], c:1},
  {p:"Mito o realidad: ¿En el distrito de Puán se encontraron restos de animales prehistóricos que vivieron hace miles de años?", o:["Mito","Realidad"], c:1},
  {p:"Mito o realidad: ¿Puán fue fundado antes de 1850?", o:["Mito","Realidad"], c:0}
];

function mostrar(id){
  document.querySelectorAll(".pantalla").forEach(s => s.classList.remove("activa"));
  $(id).classList.add("activa");
}

function cargar(){
  const q = PREGUNTAS[i];
  $("num").textContent = `Pregunta ${i+1} de ${PREGUNTAS.length}`;
  $("pts").textContent = `⭐ ${puntos}`;
  $("prog").style.width = (i / PREGUNTAS.length * 100) + "%";
  $("pregunta").textContent = q.p;
  $("aviso").textContent = "";
  $("siguiente").hidden = true;
  $("opciones").innerHTML = "";
  q.o.forEach((t, n) => {
    const b = document.createElement("button");
    b.className = "op"; b.textContent = t;
    b.onclick = () => responder(n);
    $("opciones").appendChild(b);
  });
}

function responder(n){
  const q = PREGUNTAS[i], bs = document.querySelectorAll(".op");
  bs.forEach(b => b.disabled = true);
  bs[q.c].classList.add("ok");
  if (n === q.c){
    puntos++;
    sumarPuntos(VALOR);          // comun.js: solo si la respuesta es correcta
    $("aviso").textContent = "¡Correcto! 💖";
  } else {
    bs[n].classList.add("mal");
    $("aviso").textContent = "Casi. La respuesta correcta está en verde.";
  }
  $("pts").textContent = `⭐ ${puntos}`;
  $("siguiente").textContent = i === PREGUNTAS.length - 1 ? "Ver resultado" : "Siguiente";
  $("siguiente").hidden = false;
  $("siguiente").focus();
}

function terminar(){
  // NO se llama a finalizarPartida() acá: el participante puede seguir con otras actividades
  $("prog").style.width = "100%";
  const total = PREGUNTAS.length, r = puntos / total;
  $("puntaje-final").textContent = `${puntos}/${total}`;
  $("titulo-final").textContent = r === 1 ? "¡Puntaje perfecto!" : r >= .60 ? "¡Muy bien!" : "¡Seguí practicando!";
  $("mensaje-final").textContent =
    (r >= .60 ? "Se nota que conocés Puán." : "Repasá y volvé a intentarlo.") +
    " Sumaste " + (puntos * VALOR) + " puntos en esta actividad.";
  mostrar("final");
  if (r >= .60) lluvia();
}

function lluvia(){
  const em = ["💖","✨","🌸","⭐","🎀"];
  for (let k = 0; k < 24; k++){
    const s = document.createElement("span");
    s.className = "chispa"; s.textContent = em[k % em.length];
    s.style.left = Math.random() * 100 + "vw";
    s.style.fontSize = 16 + Math.random() * 18 + "px";
    s.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
    s.style.animationDelay = Math.random() * 1.2 + "s";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 7000);
  }
}

function empezarJuego(){
  i = 0; puntos = 0;             // reinicia solo el contador local, no el total de comun.js
  mostrar("juego");
  cargar();
}

/* ===== Eventos ===== */

$("empezar").onclick = () => {
  const nombre = $("nombre").value.trim();
  if (!nombre){
    $("error-nombre").textContent = "Ingresá tu nombre para comenzar.";
    $("nombre").focus();
    return;
  }
  $("error-nombre").textContent = "";
  iniciarParticipante(nombre);   // comun.js: una sola vez
  empezarJuego();
};

$("nombre").addEventListener("keydown", e => {
  if (e.key === "Enter") $("empezar").click();
});

$("siguiente").onclick = () => { i++; i < PREGUNTAS.length ? cargar() : terminar(); };

// "Jugar de nuevo" no vuelve a pedir el nombre ni reinicia el puntaje total
$("reiniciar").onclick = empezarJuego;

// Único lugar donde se cierra la partida
$("finalizar").onclick = () => {
  finalizarPartida();            // comun.js
  window.location.href = "resultado.html";
};