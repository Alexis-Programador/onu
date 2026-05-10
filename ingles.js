const preguntas = [

{
    pregunta:
    "What is the translation of 'Hola'?",

    opciones: [
    "Goodbye",
    "Hello",
    "Thanks",
    "Please"
    ],

    correcta: "Hello"
},

{
    pregunta:
    "Choose the correct color:",

    opciones: [
    "Dog",
    "Blue",
    "Run",
    "Apple"
    ],

    correcta: "Blue"
},

{
    pregunta:
    "What does 'Cat' mean?",

    opciones: [
    "Perro",
    "Casa",
    "Gato",
    "Mesa"
    ],

    correcta: "Gato"
},

{
    pregunta:
    "Complete: I ___ a student",

    opciones: [
    "is",
    "am",
    "are",
    "be"
    ],

    correcta: "am"
},

{
    pregunta:
    "Which word is a fruit?",

    opciones: [
    "Banana",
    "Chair",
    "Window",
    "Car"
    ],

    correcta: "Banana"
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

let puntosGuardados = false;

/* VIDAS */

function actualizarVidas(){

    vidasHTML.innerHTML = "";

    for(let i = 0; i < vidas; i++){

        vidasHTML.innerHTML += "❤️ ";

    }

}

/* MEZCLAR */

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

/* CARGAR */

function cargarPregunta(){

    respondido = false;

    feedback.style.display = "none";

    const actual =
    preguntas[preguntaActual];

    questionNumber.textContent =
    `Question ${preguntaActual + 1} of ${preguntas.length}`;

    preguntaTexto.textContent =
    actual.pregunta;

    opcionesHTML.innerHTML = "";

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
                "✅ Correct!";

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
                "❌ Incorrect";

                feedback.style.background =
                "#fee2e2";

                feedback.style.color =
                "#991b1b";

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

/* CONTINUE */

nextBtn.addEventListener("click", ()=>{

    if(!respondido) return;

    preguntaActual++;

    if(
        preguntaActual >= preguntas.length
    ){

        terminarQuiz(true);

        return;
    }

    cargarPregunta();

});

/* TERMINAR */

function terminarQuiz(gano){

    opcionesHTML.innerHTML = "";

    feedback.style.display =
    "block";

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

        if(!puntosGuardados){

            puntosActuales += xp;

            localStorage.setItem(
            "puntos",
            puntosActuales
            );

            puntosGuardados = true;

        }

        preguntaTexto.textContent =
        "🎉 Quiz Completed!";

        feedback.innerHTML =

        `
        🏆 XP Earned: ${xp}
        <br><br>
        ⭐ Total Points:
        ${puntosActuales}
        `;

        feedback.style.background =
        "#dcfce7";

        feedback.style.color =
        "#166534";

    }

    else{

        preguntaTexto.textContent =
        "💀 You ran out of lives";

        feedback.innerHTML =
        "❌ You earned no points";

        feedback.style.background =
        "#fee2e2";

        feedback.style.color =
        "#991b1b";

    }

    nextBtn.innerHTML =
    "🏠 Return to Home";

    nextBtn.onclick = ()=>{

        window.location.href =
        "loggin.html";

    };

}

/* SALIR */

function salirQuiz(){

    window.location.href =
    "loggin.html";

}

/* INICIAR */

actualizarVidas();

cargarPregunta();
