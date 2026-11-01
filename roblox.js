// =======================================================
// LÓGICA DE DIÁLOGOS INFALIBLE (ROBLOX.JS)
// =======================================================

const frasesInicio = [
    "¡Hola! Bienvenido a GelyPatas 🔥",
    "¡Buenas tardes! ¿En qué te podemos ayudar hoy? 🐾",
    "¡El mejor colágeno natural para ti y tu mascota! ✨",
    "¿Ya revisaste nuestros combos en el Catálogo? 👀",
    "¡Hacemos envíos directos! Escríbenos al WhatsApp 📲",
    "¡Salud y vitalidad 100% natural! ⚡",
    "¡Gracias por visitar GelyPatas! 🐶🐱"
];

function cambiarFraseRoblox() {
    const mensajeRoblox = document.getElementById('robloxMensaje');
    const avatarImg = document.getElementById('robloxAvatar');

    if (mensajeRoblox) {
        const textoActual = mensajeRoblox.textContent.trim();
        let nuevaFrase;

        do {
            nuevaFrase = frasesInicio[Math.floor(Math.random() * frasesInicio.length)];
        } while (nuevaFrase === textoActual && frasesInicio.length > 1);

        mensajeRoblox.textContent = nuevaFrase;
    }

    if (avatarImg) {
        avatarImg.style.filter = "drop-shadow(0 0 35px #00d2ff) brightness(1.3)";
        setTimeout(() => {
            avatarImg.style.filter = "";
        }, 250);
    }
}
















