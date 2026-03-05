// js/auth.js
import { auth, provider, db } from './firebase-config.js';
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Elementos del DOM
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const adminSection = document.getElementById('admin-section');
const loginSection = document.getElementById('login-section');

// Login con Google
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Verificar si es admin (puedes agregar emails permitidos aquí)
    const adminEmails = ['tu-email@gmail.com']; // ← CAMBIA POR TU EMAIL
    if (adminEmails.includes(user.email)) {
      localStorage.setItem('admin', 'true');
      window.location.href = 'admin.html';
    } else {
      alert('Acceso restringido. Solo administradores.');
      await signOut(auth);
    }
  } catch (error) {
    console.error('Error login:', error);
    alert('Error al iniciar sesión: ' + error.message);
  }
}

// Logout
export function logout() {
  signOut(auth);
  localStorage.removeItem('admin');
  window.location.href = 'index.html';
}

// Verificar sesión
export function checkAuth() {
  onAuthStateChanged(auth, async (user) => {
    if (user && localStorage.getItem('admin') === 'true') {
      // Verificar en Firestore si sigue siendo admin
      const adminRef = doc(db, 'admins', user.uid);
      const adminSnap = await getDoc(adminRef);
      
      if (adminSnap.exists() || user.email === 'tu-email@gmail.com') {
        if (adminSection) adminSection.style.display = 'block';
        if (loginSection) loginSection.style.display = 'none';
      } else {
        logout();
      }
    } else {
      if (adminSection) adminSection.style.display = 'none';
      if (loginSection) loginSection.style.display = 'block';
    }
  });
}

// Event listeners
if (loginBtn) loginBtn.addEventListener('click', loginWithGoogle);
if (logoutBtn) logoutBtn.addEventListener('click', logout);

// Iniciar verificación
document.addEventListener('DOMContentLoaded', checkAuth);