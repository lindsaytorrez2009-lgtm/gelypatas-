// Función para enviar pedido directo a WhatsApp
function pedirWhatsApp(nombreProducto) {
    // Número telefónico configurado para atención
    const telefono = "59170000000"; 
    
    // Mensaje personalizado
    const mensaje = encodeURIComponent(`Hola GelyPatas, me interesa realizar un pedido de: ${nombreProducto}. ¿Me dan más información?`);
    
    // Abrir la API de WhatsApp
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
}



// Sistema de Mascotas Shimeji con Direcciones Corregidas + Pataleo + Gravedad Suave
function crearMascotaPatrullera(idElemento, config) {
    const mascota = document.getElementById(idElemento);
    if (!mascota) return;

    const bocadillo = mascota.querySelector('.bocadillo-texto');
    const cuerpo = mascota.querySelector('.cuerpo-mascota');
    
    // Variables de estado
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let posX = config.inicioX || Math.random() * (window.innerWidth - 100);
    let velocidad = config.velocidad || 1.5;
    let direccion = 1; // 1 = Derecha, -1 = Izquierda
    let animacionId = null;

    // Posición vertical inicial
    let posY = window.innerHeight - 100;
    mascota.style.top = `${posY}px`;
    mascota.style.left = `${posX}px`;

    // Estado visual inicial mirando hacia la derecha
    if (cuerpo) cuerpo.style.transform = 'scaleX(-1)';

    // 1. Bucle de Caminata Autónoma (Patrullaje)
    function caminar() {
        if (!isDragging) {
            posX += velocidad * direccion;

            // Rebotar al llegar al borde DERECHO -> Girar hacia la izquierda
            if (posX >= window.innerWidth - 80) {
                direccion = -1;
                if (cuerpo) cuerpo.style.transform = 'scaleX(1)'; // Mira a la izquierda
            } 
            // Rebotar al llegar al borde IZQUIERDO -> Girar hacia la derecha
            else if (posX <= 10) {
                direccion = 1;
                if (cuerpo) cuerpo.style.transform = 'scaleX(-1)'; // Mira a la derecha
            }

            mascota.style.left = `${posX}px`;
        }
        animacionId = requestAnimationFrame(caminar);
    }

    caminar();

    // 2. Agarrar con el mouse (Activa pataleo)
    mascota.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - mascota.getBoundingClientRect().left;
        offsetY = e.clientY - mascota.getBoundingClientRect().top;
        
        bocadillo.textContent = config.frases.agarrado;
        mascota.style.transition = 'none';
        mascota.style.zIndex = '1000';
        mascota.classList.add('pataleando');
    });

    // 3. Mover mientras se agarra
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        let x = e.clientX - offsetX;
        let y = e.clientY - offsetY;
        
        posX = Math.max(0, Math.min(x, window.innerWidth - 60));
        posY = Math.max(0, Math.min(y, window.innerHeight - 60));

        mascota.style.left = `${posX}px`;
        mascota.style.top = `${posY}px`;
    });

    // 4. Soltar con caída suave y reanudar marcha
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            mascota.classList.remove('pataleando');
            
            bocadillo.textContent = config.frases.caida;
            
            const sueloY = window.innerHeight - 100;
            
            mascota.style.transition = 'top 1.4s cubic-bezier(0.34, 1.2, 0.64, 1)';
            mascota.style.top = `${sueloY}px`;
            posY = sueloY;

            setTimeout(() => {
                bocadillo.textContent = config.frases.reposo;
                mascota.style.transition = 'none';
                mascota.style.zIndex = '999';
            }, 1400);
        }
    });
}

// Inicializar el Squad naciendo desde la izquierda
document.addEventListener('DOMContentLoaded', () => {
    crearMascotaPatrullera('mishi-interactivo', {
        inicioX: 30,
        velocidad: 1.2,
        frases: { agarrado: '¡Ayyy miau! 🐈✨', caida: '¡Flotando suave! 🐾', reposo: '¡Dame colágeno! 🐱' }
    });

    crearMascotaPatrullera('perrito-interactivo', {
        inicioX: 180,
        velocidad: 2.0,
        frases: { agarrado: '¡Woof woof! 🐕🔥', caida: '¡Atrapa la pata! 🦴', reposo: '¡GelyPatas fan! 🐶' }
    });

    crearMascotaPatrullera('vaquita-interactiva', {
        inicioX: 340,
        velocidad: 0.8,
        frases: { agarrado: '¡Mooow aaaaa! 🐄💥', caida: '¡Caída espacial! 🌾', reposo: '100% Artesanal 🐮' }
    });

    crearMascotaPatrullera('humano-interactivo', {
        inicioX: 490,
        velocidad: 1.5,
        frases: { agarrado: '¡Oye soltame! 🧍‍♂️⚡', caida: '¡Caigo en paracaídas! 🪂', reposo: 'Co-Sharing Power 💪' }
    });
});