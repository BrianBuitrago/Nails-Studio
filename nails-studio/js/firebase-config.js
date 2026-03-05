// js/firebase-config.js
// Este archivo actúa como puente para importar Firebase desde app.js
// La inicialización real ocurre en index.html (script modular inline)

// Esperar a que index.html inicialice Firebase
if (!window.db || !window.auth || !window.provider) {
  console.warn('Firebase no inicializado aún. Verifica que el script modular en index.html esté antes de app.js');
}

// Re-exportar variables globales para que app.js pueda importarlas
export const db = window.db;
export const auth = window.auth;
export const provider = window.provider;