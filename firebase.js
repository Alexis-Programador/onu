// FIREBASE

import { initializeApp }

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

getDatabase,
ref,
set

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

/* CONFIG */

const firebaseConfig = {

apiKey:
"AIzaSyDSExbNQt2glE3uPIYIESbpR-WMyG2ts0M",

authDomain:
"act23-547b9.firebaseapp.com",

databaseURL:
"https://act23-547b9-default-rtdb.firebaseio.com",

projectId:
"act23-547b9",

storageBucket:
"act23-547b9.firebasestorage.app",

messagingSenderId:
"329465558346",

appId:
"1:329465558346:web:0f7667ed31a03c0589fdb3",

measurementId:
"G-EGM9LDP2HC"

};

/* APP */

const app =
initializeApp(firebaseConfig);

const db =
getDatabase(app);

/* ID UNICO */

let userID =

localStorage.getItem(
"userID"
);

if(!userID){

userID =

"USER_" +

Math.floor(
Math.random()*9999999
);

localStorage.setItem(
"userID",
userID
);

}

/* EMAIL */

let email =

localStorage.getItem(
"email"
) || "Sin correo";

/* DATOS */

let puntos =

parseInt(
localStorage.getItem(
"puntos"
)
) || 0;

let racha =

parseInt(
localStorage.getItem(
"racha"
)
) || 0;

/* MATERIAS */

const materias = [

"Matemáticas",
"Español",
"Inglés",
"Historia",
"Programación",
"Ciencias"

];

/* CALCULAR PORCENTAJE */

let totalPorcentaje = 0;

materias.forEach(materia=>{

const correctas =

parseInt(

localStorage.getItem(
materia + "_correctas"
)

) || 0;

const incorrectas =

parseInt(

localStorage.getItem(
materia + "_incorrectas"
)

) || 0;

const total =

correctas + incorrectas;

let porcentaje = 0;

if(total > 0){

porcentaje =

Math.floor(

(correctas / total)
* 100

);

}

totalPorcentaje += porcentaje;

});

/* PROMEDIO */

const promedioGeneral =

Math.floor(

totalPorcentaje /
materias.length

);

/* ENVIAR */

set(

ref(
db,
"usuarios/" + userID
),

{

id:userID,

correo:email,

puntos:puntos,

racha:racha,

promedio:promedioGeneral,

fecha:
new Date().toLocaleString()

}

);

console.log(
"🔥 Datos enviados"
);