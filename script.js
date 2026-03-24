let puntos = 0;
let completedToday = [];

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
    const currentDay = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    /* ========= MATERIAS ========= */
    completedToday = JSON.parse(localStorage.getItem("todaySubjects")) || [];

    function bloquearMateria(subject) {
        subject.style.pointerEvents = "none";
        subject.style.opacity = "0.6";
    }

    subjects.forEach((subject, index) => {

        if (completedToday.includes(index)) bloquearMateria(subject);

        subject.addEventListener("click", () => {

            if (completedToday.includes(index)) return;

            localStorage.setItem("materiaActual", subject.dataset.materia);
            localStorage.setItem("materiaIndex", index);

            const materia = subject.dataset.materia.trim().toLowerCase();

            let paginas = {
                "matemáticas": "matematicas.html",
                "español": "espanol.html",
                "inglés": "ingles.html",
                "historia": "historia.html",
                "programación": "programacion.html",
                "ciencias": "ciencias.html"
            };

            window.location.href = paginas[materia] || "materias.html";
        });
    });

    /* ========= PROGRESO ========= */
    function actualizarProgreso() {
        let porcentaje = (completedToday.length / subjects.length) * 100;
        progressBar.style.width = porcentaje + "%";
    }

    /* ========= CALENDARIO ========= */
    function generarCalendario() {

        calendar.innerHTML = "";

        const diasSemana = ["L","M","Mi","J","V","S","D"];

        diasSemana.forEach(d => {
            let div = document.createElement("div");
            div.className = "diaTitulo";
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
            let day = document.createElement("div");
            day.className = "day";
            day.textContent = i;

            if(i === currentDay) day.classList.add("today");

            calendar.appendChild(day);
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


/* ========= RESET ========= */
function resetearMaterias(){
    if(confirm("¿Reiniciar materias y puntos?")){

        // borrar materias
        localStorage.removeItem("todaySubjects");

        // 🔥 borrar puntos también
        localStorage.removeItem("puntos");

        // limpiar control de duplicados
        Object.keys(localStorage).forEach(key => {
            if(key.startsWith("sumado_")){
                localStorage.removeItem(key);
            }
        });

        location.reload();
    }
}
function resetearTodo(){

    let pass = prompt("🔒 Ingresa la contraseña:");

    if(pass === null) return;

    const clave = "1234";

    if(pass !== clave){
        alert("❌ Incorrecta");
        return;
    }

    if(confirm("⚠️ ¿Borrar TODO?")){

        localStorage.clear();

        location.reload();
    }
}
