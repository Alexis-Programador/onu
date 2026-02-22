const subjects = document.querySelectorAll(".subject");
const calendar = document.getElementById("calendar");
const progressBar = document.getElementById("progress");

/* --------- FECHA --------- */
const today = new Date();
let currentDay = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();
const todayKey = `day-${year}-${month}-${currentDay}`;

/* --------- MATERIAS HECHAS --------- */
let completedToday = JSON.parse(localStorage.getItem("todaySubjects")) || [];

/* --------- BLOQUEAR MATERIA --------- */
function bloquearMateria(subject) {
    subject.style.pointerEvents = "none";
    subject.style.opacity = "0.6";
}

/* --------- CLICK MATERIAS --------- */
subjects.forEach((subject, index) => {

    if (completedToday.includes(index)) bloquearMateria(subject);

    subject.addEventListener("click", () => {
        if (completedToday.includes(index)) return;

        // Guardar materia actual y su index
        localStorage.setItem("materiaActual", subject.dataset.materia);
        localStorage.setItem("materiaIndex", index);

        // Redirigir según materia
        const materia = subject.dataset.materia.toLowerCase();
        let htmlDestino = "";

        switch(materia){
            case "matemáticas": htmlDestino = "matematicas.html"; break;
            case "español": htmlDestino = "espanol.html"; break;
            case "inglés": htmlDestino = "ingles.html"; break;
            case "historia": htmlDestino = "historia.html"; break;
            case "programación": htmlDestino = "programacion.html"; break;
            case "ciencias": htmlDestino = "ciencias.html"; break;
            case "física": htmlDestino = "fisica.html"; break;
            case "geografía": htmlDestino = "geografia.html"; break;
            case "arte": htmlDestino = "arte.html"; break;
            case "educación física": htmlDestino = "educacionfisica.html"; break;
            default: htmlDestino = "materias.html"; break;
        }

        window.location.href = htmlDestino;
    });
});

/* --------- PROGRESO DE MATERIAS --------- */
function actualizarProgresoMaterias() {
    const hechas = completedToday.length;
    const total = subjects.length;
    const porcentaje = (hechas / total) * 100;
    progressBar.style.width = porcentaje + "%";

    actualizarColorDiaActual();
}

/* --------- COLOR DIA --------- */
function actualizarColorDiaActual() {
    const hechas = completedToday.length;
    const dayDivs = document.querySelectorAll(".day");

    dayDivs.forEach(day => {
        if (parseInt(day.textContent) === currentDay) {
            day.classList.remove("red", "yellow", "green");

            if (hechas >= 9) day.classList.add("green");
            else if (hechas >= 3) day.classList.add("yellow");
            else if (hechas >= 1) day.classList.add("red");
        }
    });
}

/* --------- GUARDAR DIA --------- */
function evaluarDia() {
    if (localStorage.getItem(todayKey)) return;

    const hechas = completedToday.length;
    let estado = "red";

    if (hechas >= 9) estado = "green";
    else if (hechas >= 3) estado = "yellow";

    localStorage.setItem(todayKey, estado);
    localStorage.removeItem("todaySubjects");
}

/* --------- CALENDARIO REAL --------- */
function generarCalendario() {
    calendar.innerHTML = "";
    const diasSemana = ["L", "M", "M", "J", "V", "S", "D"];

    diasSemana.forEach(dia => {
        const div = document.createElement("div");
        div.classList.add("diaTitulo");
        div.textContent = dia;
        calendar.appendChild(div);
    });

    const primerDia = new Date(year, month, 1).getDay();
    const diasMes = new Date(year, month + 1, 0).getDate();
    let espacios = primerDia === 0 ? 6 : primerDia - 1;

    for (let i = 0; i < espacios; i++) {
        const vacio = document.createElement("div");
        calendar.appendChild(vacio);
    }

    for (let i = 1; i <= diasMes; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        dayDiv.textContent = i;

        if (i === currentDay) dayDiv.classList.add("today");

        const key = `day-${year}-${month}-${i}`;
        const estado = localStorage.getItem(key);

        if (estado) dayDiv.classList.add(estado);

        calendar.appendChild(dayDiv);
    }

    actualizarColorDiaActual();
}

/* --------- RESET SOLO MATERIAS --------- */
function resetearMaterias() {
    if (confirm("Reiniciar materias del día?")) {
        localStorage.removeItem("todaySubjects");
        completedToday = [];

        subjects.forEach(s => {
            s.style.pointerEvents = "auto";
            s.style.opacity = "1";
        });

        actualizarProgresoMaterias();
        alert("Materias reiniciadas");
    }
}

/* --------- RESET TOTAL --------- */
function resetearTodo() {
    if (confirm("Borrar TODO el progreso?")) {
        localStorage.clear();
        location.reload();
    }
}

/* --------- CAMBIO DIA AUTOMATICO --------- */
setInterval(() => {
    const now = new Date();
    if (now.getDate() !== currentDay) {
        evaluarDia();
        location.reload();
    }
}, 60000);

/* --------- INICIAR --------- */
generarCalendario();
actualizarProgresoMaterias();

/* --------- QUIZ COMPLETADO --------- */
const quizCompletado = localStorage.getItem("quizCompletado");

if (quizCompletado) {
    const index = parseInt(localStorage.getItem("materiaIndex"));

    if (!completedToday.includes(index)) {
        completedToday.push(index);
        localStorage.setItem("todaySubjects", JSON.stringify(completedToday));
    }

    localStorage.removeItem("quizCompletado");
}

/* --------- PUNTOS --------- */
let puntos = parseInt(localStorage.getItem("puntos")) || 0;
document.getElementById("points").textContent = puntos;

function cambiarPuntos() {
    let nuevo = prompt("Ingresa la nueva cantidad de puntos:", puntos);
    if (nuevo !== null) {
        nuevo = parseInt(nuevo);
        if (!isNaN(nuevo) && nuevo >= 0) {
            puntos = nuevo;
            localStorage.setItem("puntos", puntos);
            document.getElementById("points").textContent = puntos;
        } else {
            alert("Ingresa un número válido");
        }
    }

}
