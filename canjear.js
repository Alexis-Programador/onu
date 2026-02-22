// Cargar puntos actuales
let puntos = parseInt(localStorage.getItem("puntos")) || 0;
const puntosTienda = document.getElementById("puntosTienda");
puntosTienda.textContent = puntos;

// Seleccionamos todos los botones de canje
const botones = document.querySelectorAll(".mini-card button");

botones.forEach(btn => {
    btn.addEventListener("click", () => {
        const costo = parseInt(btn.dataset.costo);
        const nombre = btn.dataset.nombre;

        if (puntos >= costo) {
            puntos -= costo;
            localStorage.setItem("puntos", puntos);
            puntosTienda.textContent = puntos;
            alert(`¡Has canjeado "${nombre}" por ${costo} puntos!`);
        } else {
            alert("No tienes suficientes puntos");
        }
    });
});