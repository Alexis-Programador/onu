const puntosSpan = document.getElementById("puntosTienda");
let puntos = parseInt(localStorage.getItem("puntos")) || 0;

puntosSpan.textContent = puntos;

const botones = document.querySelectorAll("button");

botones.forEach(btn => {

const costo = parseInt(btn.dataset.costo);

if(puntos < costo){
btn.disabled = true;
}

btn.addEventListener("click", () => {

if(puntos < costo){
alert("❌ No tienes suficientes puntos");
return;
}

const nombre = btn.dataset.nombre;

if(confirm("¿Seguro que quieres canjear " + nombre + "?")){
puntos -= costo;
localStorage.setItem("puntos", puntos);
guardarHistorial(nombre);
alert("🎉 Canjeaste: " + nombre);
location.reload();
}

});

});

function guardarHistorial(recompensa){

let historial = JSON.parse(localStorage.getItem("historial")) || [];
historial.push({
nombre: recompensa,
fecha: new Date().toLocaleDateString()
});
localStorage.setItem("historial", JSON.stringify(historial));
}
