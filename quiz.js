const tituloMateria = document.getElementById("tituloMateria");
const preguntaTexto = document.getElementById("pregunta");
const respuestasDiv = document.getElementById("respuestas");

/* MATERIA SELECCIONADA */

const materia = localStorage.getItem("materiaActual");

tituloMateria.textContent = materia;


/* BASE DE PREGUNTAS */

const preguntas = {

"Matemáticas":[

{
pregunta:"¿Cuánto es 5 + 3?",
opciones:["6","7","8","9"],
correcta:2
},

{
pregunta:"¿Cuánto es 10 x 2?",
opciones:["10","20","15","25"],
correcta:1
}

],


"Español":[

{
pregunta:"¿Cuál es un sustantivo?",
opciones:["Correr","Casa","Bonito","Rápido"],
correcta:1
},

{
pregunta:"¿Cuál es un verbo?",
opciones:["Mesa","Saltar","Rojo","Grande"],
correcta:1
}

],


"Inglés":[

{
pregunta:"¿Cómo se dice 'Perro' en inglés?",
opciones:["Dog","Cat","House","Food"],
correcta:0
},

{
pregunta:"¿Qué significa 'Hello'?",
opciones:["Adiós","Gracias","Hola","Casa"],
correcta:2
}

],


"Historia":[

{
pregunta:"¿Quién descubrió América?",
opciones:["Napoleón","Cristóbal Colón","Hidalgo","Juárez"],
correcta:1
},

{
pregunta:"¿En qué año fue la Independencia de México?",
opciones:["1810","1910","2010","1710"],
correcta:0
}

],


"Programación":[

{
pregunta:"¿Qué significa HTML?",
opciones:[
"Lenguaje de programación",
"Lenguaje de marcado",
"Base de datos",
"Sistema operativo"
],
correcta:1
},

{
pregunta:"¿Para qué sirve JavaScript?",
opciones:[
"Hacer páginas dinámicas",
"Pintar paredes",
"Cocinar",
"Hacer videos"
],
correcta:0
}

],


"Ciencias":[

{
pregunta:"¿Cuál es el planeta donde vivimos?",
opciones:[
"Marte",
"Tierra",
"Venus",
"Júpiter"
],
correcta:1
},

{
pregunta:"¿Qué necesitamos para respirar?",
opciones:[
"Agua",
"Aire",
"Fuego",
"Tierra"
],
correcta:1
}

],


"Física":[

{
pregunta:"¿Qué mide la velocidad?",
opciones:[
"Distancia",
"Tiempo",
"Distancia y tiempo",
"Peso"
],
correcta:2
},

{
pregunta:"¿Qué fuerza nos mantiene en el suelo?",
opciones:[
"Magnetismo",
"Gravedad",
"Luz",
"Calor"
],
correcta:1
}

],


"Geografía":[

{
pregunta:"¿Cuál es el continente donde está México?",
opciones:[
"Europa",
"Asia",
"América",
"África"
],
correcta:2
},

{
pregunta:"¿Qué es un océano?",
opciones:[
"Río pequeño",
"Gran masa de agua",
"Montaña",
"Desierto"
],
correcta:1
}

],


"Arte":[

{
pregunta:"¿Qué se usa para pintar?",
opciones:[
"Pincel",
"Martillo",
"Cuchillo",
"Taladro"
],
correcta:0
},

{
pregunta:"¿Qué es una escultura?",
opciones:[
"Pintura",
"Figura en 3D",
"Canción",
"Libro"
],
correcta:1
}

],


"Educación Física":[

{
pregunta:"¿Qué mejora el ejercicio?",
opciones:[
"Salud",
"Sueño",
"Comida",
"Televisión"
],
correcta:0
},

{
pregunta:"¿Cuál es un deporte?",
opciones:[
"Fútbol",
"Dormir",
"Leer",
"Comer"
],
correcta:0
}

]

};



/* VERIFICAR QUE EXISTA MATERIA */

if(!preguntas[materia]){

preguntaTexto.textContent="Error: materia no encontrada";

}


/* PREGUNTA ALEATORIA */

const lista = preguntas[materia];

const actual =
lista[Math.floor(Math.random()*lista.length)];

preguntaTexto.textContent =
actual.pregunta;


/* MOSTRAR RESPUESTAS */

actual.opciones.forEach((resp,i)=>{

const label = document.createElement("label");

label.innerHTML =
`<input type="radio" name="respuesta" value="${i}">
 ${resp}`;

respuestasDiv.appendChild(label);

respuestasDiv.appendChild(
document.createElement("br")
);

});


/* VERIFICAR RESPUESTA */

function verificar(){

const seleccion =
document.querySelector(
"input[name='respuesta']:checked"
);

if(!seleccion){

alert("Selecciona una respuesta");

return;

}


if(parseInt(seleccion.value)===actual.correcta){

alert("Correcto 🎉");


localStorage.setItem(
"materiaCompletada",
materia
);


window.location.href="index.html";

}

else{

alert("Incorrecto ❌");

}

}