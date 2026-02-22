const subjects = document.querySelectorAll(".subject");
const calendar = document.getElementById("calendar");
const pointsDisplay = document.getElementById("points");
const progressBar = document.getElementById("progress");


/* PUNTOS */

let puntos =
parseInt(localStorage.getItem("puntos")) || 0;

pointsDisplay.textContent = puntos;


/* FECHA */

const today = new Date();

let currentDay = today.getDate();
const month = today.getMonth();
const year = today.getFullYear();


const todayKey =
`day-${year}-${month}-${currentDay}`;


/* MATERIAS HECHAS */

let completedToday =
JSON.parse(localStorage.getItem("todaySubjects")) || [];


/* BLOQUEAR MATERIA */

function bloquearMateria(subject){

subject.style.pointerEvents="none";

subject.style.opacity="0.6";

}


/* CLICK MATERIAS */

subjects.forEach((subject,index)=>{

if(completedToday.includes(index))
bloquearMateria(subject);


subject.addEventListener("click",()=>{

if(completedToday.includes(index))
return;

/* GUARDAR MATERIA */

localStorage.setItem(
"materiaActual",
subject.dataset.materia
);

/* IR AL QUIZ */

window.location.href="quiz.html";

});

});


/* PROGRESO */

function actualizarProgreso(){

const hechas=
completedToday.length;

const total=
subjects.length;

const porcentaje=
(hechas/total)*100;


progressBar.style.width=
porcentaje+"%";


actualizarColorDiaActual();

}



/* COLOR DIA */

function actualizarColorDiaActual(){

const hechas=
completedToday.length;

const dayDivs=
document.querySelectorAll(".day");


dayDivs.forEach(day=>{

if(parseInt(day.textContent)===currentDay){

day.classList.remove(
"red",
"yellow",
"green"
);


if(hechas>=9)
day.classList.add("green");


else if(hechas>=3)
day.classList.add("yellow");


else if(hechas>=1)
day.classList.add("red");

}

});

}



/* GUARDAR DIA */

function evaluarDia(){

if(localStorage.getItem(todayKey))
return;


const hechas=
completedToday.length;


let estado="red";


if(hechas>=9){

estado="green";

puntos+=10;

}

else if(hechas>=3){

estado="yellow";

puntos+=5;

}


localStorage.setItem(
todayKey,
estado
);


localStorage.setItem(
"puntos",
puntos
);


pointsDisplay.textContent=puntos;


localStorage.removeItem(
"todaySubjects");

}



/* CALENDARIO REAL */

function generarCalendario(){

calendar.innerHTML="";


const diasSemana=[
"L","M","M","J","V","S","D"
];


/* TITULOS */

diasSemana.forEach(dia=>{

const div=document.createElement("div");

div.classList.add("diaTitulo");

div.textContent=dia;

calendar.appendChild(div);

});


const primerDia=
new Date(year,month,1).getDay();


const diasMes=
new Date(year,month+1,0).getDate();


let espacios=
primerDia===0?6:primerDia-1;


/* ESPACIOS VACIOS */

for(let i=0;i<espacios;i++){

const vacio=
document.createElement("div");

calendar.appendChild(vacio);

}


/* DIAS */

for(let i=1;i<=diasMes;i++){

const dayDiv=
document.createElement("div");

dayDiv.classList.add("day");

dayDiv.textContent=i;


if(i===currentDay)
dayDiv.classList.add("today");


const key=
`day-${year}-${month}-${i}`;

const estado=
localStorage.getItem(key);


if(estado)
dayDiv.classList.add(estado);


calendar.appendChild(dayDiv);

}


actualizarColorDiaActual();

}



/* RESET SOLO MATERIAS */

function resetearMaterias(){

if(confirm("Reiniciar materias del día?")){


localStorage.removeItem("todaySubjects");

completedToday=[];


subjects.forEach(s=>{

s.style.pointerEvents="auto";

s.style.opacity="1";

});


actualizarProgreso();

alert("Materias reiniciadas");

}

}



/* RESET TOTAL */

function resetearTodo(){

if(confirm("Borrar TODO el progreso?")){

localStorage.clear();

location.reload();

}

}



/* CAMBIO DIA AUTOMATICO */

setInterval(()=>{

const now=new Date();

if(now.getDate()!==currentDay){

evaluarDia();

location.reload();

}

},60000);



/* INICIAR */

generarCalendario();

actualizarProgreso();