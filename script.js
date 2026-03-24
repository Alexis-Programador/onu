let puntos = 0;
let completedToday = [];
let currentDay, month, year;

document.addEventListener("DOMContentLoaded", () => {

    const subjects = document.querySelectorAll(".subject");
    const calendar = document.getElementById("calendar");
    const progressBar = document.getElementById("progress");
    const pointsElement = document.getElementById("points");

    /* ========= PUNTOS ========= */
    puntos = parseInt(localStorage.getItem("puntos")) || 0;
    pointsElement.textContent = puntos;

    /* ========= FECHA ========= */
    const today = new Date();
    currentDay = today.getDate();
    month = today.getMonth();
    year = today.getFullYear();

    /* ========= MATERIAS HECHAS ========= */
    completedToday = JSON.parse(localStorage.getItem("todaySubjects")) || [];

    /* ========= BLOQUEAR MATERIA ========= */
    function bloquearMateria(subject) {
        subject.style.pointerEvents = "none";
        subject.style.opacity = "0.6";
    }

    /* ========= CLICK MATERIAS ========= */
    subjects.forEach((subject, index) => {

        if (completedToday.includes(index)) bloquearMateria(subject);

        subject.addEventListener("click", () => {

            if (completedToday.includes(index)) return;

            localStorage.setItem("materiaActual", subject.dataset.materia);
            localStorage.setItem("materiaIndex", index);

            const materia = subject.dataset.materia.trim().toLowerCase();
            let htmlDestino = "";

            switch(materia){
                case "matemáticas": htmlDestino = "matematicas.html"; break;
                case "español": htmlDestino = "espanol.html"; break;
                case "inglés": htmlDestino = "ingles.html"; break;
                case "historia": htmlDestino = "historia.html"; break;
                case "programación": htmlDestino = "programacion.html"; break;
                case "ciencias": htmlDestino = "ciencias.html"; break;
                default: htmlDestino = "materias.html"; break;
            }

            window.location.href = htmlDestino;
        });
    });

    /* ========= PROGRESO ========= */
    function actualizarProgreso() {
        const porcentaje = subjects.length === 0 ? 0 : (completedToday.length / subjects.length) * 100;
        progressBar.style.width = porcentaje + "%";
    }

    /* ========= CALENDARIO ========= */
    function generarCalendario() {

        calendar.innerHTML = "";

        const diasSemana = ["L","M","Mi","J","V","S","D"];

        diasSemana.forEach(d => {
            const div = document.createElement("div");
            div.classList.add("diaTitulo");
            div.textContent = d;
            calendar.appendChild(div);
        });

        let primerDia = new Date(year, month, 1).getDay();
        primerDia = primerDia === 0 ? 7 : primerDia;
        let espacios = primerDia - 1;

        const diasMes = new Date(year, month + 1, 0).getDate();

        for(let i=0;i<espacios;i++){
            calendar.appendChild(document.createElement("div"));
        }

        for(let i=1;i<=diasMes;i++){
            const dayDiv = document.createElement("div");
            dayDiv.classList.add("day");
            dayDiv.textContent = i;

            if(i === currentDay) dayDiv.classList.add("today");

            calendar.appendChild(dayDiv);
        }
    }

    /* ========= QUIZ COMPLETADO ========= */
    if(localStorage.getItem("quizCompletado") === "true"){

        const index = parseInt(localStorage.getItem("materiaIndex"));
        const yaSumado = localStorage.getItem("sumado_" + index);

        if(!isNaN(index) && !completedToday.includes(index) && !yaSumado){

            completedToday.push(index);
            localStorage.setItem("todaySubjects", JSON.stringify(completedToday));

            let puntosGanados = parseInt(localStorage.getItem("puntosGanados")) || 0;

            puntos += puntosGanados;
            localStorage.setItem("puntos", puntos);
            pointsElement.textContent = puntos;

            localStorage.setItem("sumado_" + index, "true");

            actualizarProgreso();
        }

        localStorage.removeItem("quizCompletado");
        localStorage.removeItem("puntosGanados");
    }

    generarCalendario();
    actualizarProgreso();
});


/* ========= FUNCIONES GLOBALES ========= */

function resetearMaterias(){
    if(confirm("¿Reiniciar materias del día?")){
        localStorage.removeItem("todaySubjects");

        // 🔥 limpiar control de puntos
        Object.keys(localStorage).forEach(key => {
            if(key.startsWith("sumado_")){
                localStorage.removeItem(key);
            }
        });

        location.reload();
    }
}

function resetearTodo(){

    let pass = prompt("🔒 Ingresa la contraseña para borrar todo:");

    if(pass === null) return;

    const clave = localStorage.getItem("adminPass") || "1234";

    if(pass !== clave){
        alert("❌ Contraseña incorrecta");
        return;
    }

    if(confirm("⚠️ ¿Seguro que quieres borrar TODO el progreso?")){

        localStorage.removeItem("puntos");
        localStorage.removeItem("todaySubjects");
        localStorage.removeItem("puntosGanados");

        // 🔥 limpiar control de puntos
        Object.keys(localStorage).forEach(key => {
            if(key.startsWith("sumado_")){
                localStorage.removeItem(key);
            }
        });

        location.reload();
    }
}
