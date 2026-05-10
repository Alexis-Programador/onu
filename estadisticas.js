/* MATERIAS */

const materias = [

"Matemáticas",
"Español",
"Inglés",
"Historia",
"Programación",
"Ciencias"

];

/* CONTENEDOR */

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

/* GENERAR DATOS */

let total = 0;

let mejores = [];

let peores = [];

materias.forEach(materia=>{

/* SIMULACION */

const porcentaje =

Math.floor(
Math.random()*100
);

total += porcentaje;

/* MEJORES */

if(porcentaje >= 80){

mejores.push(materia);

}

/* PEORES */

if(porcentaje <= 50){

peores.push(materia);

}

/* CREAR HTML */

materiasStats.innerHTML +=

`
<div class="materia">

<div class="materia-top">

<span>${materia}</span>

<span>${porcentaje}%</span>

</div>

<div class="barra">

<div class="progreso"
style="width:${porcentaje}%">

</div>

</div>

</div>
`;

});

/* PROMEDIO */

const promedio =

Math.floor(
total / materias.length
);

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

"📈 Tu rendimiento general es bueno. ";

/* MEJORES */

if(mejores.length > 0){

texto +=

`🔥 Destacas en:
${mejores.join(", ")}. `;

}

/* PEORES */

if(peores.length > 0){

texto +=

`📚 Necesitas mejorar en:
${peores.join(", ")}.`;

}

iaTexto.textContent = texto;