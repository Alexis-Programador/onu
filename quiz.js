const preguntas = [

{
    pregunta: "¿Cuánto es 8 × 4?",
    opciones: ["12","32","18","24"],
    correcta: "32"
},

{
    pregunta: "¿Cuánto es 10 + 5?",
    opciones: ["20","30","15","50"],
    correcta: "15"
},

{
    pregunta: "¿Cuánto es 9 - 3?",
    opciones: ["6","5","8","2"],
    correcta: "6"
},

{
    pregunta: "¿Cuánto es 6 × 6?",
    opciones: ["12","18","36","20"],
    correcta: "36"
},

{
    pregunta: "¿Cuánto es 100 ÷ 10?",
    opciones: ["5","20","10","50"],
    correcta: "10"
}

];

/* ELEMENTOS */

const preguntaTexto =
document.getElementById("pregunta");

const opcionesHTML =
document.querySelector(".options");

const feedback =
document.querySelector(".feedback");

const xpText =
document.getElementById("xp");

const nextBtn =
document.querySelector(".next-btn");

const questionNumber =
document.querySelector(".question-number");

const vidasHTML =
document.querySelector(".vidas");

/* VARIABLES */

let preguntaActual = 0;

let xp = 0;

let vidas = 3;

let respondido = false;

/* EVITAR DUPLICAR PUNTOS */

let puntosGuardados = false;

/* VIDAS */

function actualizarVidas(){

    vidasHTML.innerHTML = "";

    for(let i = 0; i < vidas; i++){

        vidasHTML.innerHTML += "❤️ ";

    }

}

/* MEZCLAR OPCIONES */

function mezclarArray(array){

    for(
        let i = array.length - 1;
        i > 0;
        i--
    ){

        const j =
        Math.floor(
        Math.random() * (i + 1)
        );

        [array[i], array[j]] =
        [array[j], array[i]];
    }

    return array;
}

/* CARGAR PREGUNTA */

function cargarPregunta(){

    respondido = false;

    feedback.style.display = "none";

    const actual =
    preguntas[preguntaActual];

    questionNumber.textContent =
    `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;

    preguntaTexto.textContent =
    actual.pregunta;

    opcionesHTML.innerHTML = "";

    /* MEZCLAR OPCIONES */

    const opcionesMezcladas =

    mezclarArray(
    [...actual.opciones]
    );

    opcionesMezcladas.forEach(opcion => {

        const boton =
        document.createElement("button");

        boton.classList.add("option");

        boton.textContent = opcion;

        boton.addEventListener("click", ()=>{

            if(respondido) return;

            respondido = true;

            /* CORRECTA */

            if(opcion === actual.correcta){

                boton.style.background =
                "#10b981";

                boton.style.color =
                "white";

                xp += 10;

                xpText.textContent = xp;

                feedback.style.display =
                "block";

                feedback.innerHTML =
                "✅ ¡Correcto! Ganaste 10 XP";

                feedback.style.background =
                "#dcfce7";

                feedback.style.color =
                "#166534";

            }

            /* INCORRECTA */

            else{

                vidas--;

                actualizarVidas();

                boton.style.background =
                "#ef4444";

                boton.style.color =
                "white";

                feedback.style.display =
                "block";

                feedback.innerHTML =
                "❌ Incorrecto";

                feedback.style.background =
                "#fee2e2";

                feedback.style.color =
                "#991b1b";

                /* MOSTRAR CORRECTA */

                const botones =
                document.querySelectorAll(".option");

                botones.forEach(btn => {

                    if(
                        btn.textContent ===
                        actual.correcta
                    ){

                        btn.style.background =
                        "#10b981";

                        btn.style.color =
                        "white";

                    }

                });

                /* SIN VIDAS */

                if(vidas <= 0){

                    xp = 0;

                    xpText.textContent = xp;

                    setTimeout(()=>{

                        terminarQuiz(false);

                    },1000);

                }

            }

        });

        opcionesHTML.appendChild(boton);

    });

}

/* CONTINUAR */

nextBtn.addEventListener("click", ()=>{

    if(!respondido) return;

    preguntaActual++;

    /* TERMINO QUIZ */

    if(
        preguntaActual >= preguntas.length
    ){

        terminarQuiz(true);

        return;
    }

    cargarPregunta();

});

/* TERMINAR QUIZ */

function terminarQuiz(gano){

    opcionesHTML.innerHTML = "";

    feedback.style.display =
    "block";

    /* SI GANO */

    if(gano){

         /* MARCAR QUIZ COMPLETADO */

    localStorage.setItem(
    "quizCompletado",
    "true"
    );
        
        let puntosActuales =

        parseInt(
        localStorage.getItem("puntos")
        ) || 0;

        /* GUARDAR SOLO UNA VEZ */

        if(!puntosGuardados){

            puntosActuales += xp;

            localStorage.setItem(
            "puntos",
            puntosActuales
            );

            puntosGuardados = true;

        }

        preguntaTexto.textContent =
        "🎉 ¡Quiz completado!";

        feedback.innerHTML =

        `
        🏆 XP Ganado: ${xp}
        <br><br>
        ⭐ Puntos Totales:
        ${puntosActuales}
        `;

        feedback.style.background =
        "#dcfce7";

        feedback.style.color =
        "#166534";

    }

    /* SI PIERDE */

    else{

        preguntaTexto.textContent =
        "💀 Te quedaste sin vidas";

        feedback.innerHTML =
        "❌ No ganaste puntos";

        feedback.style.background =
        "#fee2e2";

        feedback.style.color =
        "#991b1b";

    }

    /* BOTON FINAL */

    nextBtn.innerHTML =
    "🏠 Regresar al inicio";

    nextBtn.style.display =
    "block";

    nextBtn.onclick = ()=>{

        window.location.href =
        "loggin.html";

    };

}

/* BOTON SALIR */

function salirQuiz(){

    window.location.href =
    "loggin.html";

}

/* INICIAR */

actualizarVidas();

cargarPregunta();
