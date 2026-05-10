const preguntas = [

{
pregunta:
"¿Qué planeta es el más grande?",

opciones:[
"Júpiter",
"Tierra",
"Marte",
"Venus"
],

correcta:"Júpiter"
},

{
pregunta:
"¿Qué necesitan las plantas?",

opciones:[
"Agua",
"Gasolina",
"Plástico",
"Arena"
],

correcta:"Agua"
},

{
pregunta:
"¿Qué órgano bombea sangre?",

opciones:[
"Corazón",
"Hígado",
"Pulmón",
"Ojo"
],

correcta:"Corazón"
},

{
pregunta:
"¿Cuál es el símbolo del agua?",

opciones:[
"H2O",
"CO2",
"O2",
"Na"
],

correcta:"H2O"
},

{
pregunta:
"¿Qué animal es mamífero?",

opciones:[
"Delfín",
"Pez",
"Gallina",
"Lagarto"
],

correcta:"Delfín"
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

/* MATERIA ACTUAL */

let materiaActual =

localStorage.getItem(
"materiaActual"
) || "ciencias";

/* VIDAS */

function actualizarVidas(){

vidasHTML.innerHTML = "";

for(let i=0;i<vidas;i++){

vidasHTML.innerHTML += "❤️ ";

}

}

/* MEZCLAR */

function mezclarArray(array){

for(let i=array.length-1;i>0;i--){

const j =
Math.floor(Math.random()*(i+1));

[array[i],array[j]] =
[array[j],array[i]];

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
`Pregunta ${preguntaActual+1} de ${preguntas.length}`;

preguntaTexto.textContent =
actual.pregunta;

opcionesHTML.innerHTML = "";

const opcionesMezcladas =
mezclarArray([...actual.opciones]);

opcionesMezcladas.forEach(opcion=>{

const boton =
document.createElement("button");

boton.classList.add("option");

boton.textContent = opcion;

boton.addEventListener("click",()=>{

if(respondido) return;

respondido = true;

/* CORRECTA */

if(opcion===actual.correcta){

/* GUARDAR CORRECTAS */

let correctas =

parseInt(
localStorage.getItem(
materiaActual + "_correctas"
)
) || 0;

correctas++;

localStorage.setItem(

materiaActual + "_correctas",

correctas

);

boton.style.background="#10b981";

boton.style.color="white";

xp += 10;

xpText.textContent = xp;

feedback.style.display="block";

feedback.innerHTML =
"✅ ¡Correcto!";

feedback.style.background="#dcfce7";

feedback.style.color="#166534";

}

/* INCORRECTA */

else{

/* GUARDAR INCORRECTAS */

let incorrectas =

parseInt(
localStorage.getItem(
materiaActual + "_incorrectas"
)
) || 0;

incorrectas++;

localStorage.setItem(

materiaActual + "_incorrectas",

incorrectas

);

vidas--;

actualizarVidas();

boton.style.background="#ef4444";

boton.style.color="white";

feedback.style.display="block";

feedback.innerHTML =
"❌ Incorrecto";

feedback.style.background="#fee2e2";

feedback.style.color="#991b1b";

/* MOSTRAR CORRECTA */

const botones =
document.querySelectorAll(".option");

botones.forEach(btn=>{

if(
btn.textContent===
actual.correcta
){

btn.style.background="#10b981";

btn.style.color="white";

}

});

/* SIN VIDAS */

if(vidas<=0){

xp=0;

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

nextBtn.addEventListener("click",()=>{

if(!respondido) return;

preguntaActual++;

if(
preguntaActual>=preguntas.length
){

terminarQuiz(true);

return;

}

cargarPregunta();

});

/* TERMINAR */

function terminarQuiz(gano){

opcionesHTML.innerHTML="";

feedback.style.display="block";

/* SI GANO */

if(gano){

/* MARCAR COMPLETADO */

localStorage.setItem(
"quizCompletado",
"true"
);

let puntosActuales =

parseInt(
localStorage.getItem("puntos")
)||0;

/* GUARDAR PUNTOS */

if(!puntosGuardados){

puntosActuales += xp;

localStorage.setItem(
"puntos",
puntosActuales
);

puntosGuardados=true;

}

preguntaTexto.textContent =
"🎉 ¡Quiz completado!";

feedback.innerHTML =
`
🏆 XP: ${xp}
<br><br>
⭐ Total:
${puntosActuales}
`;

feedback.style.background="#dcfce7";

feedback.style.color="#166534";

}

/* SI PIERDE */

else{

preguntaTexto.textContent =
"💀 Te quedaste sin vidas";

feedback.innerHTML =
"❌ No ganaste puntos";

feedback.style.background="#fee2e2";

feedback.style.color="#991b1b";

}

/* BOTON FINAL */

nextBtn.innerHTML =
"🏠 Regresar";

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
