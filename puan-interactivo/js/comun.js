// ========================================
// SISTEMA GENERAL DE PUNTAJE - PROYECTO PUAN
// ========================================

// Claves utilizadas en LocalStorage
const CLAVES = {
    nombre: "puan_nombre",
    puntaje: "puan_puntaje",
    resultados: "puan_resultados",
    finalizado: "puan_finalizado",
    ultimoResultado: "puan_ultimo_resultado"
};


// 1. COMENZAR UNA NUEVA PARTIDA
function iniciarParticipante(nombre) {

    nombre = nombre.trim();

    if (nombre === "") {
        alert("Por favor, ingresá tu nombre.");
        return false;
    }

    localStorage.setItem(CLAVES.nombre, nombre);
    localStorage.setItem(CLAVES.puntaje, "0");
    localStorage.setItem(CLAVES.finalizado, "false");

    return true;
}


// 2. OBTENER EL NOMBRE DEL PARTICIPANTE
function obtenerNombre() {

    return localStorage.getItem(CLAVES.nombre) || "Participante";

}


// 3. OBTENER EL PUNTAJE ACTUAL
function obtenerPuntaje() {

    return Number(localStorage.getItem(CLAVES.puntaje)) || 0;

}


// 4. SUMAR PUNTOS
function sumarPuntos(puntos) {

    if (localStorage.getItem(CLAVES.finalizado) === "true") {
        return false;
    }

    if (puntos !== 10 && puntos !== 20) {
        console.error("El puntaje debe ser de 10 o 20 puntos.");
        return false;
    }

    let puntajeActual = obtenerPuntaje();

    puntajeActual += puntos;

    localStorage.setItem(CLAVES.puntaje, puntajeActual);

    return true;

}


// 5. OBTENER TODOS LOS RESULTADOS GUARDADOS
function obtenerResultados() {

    return JSON.parse(localStorage.getItem(CLAVES.resultados)) || [];

}


// 6. FINALIZAR Y GUARDAR LA PARTIDA
function finalizarPartida() {

    if (localStorage.getItem(CLAVES.finalizado) === "true") {
        return false;
    }

    const resultado = {
        nombre: obtenerNombre(),
        puntaje: obtenerPuntaje(),
        fecha: new Date().toLocaleString("es-AR")
    };

    let resultados = obtenerResultados();

    resultados.push(resultado);

    localStorage.setItem(
        CLAVES.resultados,
        JSON.stringify(resultados)
    );

    localStorage.setItem(
        CLAVES.ultimoResultado,
        JSON.stringify(resultado)
    );

    localStorage.setItem(CLAVES.finalizado, "true");

    return true;

}


// 7. OBTENER EL ÚLTIMO RESULTADO
function obtenerUltimoResultado() {

    return JSON.parse(
        localStorage.getItem(CLAVES.ultimoResultado)
    );

}


// 8. REINICIAR PARA UN NUEVO PARTICIPANTE
function reiniciarPartida() {

    localStorage.removeItem(CLAVES.nombre);
    localStorage.removeItem(CLAVES.puntaje);
    localStorage.removeItem(CLAVES.finalizado);
    localStorage.removeItem(CLAVES.ultimoResultado);

    // No se borra el historial de resultados.
}