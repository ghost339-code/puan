
// ========================================
// SISTEMA GENERAL DE PUNTAJE - PROYECTO PUAN
// BASE DE DATOS COMPARTIDA CON FIREBASE
// ========================================

// 1. CONFIGURACIÓN DE FIREBASE
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Claves locales
const CLAVES = {
    nombre: "puan_nombre",
    puntaje: "puan_puntaje",
    finalizado: "puan_finalizado",
    participante: "puan_participante"
};

// Identificador de cada partida
let participanteId = null;

// 2. INICIAR PARTICIPANTE
async function iniciarParticipante(nombre) {
    nombre = nombre.trim();

    if (nombre === "") {
        alert("Por favor, ingresá tu nombre.");
        return false;
    }

    try {
        await auth.signInAnonymously();

        participanteId = db.collection("participantes").doc().id;

        localStorage.setItem(CLAVES.nombre, nombre);
        localStorage.setItem(CLAVES.puntaje, "0");
        localStorage.setItem(CLAVES.finalizado, "false");
        localStorage.setItem(CLAVES.participante, participanteId);

        await db.collection("participantes").doc(participanteId).set({
            nombre: nombre,
            puntaje: 0,
            finalizado: false,
            fecha: firebase.firestore.FieldValue.serverTimestamp()
        });

        return true;

    } catch (error) {
        console.error("Error al iniciar:", error);
        alert("No se pudo conectar con la base de datos.");
        return false;
    }
}

// 3. OBTENER NOMBRE
function obtenerNombre() {
    return localStorage.getItem(CLAVES.nombre) || "Participante";
}

// 4. OBTENER PUNTAJE
function obtenerPuntaje() {
    return Number(localStorage.getItem(CLAVES.puntaje)) || 0;
}

// 5. SUMAR PUNTOS
async function sumarPuntos(puntos) {
    if (localStorage.getItem(CLAVES.finalizado) === "true") {
        return false;
    }

    if (puntos !== 10 && puntos !== 20) {
        console.error("El puntaje debe ser de 10 o 20 puntos.");
        return false;
    }

    const id = localStorage.getItem(CLAVES.participante);

    if (!id || !auth.currentUser) {
        console.error("No hay una partida iniciada.");
        return false;
    }

    try {
        await db.collection("participantes").doc(id).update({
            puntaje: firebase.firestore.FieldValue.increment(puntos)
        });

        localStorage.setItem(
            CLAVES.puntaje,
            String(obtenerPuntaje() + puntos)
        );

        return true;

    } catch (error) {
        console.error("Error al sumar puntos:", error);
        return false;
    }
}

// 6. FINALIZAR PARTIDA
async function finalizarPartida() {
    if (localStorage.getItem(CLAVES.finalizado) === "true") {
        return false;
    }

    const id = localStorage.getItem(CLAVES.participante);

    if (!id || !auth.currentUser) {
        return false;
    }

    try {
        const participante = db.collection("participantes").doc(id);
        const datos = await participante.get();

        if (!datos.exists) return false;

        const resultado = {
            nombre: obtenerNombre(),
            puntaje: datos.data().puntaje,
            fecha: firebase.firestore.FieldValue.serverTimestamp()
        };

        await db.collection("resultados").add(resultado);

        await participante.update({
            finalizado: true
        });

        localStorage.setItem(CLAVES.finalizado, "true");

        return true;

    } catch (error) {
        console.error("Error al guardar resultado:", error);
        return false;
    }
}

// 7. OBTENER RESULTADOS COMPARTIDOS
async function obtenerResultados() {
    try {
        const consulta = await db.collection("resultados")
            .orderBy("fecha", "desc")
            .get();

        return consulta.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

    } catch (error) {
        console.error("Error al obtener resultados:", error);
        return [];
    }
}

// 8. ESCUCHAR RESULTADOS EN TIEMPO REAL
function escucharResultados(callback) {
    return db.collection("resultados")
        .orderBy("fecha", "desc")
        .onSnapshot(snapshot => {
            const resultados = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            callback(resultados);
        });
}

// 9. REINICIAR PARTIDA
function reiniciarPartida() {
    localStorage.removeItem(CLAVES.nombre);
    localStorage.removeItem(CLAVES.puntaje);
    localStorage.removeItem(CLAVES.finalizado);
    localStorage.removeItem(CLAVES.participante);
}
