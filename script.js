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




// === SISTEMA DE ESPÍA CON SUSTOS PERSONALIZADOS POR PERSONAJE ===
function iniciarAnimalitoCurioso(idElemento, config) {
    const espia = document.getElementById(idElemento);
    if (!espia) return;

    const ojitos = espia.querySelector('.ojitos-curiosos');
    const bocadillo = espia.querySelector('.bocadillo-espia');
    let estaEspantado = false;

    function aparecer() {
        estaEspantado = false;
        espia.classList.remove('espantado');

        // Definir posiciones y clases para deslizamiento
        const posiciones = [
            { top: 'auto', bottom: '20px', left: '60px', right: 'auto', espejo: 'scaleX(1)', oculto: 'oculto-abajo' },
            { top: '90px', bottom: 'auto', left: '60px', right: 'auto', espejo: 'scaleX(1)', oculto: 'oculto-arriba' },
            { top: '45%', bottom: 'auto', left: '20px', right: 'auto', espejo: 'scaleX(-1)', oculto: 'oculto-izq' },
            { top: '45%', bottom: 'auto', left: 'auto', right: '20px', espejo: 'scaleX(1)', oculto: 'oculto-der' }
        ];

        const pos = posiciones[Math.floor(Math.random() * posiciones.length)];
        
        espia.className = 'animalito-espia ' + pos.oculto;
        espia.style.top = pos.top;
        espia.style.bottom = pos.bottom;
        espia.style.left = pos.left;
        espia.style.right = pos.right;

        if (ojitos) ojitos.style.transform = pos.espejo;

        // Frase normal aleatoria
        if (config.frasesNormales && config.frasesNormales.length > 0 && bocadillo) {
            bocadillo.textContent = config.frasesNormales[Math.floor(Math.random() * config.frasesNormales.length)];
        }

        // Animación de entrada
        setTimeout(() => {
            if (!estaEspantado) espia.classList.add('asomado');
        }, 50);

        // Ocultarse suavemente después de 5 segundos
        setTimeout(() => {
            if (!estaEspantado) {
                espia.classList.remove('asomado');
                setTimeout(aparecer, 4000);
            }
        }, 5000);
    }

    // INTERACCIÓN: Click para espantar con frases únicas
    espia.addEventListener('click', () => {
        if (estaEspantado) return;
        estaEspantado = true;

        // Seleccionar susto aleatorio
        if (config.sustos && config.sustos.length > 0 && bocadillo) {
            const sustoAzar = config.sustos[Math.floor(Math.random() * config.sustos.length)];
            bocadillo.textContent = sustoAzar;
        }

        // Efecto visual de susto (salto y desaparición)
        espia.classList.remove('asomado');
        espia.classList.add('espantado');

        // Reaparece en otra posición en 6 segundos
        setTimeout(aparecer, 6000);
    });

    aparecer();
}

