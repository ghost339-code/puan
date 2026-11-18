// ========================================
// RESULTADOS Y CLASIFICACION FINAL
// ========================================


// Obtener el último resultado
const ultimoResultado = obtenerUltimoResultado();


// Mostrar resultado del participante
if (ultimoResultado) {

    document.getElementById("nombre").textContent =
        "¡Felicitaciones, " + ultimoResultado.nombre + "!";

    document.getElementById("puntaje").textContent =
        ultimoResultado.puntaje + " puntos";


    // Determinar categoría y mensaje
    let categoria = "";
    let mensaje = "";

    const puntos = ultimoResultado.puntaje;

    if (puntos <= 40) {

        categoria = "Visitante curioso";
        mensaje = "¡Gracias por participar! Seguí descubriendo Puan.";

    } else if (puntos <= 80) {

        categoria = "Explorador de Puan";
        mensaje = "¡Muy bien! Estás descubriendo nuestra localidad.";

    } else if (puntos <= 120) {

        categoria = "Conocedor local";
        mensaje = "¡Excelente! Tenés un gran conocimiento sobre Puan.";

    } else {

        categoria = "Experto en Puan";
        mensaje = "¡Increíble! Sos un verdadero experto en Puan.";

    }

    document.getElementById("categoria").textContent = categoria;

    document.getElementById("mensaje").textContent = mensaje;

} else {

    document.getElementById("nombre").textContent =
        "Todavía no hay resultados.";

    document.getElementById("puntaje").textContent = "0 puntos";

    document.getElementById("categoria").textContent =
        "Participá en los juegos";

    document.getElementById("mensaje").textContent =
        "Completá las actividades para conocer tu clasificación.";

}


// ========================================
// CLASIFICACION GENERAL
// ========================================

function mostrarClasificacion() {

    const resultados = obtenerResultados();

    const tabla = document.getElementById("clasificacion");

    tabla.innerHTML = "";

    if (resultados.length === 0) {

        tabla.textContent = "Todavía no hay participantes registrados.";
        return;

    }

    // Ordenar de mayor a menor puntaje
    resultados.sort((a, b) => b.puntaje - a.puntaje);

    const tablaHTML = document.createElement("table");

    const encabezado = document.createElement("tr");

    ["Puesto", "Participante", "Puntaje"].forEach(texto => {

        const th = document.createElement("th");
        th.textContent = texto;
        encabezado.appendChild(th);

    });

    tablaHTML.appendChild(encabezado);


    // Crear filas de participantes
    resultados.forEach((participante, indice) => {

        const fila = document.createElement("tr");

        const puesto = document.createElement("td");
        const nombre = document.createElement("td");
        const puntaje = document.createElement("td");

        if (indice === 0) {
            puesto.textContent = "🥇 1";
        } else if (indice === 1) {
            puesto.textContent = "🥈 2";
        } else if (indice === 2) {
            puesto.textContent = "🥉 3";
        } else {
            puesto.textContent = indice + 1;
        }

        nombre.textContent = participante.nombre;

        puntaje.textContent = participante.puntaje + " puntos";

        fila.appendChild(puesto);
        fila.appendChild(nombre);
        fila.appendChild(puntaje);

        tablaHTML.appendChild(fila);

    });

    tabla.appendChild(tablaHTML);

}


// Mostrar clasificación al cargar la página
mostrarClasificacion();