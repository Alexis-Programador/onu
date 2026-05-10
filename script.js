/* ========= RACHA ========= */

let racha =

parseInt(
localStorage.getItem("racha")
) || 0;

let puntos = 0;

let completedToday = [];

document.addEventListener("DOMContentLoaded", () => {

    const subjects =
    document.querySelectorAll(".subject");

    const calendar =
    document.getElementById("calendar");

    const progressBar =
    document.getElementById("progress");

    const pointsElement =
    document.getElementById("points");

    const streakElement =
    document.getElementById("racha");

    if(!subjects.length) return;

    /* ========= MOSTRAR RACHA ========= */

    if(streakElement){

        streakElement.textContent =
        racha;

    }

    /* ========= PUNTOS ========= */

    puntos =

    parseInt(
    localStorage.getItem("puntos")
    ) || 0;

    pointsElement.textContent =
    puntos;

    /* ========= FECHA ========= */

    const today = new Date();

    const fechaHoy =

    `${today.getFullYear()}-${
    today.getMonth()+1}-${
    today.getDate()}`;

    /* ========= REVISAR DIA ========= */

    const ultimaFecha =

    localStorage.getItem("ultimaFecha");

    /* NUEVO DIA */

    if(ultimaFecha !== fechaHoy){

        localStorage.removeItem(
        "todaySubjects"
        );

        localStorage.setItem(
        "ultimaFecha",
        fechaHoy
        );

    }

    /* ========= CARGAR MATERIAS ========= */

    completedToday =

    JSON.parse(
    localStorage.getItem(
    "todaySubjects"
    )) || [];

    /* ========= BLOQUEAR ========= */

    function bloquearMateria(subject){

        subject.style.pointerEvents =
        "none";

        subject.style.opacity =
        "0.5";

        subject.style.filter =
        "grayscale(100%)";

        subject.innerHTML +=
        "<br>✅ Completado";
    }

    /* ========= MATERIAS ========= */

    subjects.forEach((subject,index)=>{

        if(
            completedToday.includes(index)
        ){

            bloquearMateria(subject);

        }

        subject.addEventListener("click",()=>{

            if(
                completedToday.includes(index)
            ) return;

            localStorage.setItem(
            "materiaActual",
            subject.dataset.materia
            );

            localStorage.setItem(
            "materiaIndex",
            index
            );

            const materia =

            subject.dataset.materia
            .trim()
            .toLowerCase();

            const paginas = {

                "matemáticas":
                "matematicas.html",

                "español":
                "espanol.html",

                "inglés":
                "ingles.html",

                "historia":
                "historia.html",

                "programación":
                "programacion.html",

                "ciencias":
                "ciencias.html"

            };

            window.location.href =

            paginas[materia] ||
            "materias.html";

        });

    });

    /* ========= PROGRESO ========= */

    function actualizarProgreso(){

        let porcentaje =

        (
        completedToday.length /
        subjects.length
        ) * 100;

        progressBar.style.width =
        porcentaje + "%";
    }

    /* ========= CALENDARIO ========= */

    function generarCalendario(){

        calendar.innerHTML = "";

        const diasSemana =
        ["L","M","Mi","J","V","S","D"];

        diasSemana.forEach(d=>{

            let div =
            document.createElement("div");

            div.className =
            "diaTitulo";

            div.textContent = d;

            calendar.appendChild(div);

        });

        let primerDia =

        new Date(
        today.getFullYear(),
        today.getMonth(),
        1
        ).getDay();

        primerDia =
        primerDia === 0
        ? 7
        : primerDia;

        let espacios =
        primerDia - 1;

        const diasMes =

        new Date(
        today.getFullYear(),
        today.getMonth()+1,
        0
        ).getDate();

        for(let i=0;i<espacios;i++){

            calendar.appendChild(
            document.createElement("div")
            );

        }

        for(let i=1;i<=diasMes;i++){

            let day =
            document.createElement("div");

            day.className = "day";

            day.textContent = i;

            if(
                i === today.getDate()
            ){

                day.classList.add(
                "today"
                );

            }

            calendar.appendChild(day);

        }

    }

    /* ========= QUIZ COMPLETADO ========= */

    if(
        localStorage.getItem(
        "quizCompletado"
        ) === "true"
    ){

        const index =

        parseInt(
        localStorage.getItem(
        "materiaIndex"
        ));

        if(
            !isNaN(index)
            &&
            !completedToday.includes(index)
        ){

            completedToday.push(index);

            localStorage.setItem(

            "todaySubjects",

            JSON.stringify(
            completedToday
            )

            );

            actualizarProgreso();

        }

        localStorage.removeItem(
        "quizCompletado"
        );

    }

    /* ========= COMPLETÓ TODO ========= */

    if(
        completedToday.length ===
        subjects.length
    ){

        const hoy =

        new Date()
        .toDateString();

        const ultimaRacha =

        localStorage.getItem(
        "ultimaRacha"
        );

        /* EVITAR DUPLICAR */

        if(ultimaRacha !== hoy){

            racha++;

            localStorage.setItem(
            "racha",
            racha
            );

            localStorage.setItem(
            "ultimaRacha",
            hoy
            );

            /* ACTUALIZAR UI */

            if(streakElement){

                streakElement.textContent =
                racha;

            }

            /* ALERTA */

            alert(

            "🔥 ¡Racha aumentada!\n\n" +

            "Llevas " +

            racha +

            " días seguidos"

            );

        }

    }

    generarCalendario();

    actualizarProgreso();

});

/* ========= RESET ========= */

function resetearTodo(){

    let pass = prompt(
    "🔒 Ingresa la contraseña:"
    );

    if(pass === null) return;

    const clave = "1234";

    if(pass !== clave){

        alert("❌ Incorrecta");

        return;
    }

    if(
        confirm("⚠️ ¿Borrar TODO?")
    ){

        localStorage.clear();

        location.reload();

    }

}