// INICIALIZACIÓN CON FRASES Y 4 SUSTOS UNICOS POR CADA UNO
document.addEventListener('DOMContentLoaded', () => {

    // 1. EL MICHI (Nosotros.html)
    iniciarAnimalitoCurioso('michi-espia', {
        frasesNormales: [
            '¿Qué lees por aquí? 🐱',
            '¡Amo el colágeno! 🐾',
            'Miau... curioseando 🐈',
            '¡GelyPatas es top! ✨',
            '¿No tienes un snack? 🐟'
        ],
        sustos: [
            '¡AAAAH me vio! 🐱💥',
            '¡Aych, no me toque! 🐾💨',
            '¡Susto gatuno, me voy! 🐈⚡',
            '¡Ups! ¡Abortar misión miau! 🙀🏃‍♂️'
        ]
    });

    // 2. EL PERRITO (Mascotas.html)
    iniciarAnimalitoCurioso('perro-espia', {
        frasesNormales: [
            '¡Huelo premios ricos! 🦴',
            '¡Guau! ¿Qué miras? 🐶',
            'Nutrición 100% natural 🐕',
            '¡Firulais aprueba esto! 🔥'
        ],
        sustos: [
            '¡WOOF! ¡Me atrapaste! 🐶💨',
            '¡Ay mi cola, me asusté! 🐕💥',
            '¡Corre Firulais, corre! 🦴⚡',
            '¡No me descubras pue! 🐶🙈'
        ]
    });

    // 3. EL HUMANO / GRANJERO (Humanos.html)
    iniciarAnimalitoCurioso('humano-espia', {
        frasesNormales: [
            '¡Salud vital para todos! 💪',
            'Co-Sharing en acción 🌾',
            '¡Súper recomendado! 🙌'
        ],
        sustos: [
            '¡Chaaaa me pillaste! 🧍‍♂️💥',
            '¡Madre mía, qué susto! 🏃‍♂️💨',
            '¡Tranqui, solo miraba! 😅⚡',
            '¡No me asustes así bro! 🧍‍♂️🙈'
        ]
    });

    // 4. DUPLA GRANJERO + VAQUITA (Catalogo.html)
    iniciarAnimalitoCurioso('vaca-espia', {
        frasesNormales: [
            '¡Moo! Revisa el catálogo 🌾',
            'Colágeno de res 100% puro 🐮',
            '¡Calidad artesanal! 🥛',
            '¿Ya elegiste tu snack favorito? 🛍️',
            '¡El Granjero y yo aprobamos esto! 🤠🐮'
        ],
        sustos: [
            '¡MOOOO! ¡Nos descubrieron! 🐮💥',
            '¡Corre granjero, atrapan vacas! 🤠🐮💨',
            '¡Aaaay la vaquita se asustó! 🌾⚡',
            '¡Sálvese quien pueda! 🐮🚀'
        ]
    });

});




function iniciarAnimalitoCurioso(idElemento, config) {
    const espia = document.getElementById(idElemento);
    if (!espia) return;

    const ojitos = espia.querySelector('.ojitos-curiosos');
    const bocadillo = espia.querySelector('.bocadillo-espia');
    let estaEspantado = false;

    function aparecer() {
        estaEspantado = false;
        espia.classList.remove('espantado');

        // Margen seguro horizontal para que los textos largos no se salgan del marco
        const posXSegura = Math.floor(Math.random() * (window.innerWidth - 320)) + 160;

        const posiciones = [
            { top: 'auto', bottom: '20px', left: `${posXSegura}px`, right: 'auto', espejo: 'scaleX(1)', oculto: 'oculto-abajo' },
            { top: '90px', bottom: 'auto', left: `${posXSegura}px`, right: 'auto', espejo: 'scaleX(1)', oculto: 'oculto-arriba' },
            { top: '45%', bottom: 'auto', left: '20px', right: 'auto', espejo: 'scaleX(-1)', oculto: 'oculto-izq' },
            { top: '45%', bottom: 'auto', left: 'auto', right: '20px', espejo: 'scaleX(1)', oculto: 'oculto-der' }
        ];

        const pos = posiciones[Math.floor(Math.random() * posiciones.length)];
        
        espia.className = 'animalito-espia ' + pos.oculto;
        espia.style.top = pos.top;
        espia.style.bottom = pos.bottom;
        espia.style.left = pos.left;
        espia.style.right = pos.right;

        if (ojitos) ojitos.style.transform = pos.espejo;

        if (config.frasesNormales && config.frasesNormales.length > 0 && bocadillo) {
            bocadillo.textContent = config.frasesNormales[Math.floor(Math.random() * config.frasesNormales.length)];
        }

        setTimeout(() => {
            if (!estaEspantado) espia.classList.add('asomado');
        }, 50);

        setTimeout(() => {
            if (!estaEspantado) {
                espia.classList.remove('asomado');
                setTimeout(aparecer, 4000);
            }
        }, 5000);
    }

    espia.addEventListener('click', () => {
        if (estaEspantado) return;
        estaEspantado = true;

        if (config.sustos && config.sustos.length > 0 && bocadillo) {
            bocadillo.textContent = config.sustos[Math.floor(Math.random() * config.sustos.length)];
        }

        espia.classList.remove('asomado');
        espia.classList.add('espantado');

        setTimeout(aparecer, 6000);
    });

    aparecer();
}