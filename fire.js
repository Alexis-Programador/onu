// 🔥 Firebase Modular (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getFirestore, doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCVXVGau-bH5o-gKAgOKG3Tb4IS7A7ZjkE",
  authDomain: "fases-42106.firebaseapp.com",
  projectId: "fases-42106",
  storageBucket: "fases-42106.appspot.com",
  messagingSenderId: "745592571706",
  appId: "1:745592571706:web:39bcb9903b1ca48b043203",
  measurementId: "G-8R2HP92PVM"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const userId = "usuario1";

// Función para guardar puntos en Firestore
export async function guardarPuntosEnFirebase(puntos) {
  try {
    await updateDoc(doc(db, "usuarios", userId), { puntosTotales: puntos });
  } catch (error) {
    await setDoc(doc(db, "usuarios", userId), { puntosTotales: puntos });
  }
}
