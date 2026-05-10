/* MATERIAS */

const materias = [

"Matemáticas",
"Español",
"Inglés",
"Historia",
"Programación",
"Ciencias"

];

/* CONTENEDORES */

const materiasStats =

document.getElementById(
"materiasStats"
);

const porcentajeHTML =

document.getElementById(
"porcentaje"
);

const iaTexto =

document.getElementById(
"iaTexto"
);

/* VARIABLES */

let totalPorcentaje = 0;

let mejores = [];

let peores = [];

/* GENERAR ESTADISTICAS REALES */

materias.forEach(materia=>{

/* LEER DATOS */

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

/* TOTAL RESPUESTAS */

const total =

correctas + incorrectas;

/* PORCENTAJE */

let porcentaje = 0;

if(total > 0){

porcentaje = Math.floor(

(correctas / total) * 100

);

}

/* SUMAR */

totalPorcentaje += porcentaje;

/* MEJORES */

if(porcentaje >= 80){

mejores.push(materia);

}

/* PEORES */

if(
porcentaje <= 50
&&
total > 0
){

peores.push(materia);

}

/* CREAR HTML */

materiasStats.innerHTML +=

`
<div class="materia">

<div class="materia-top">

<span>

${materia.toUpperCase()}

</span>

<span>

${porcentaje}%

</span>

</div>

<div class="barra">

<div class="progreso"
style="width:${porcentaje}%">

</div>

</div>

<br>

<small>

✅ Correctas:
${correctas}

&nbsp;&nbsp;&nbsp;

❌ Incorrectas:
${incorrectas}

</small>

</div>
`;

});

/* PROMEDIO GENERAL */

const promedio =

Math.floor(
totalPorcentaje /
materias.length
);

/* TEXTO CIRCULO */

porcentajeHTML.textContent =
`${promedio}%`;

/* CIRCULO */

const grados =

(promedio / 100) * 360;

document.querySelector(".circle")
.style.background =

`conic-gradient(
#10b981 0deg,
#10b981 ${grados}deg,
#dcfce7 ${grados}deg
)`;

/* IA TEXTO */

let texto =

"📈 Analizando rendimiento académico... ";

/* MEJORES */

if(mejores.length > 0){

texto +=

`🔥 Vas muy bien en:
${mejores.join(", ")}. `;

}

/* PEORES */

if(peores.length > 0){

texto +=

`📚 Necesitas practicar más:
${peores.join(", ")}.`;

}

/* SI NO HAY DATOS */

if(
mejores.length === 0
&&
peores.length === 0
){

texto =

"🚀 Completa quizzes para generar estadísticas reales.";

}

iaTexto.textContent = texto;
