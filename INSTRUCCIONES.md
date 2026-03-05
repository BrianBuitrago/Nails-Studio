# 💅 Nails Studio — Sistema de Reservas

Web completa de reservas para salón de uñas con panel de administración.
**100% gratis · Sin servidor · GitHub Pages + Firebase**

---

## 📁 Estructura de archivos

```
nails-studio/
├── index.html          ← Página pública (clientes)
├── css/
│   └── styles.css      ← Estilos
├── js/
│   ├── firebase-config.js  ← ⚠️ CONFIGURAR PRIMERO
│   └── app.js          ← Lógica del cliente
└── admin/
    ├── index.html      ← Panel de administración
    └── admin.js        ← Lógica del admin
```

---

## 🔥 PASO 1 — Configurar Firebase (5 minutos)

### 1.1 Crear proyecto
1. Ve a **console.firebase.google.com**
2. Click "Agregar proyecto" → nombre: `nails-studio`
3. Desactiva Google Analytics (opcional) → Crear

### 1.2 Activar Firestore (Base de datos)
1. En el menú izquierdo → **Firestore Database**
2. Click "Crear base de datos"
3. Elige **Modo de prueba** → Siguiente → Listo

### 1.3 Activar Authentication (Login admin)
1. En el menú → **Authentication**
2. Click "Comenzar"
3. Pestaña "Sign-in method" → Habilitar **Correo/Contraseña**
4. Pestaña "Usuarios" → Agregar usuario:
   - Email: tu correo de admin
   - Contraseña: una segura

### 1.4 Activar Storage (para comprobantes de pago)
1. En el menú → **Storage**
2. Click "Comenzar" → Modo de prueba → Listo

### 1.5 Obtener configuración
1. En el menú → **Configuración del proyecto** (ícono ⚙️)
2. Baja hasta "Tus aplicaciones" → Click **</>** (Web)
3. Nombre: `nails-studio-web` → Registrar
4. **Copia el objeto firebaseConfig**

### 1.6 Pegar en firebase-config.js
Abre `js/firebase-config.js` y reemplaza con TUS datos:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",         // ← tu apiKey
  authDomain: "nails-studio-xxxxx.firebaseapp.com",
  projectId: "nails-studio-xxxxx",
  storageBucket: "nails-studio-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```

---

## 📱 PASO 2 — Configurar WhatsApp

En `js/app.js`, línea con `businessPhone`, pon el número real del negocio:
```javascript
const businessPhone = '573001234567'; // Código país + número sin espacios
```

---

## 🐙 PASO 3 — Subir a GitHub Pages (3 minutos)

### 3.1 Crear repositorio
1. Ve a **github.com** → New repository
2. Nombre: `nails-studio`
3. Público ✓ → Create repository

### 3.2 Subir archivos
**Opción A — Desde el navegador (más fácil):**
1. En tu repositorio → "uploading an existing file"
2. Arrastra TODA la carpeta `nails-studio`
3. Commit changes

**Opción B — Con Git:**
```bash
git init
git add .
git commit -m "Nails Studio inicial"
git remote add origin https://github.com/TU_USUARIO/nails-studio.git
git push -u origin main
```

### 3.3 Activar GitHub Pages
1. En tu repositorio → **Settings**
2. Menú izquierdo → **Pages**
3. Source: **Deploy from a branch**
4. Branch: **main** → carpeta **/ (root)**
5. Save

### 3.4 Tu página está lista en:
```
https://TU_USUARIO.github.io/nails-studio/
```
```
Panel admin:
https://TU_USUARIO.github.io/nails-studio/admin/
```

---

## ✏️ PASO 4 — Personalizar

### Cambiar nombre del negocio
Busca y reemplaza "Nails Studio" en index.html y admin/index.html.

### Cambiar número de teléfono del footer
En `index.html`, busca: `<a href="tel:"` y agrega tu número.

### Agregar servicios iniciales
1. Abre el panel admin → `/admin/`
2. Ve a "Categorías" y crea: Manicura, Pedicura
3. Ve a "Servicios" y agrega todos los del menú

### Los servicios del menú ya están precargados como datos demo,
pero se guardarán en Firebase cuando los crees desde el admin.

---

## 🔐 Seguridad — Reglas de Firestore

Una vez probado, ve a Firestore → Reglas y configura:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Solo admin puede escribir/leer servicios, categorías, productos
    match /servicios/{doc} { allow read; allow write: if request.auth != null; }
    match /categorias/{doc} { allow read; allow write: if request.auth != null; }
    match /productos/{doc} { allow read; allow write: if request.auth != null; }
    // Reservas: clientes pueden crear, solo admin puede leer/modificar todas
    match /reservas/{doc} { allow create; allow read, update, delete: if request.auth != null; }
    // Horarios y bloqueados: solo admin
    match /horarios/{doc} { allow read; allow write: if request.auth != null; }
    match /bloqueados/{doc} { allow read; allow write: if request.auth != null; }
  }
}
```

---

## 💡 Funciones incluidas

### Para clientes (index.html):
- ✅ Ver catálogo de servicios por categoría
- ✅ Agregar servicios al carrito
- ✅ Ver y comprar productos con inventario
- ✅ Calendario con disponibilidad en tiempo real
- ✅ Selección de hora (bloqueadas automáticamente según duración)
- ✅ Formulario con nombre, teléfono, notas
- ✅ Adjuntar comprobante de pago
- ✅ Confirmación por WhatsApp (negocio + cliente)
- ✅ Diseño responsive móvil/desktop

### Para admin (admin/index.html):
- ✅ Login seguro con Firebase Auth
- ✅ Dashboard con estadísticas
- ✅ Gestión de reservas (confirmar/cancelar)
- ✅ Ver comprobantes de pago
- ✅ Notificar clientes por WhatsApp
- ✅ Crear/editar/eliminar servicios
- ✅ Gestión de categorías
- ✅ Inventario de productos con stock
- ✅ Configurar horarios por día
- ✅ Bloquear horas específicas por fecha

---

## 📞 Soporte
Construido para Nails Studio — Diagonal 67 #3-57, Los Muiscas, Tunja, Boyacá
