let puntos = 0;
let completedToday = [];
let currentDay, month, year, todayKey;

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
    todayKey = `day-${year}-${month}-${currentDay}`;

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

    /* ========= PROGRESO ========= */
    function actualizarProgreso() {
        const porcentaje = (completedToday.length / subjects.length) * 100;
        progressBar.style.width = porcentaje + "%";
    }

    /* ========= CALENDARIO ========= */
    function generarCalendario() {

        calendar.innerHTML = "";
        const diasSemana = ["L","M","M","J","V","S","D"];

        diasSemana.forEach(d => {
            const div = document.createElement("div");
            div.classList.add("diaTitulo");
            div.textContent = d;
            calendar.appendChild(div);
        });

        const primerDia = new Date(year, month, 1).getDay();
        const diasMes = new Date(year, month + 1, 0).getDate();
        let espacios = primerDia === 0 ? 6 : primerDia - 1;

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

        if(!isNaN(index) && !completedToday.includes(index)){

            completedToday.push(index);
            localStorage.setItem("todaySubjects", JSON.stringify(completedToday));

            puntos += 10;
            localStorage.setItem("puntos", puntos);
            pointsElement.textContent = puntos;

            actualizarProgreso();
        }

        localStorage.removeItem("quizCompletado");
    }

    generarCalendario();
    actualizarProgreso();
});


/* ========= FUNCIONES GLOBALES ========= */

function resetearMaterias(){
    if(confirm("¿Reiniciar materias del día?")){
        localStorage.removeItem("todaySubjects");
        location.reload();
    }
}

function resetearTodo(){
    if(confirm("¿Borrar TODO el progreso?")){
        localStorage.clear();
        location.reload();
    }
}
