// =======================================================
// LÓGICA EXCLUSIVA DEL PRESENTADOR DEL CATÁLOGO
// =======================================================

const frasesCatalogo = [
    "¡Explora todos<br>nuestros combos! 🐾",
    "¡100% artesanal<br>y natural! ✨",
    "¡Salud para las<br>articulaciones! 🦴",
    "¡Envíos directos<br>por WhatsApp! 📲",
    "¡El mejor snack para<br>tu peludito! 🐶🐱",
    "¡Nutrición pura<br>para ti y tu mascota! ⚡",
    "¡Revisa los precios<br>aquí abajo! 👀"
];

function cambiarFraseCatalogo() {
    const contenedor = document.getElementById('robloxCatalogoMascota');
    const mensajeCatalogo = document.getElementById('robloxCatalogoMensaje');
    const avatarCatalogo = document.getElementById('robloxCatalogoAvatar');

    if (mensajeCatalogo) {
        const textoActual = mensajeCatalogo.innerHTML.trim();
        let nuevaFrase;

        do {
            nuevaFrase = frasesCatalogo[Math.floor(Math.random() * frasesCatalogo.length)];
        } while (nuevaFrase === textoActual && frasesCatalogo.length > 1);

        mensajeCatalogo.innerHTML = nuevaFrase;
    }

    if (contenedor) {
        contenedor.classList.add('activo');
        if (window.timerCatalogo) clearTimeout(window.timerCatalogo);
        window.timerCatalogo = setTimeout(() => {
            contenedor.classList.remove('activo');
        }, 4000);
    }

    if (avatarCatalogo) {
        avatarCatalogo.style.filter = "drop-shadow(0 0 35px #00d2ff) brightness(1.3)";
        setTimeout(() => {
            avatarCatalogo.style.filter = "";
        }, 250);
    }
}

// Evento directo por clic
document.addEventListener('DOMContentLoaded', () => {
    const elMascota = document.getElementById('robloxCatalogoMascota');
    if (elMascota) {
        elMascota.addEventListener('click', (e) => {
            e.stopPropagation();
            cambiarFraseCatalogo();
        });
    }
});