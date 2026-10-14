// Función para enviar pedido directo a WhatsApp
function pedirWhatsApp(nombreProducto) {
    // Número telefónico configurado para atención
    const telefono = "59170000000"; 
    
    // Mensaje personalizado
    const mensaje = encodeURIComponent(`Hola GelyPatas, me interesa realizar un pedido de: ${nombreProducto}. ¿Me dan más información?`);
    
    // Abrir la API de WhatsApp
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
}