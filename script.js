body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background: url("Ac.jpg") no-repeat center center/cover;
    color: #ffffff;
}

/* HEADER */
header {
    background: rgba(103,15,34,0.85); /* #670f22 */
    backdrop-filter: blur(12px);
    padding: 20px;
    text-align: center;
    border-bottom: 2px solid #ffffff33;
}

/* LOGO */
.logo {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}

.logo img {
    width: 85px;
    height: 85px;
    border-radius: 50%;
    border: 3px solid #ffffff;
}

/* CONTENEDOR */
.container {
    display: flex;
    gap: 20px;
    padding: 20px;
}

/* COLUMNAS */
.left { width: 60%; }
.right { width: 40%; }

/* CARD */
.card {
    background: rgba(103,15,34,0.6);
    backdrop-filter: blur(12px);
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 20px;
    box-shadow: 0px 5px 25px rgba(0,0,0,0.5);
    border: 1px solid #ffffff22;
}

/* BOTONES */
button {
    background: linear-gradient(135deg, #670f22, #a3162d);
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    transition: 0.3s;
}

button:hover {
    background: linear-gradient(135deg, #a3162d, #670f22);
    transform: scale(1.05);
}

/* MATERIAS */
.subjects {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-top: 15px;
}

.subject {
    background: rgba(255,255,255,0.05);
    padding: 15px;
    border-radius: 10px;
    cursor: pointer;
    text-align: center;
    border: 2px solid #670f22;
    transition: 0.3s;
}

.subject:hover {
    background: #670f22;
    color: white;
    transform: scale(1.05);
}

/* PROGRESO */
.progress-bar {
    background: rgba(255,255,255,0.1);
    height: 20px;
    border-radius: 10px;
    margin-top: 10px;
}

#progress {
    height: 100%;
    width: 0%;
    background: linear-gradient(90deg, #ffffff, #670f22);
    border-radius: 10px;
}

/* CALENDARIO */
#calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px;
    margin-top: 10px;
}

/* DIAS SEMANA */
.diaTitulo {
    text-align: center;
    font-weight: bold;
    color: #ff4d4d;
}

/* DIAS */
.day {
    background: rgba(255,0,0,0.15); /* rojo claro */
    padding: 12px;
    border-radius: 8px;
    text-align: center;
    border: 1px solid #ff0000;
    font-weight: bold;
    transition: 0.2s;
}

.day:hover {
    background: #ff0000;
    color: white;
}

/* HOY */
.today {
    border: 3px solid #ffffff;
    background: #ff0000;
    color: white;
}

/* PROGRESO COLORES */
.red { background: #ff0000; }
.yellow { background: #ffcc00; }
.green { background: #00c853; }

/* PUNTOS */
.score-box {
    background: rgba(255,255,255,0.05);
    border: 2px solid #670f22;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    font-size: 18px;
    margin-bottom: 10px;
}

/* TIENDA */
.tienda-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
}

.mini-card {
    background: rgba(103,15,34,0.6);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 15px;
    text-align: center;
    box-shadow: 0px 5px 20px rgba(0,0,0,0.5);
}

.mini-card p {
    color: #ddd;
}
