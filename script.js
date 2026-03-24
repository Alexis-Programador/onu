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
body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background: url("Ac.jpg") no-repeat center center/cover;
    color: #ffffff;
}

        if(!isNaN(index) && !completedToday.includes(index) && !yaSumado){
/* HEADER */
header {
    background: rgba(103,15,34,0.85); /* #670f22 */
    backdrop-filter: blur(12px);
    padding: 20px;
    text-align: center;
    border-bottom: 2px solid #ffffff33;
}

            completedToday.push(index);
            localStorage.setItem("todaySubjects", JSON.stringify(completedToday));
/* LOGO */
.logo {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}

            let puntosGanados = parseInt(localStorage.getItem("puntosGanados")) || 0;
.logo img {
    width: 85px;
    height: 85px;
    border-radius: 50%;
    border: 3px solid #ffffff;
}

            puntos += puntosGanados;
            localStorage.setItem("puntos", puntos);
            pointsElement.textContent = puntos;
/* CONTENEDOR */
.container {
    display: flex;
    gap: 20px;
    padding: 20px;
}

            localStorage.setItem("sumado_" + index, "true");
/* COLUMNAS */
.left { width: 60%; }
.right { width: 40%; }

/* CARD */
.card {
    background: rgba(103,15,34,0.6);
    backdrop-filter: blur(12px);
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 20px;
    box-shadow: 0px 5px 25px rgba(0,0,0,0.5);
    border: 1px solid #ffffff22;
}

            actualizarProgreso();
        }
/* BOTONES */
button {
    background: linear-gradient(135deg, #670f22, #a3162d);
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    transition: 0.3s;
}

        localStorage.removeItem("quizCompletado");
        localStorage.removeItem("puntosGanados");
    }
button:hover {
    background: linear-gradient(135deg, #a3162d, #670f22);
    transform: scale(1.05);
}

    generarCalendario();
    actualizarProgreso();
});
/* MATERIAS */
.subjects {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-top: 15px;
}

.subject {
    background: rgba(255,255,255,0.05);
    padding: 15px;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    border: 2px solid #670f22;
    transition: 0.3s;
}

/* ========= RESET ========= */
function resetearMaterias(){
    if(confirm("¿Reiniciar materias y puntos?")){
.subject:hover {
    background: #670f22;
    color: white;
    transform: scale(1.05);
}

        // borrar materias
        localStorage.removeItem("todaySubjects");
/* PROGRESO */
.progress-bar {
    background: rgba(255,255,255,0.1);
    height: 20px;
    border-radius: 10px;
    margin-top: 10px;
}

        // 🔥 borrar puntos también
        localStorage.removeItem("puntos");
#progress {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #ffffff, #670f22);
    border-radius: 10px;
}

        // limpiar control de duplicados
        Object.keys(localStorage).forEach(key => {
            if(key.startsWith("sumado_")){
                localStorage.removeItem(key);
            }
        });
/* CALENDARIO */
#calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px;
    margin-top: 10px;
}

        location.reload();
    }
/* DIAS SEMANA */
.diaTitulo {
    text-align: center;
    font-weight: bold;
    color: #ff4d4d;
}
function resetearTodo(){

    let pass = prompt("🔒 Ingresa la contraseña:");
/* DIAS */
.day {
    background: rgba(255,0,0,0.15); /* rojo claro */
    padding: 12px;
    border-radius: 8px;
    text-align: center;
    border: 1px solid #ff0000;
    font-weight: bold;
    transition: 0.2s;
}

    if(pass === null) return;
.day:hover {
    background: #ff0000;
    color: white;
}

    const clave = "1234";
/* HOY */
.today {
    border: 3px solid #ffffff;
    background: #ff0000;
    color: white;
}

    if(pass !== clave){
        alert("❌ Incorrecta");
        return;
    }
/* PROGRESO COLORES */
.red { background: #ff0000; }
.yellow { background: #ffcc00; }
.green { background: #00c853; }

/* PUNTOS */
.score-box {
    background: rgba(255,255,255,0.05);
    border: 2px solid #670f22;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    font-size: 18px;
    margin-bottom: 10px;
}

    if(confirm("⚠️ ¿Borrar TODO?")){
/* TIENDA */
.tienda-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
}

        localStorage.clear();
.mini-card {
    background: rgba(103,15,34,0.6);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 15px;
    text-align: center;
    box-shadow: 0px 5px 20px rgba(0,0,0,0.5);
}

        location.reload();
    }
.mini-card p {
    color: #ddd;
}
