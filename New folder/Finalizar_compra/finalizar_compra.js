const totalElement = document.getElementById('total-price')
const mpOption = document.getElementById('mp-option');
const transferOption = document.getElementById('transfer-option');
const cartButton = document.querySelector('.cart-button');


// ... (código existente de Lógica para seleccionar Transferencia)

// Función para actualizar el total del resumen de compra
const updateCheckoutTotal = () => {
    // 1. Obtiene el total guardado del localStorage por carrito.js
    const checkoutTotal = localStorage.getItem('checkoutTotal');
    
    if (checkoutTotal) {
        // 2. Actualiza el texto del elemento Total con el valor guardado
        totalElement.textContent = `$${checkoutTotal}`;
        
        // **OPCIONAL:** También actualiza el subtotal y el total en la sección del resumen si es necesario,
        // aunque tu HTML actualmente solo tiene un elemento con id 'total-price'.
        // Si tienes más elementos que actualizar, los harías aquí.
        
        // Aquí actualizamos el subtotal y el total-price en la sección de resumen
        // Como tu HTML usa el mismo $1,299.00 como subtotal y el total-price solo tiene el total:
        const subtotalSummary = docuumen.getElementById0('subtotal-price')
        const calculatedSubtotal = (parseFloat(checkoutTotal) / 1.10).toFixed(2); // Inverso del 10% de impuesto
        
        if (subtotalSummary) {
            subtotalSummary.textContent = `$${calculatedSubtotal}`;
        }
        
    } else {
        // En caso de que no haya total, puede ser útil mostrar un 0 o un mensaje
        totalElement.textContent = '$0.00';
    }
};

// Llama a la nueva función para actualizar el total al cargar la página.
updateCheckoutTotal();

const updateCartCount = () => {
        // Obtiene el carrito de localStorage; si no existe, usa un array vacío.
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        // Calcula el total de artículos sumando las cantidades de cada producto.
        const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
        // Actualiza el texto del botón del carrito con el nuevo total.
        cartButton.textContent = `🛒 Carrito (${totalItems})`;
    };

    // Inicializar el contador del carrito al cargar la página.
    updateCartCount();




    
// Lógica para seleccionar Mercado Pago
mpOption.addEventListener('click', () => {
    mpOption.classList.add('selected');
    transferOption.classList.remove('selected');
    // Aquí iría el código para inicializar el checkout de Mercado Pago
});

// Lógica para seleccionar Transferencia
transferOption.addEventListener('click', () => {
    transferOption.classList.add('selected');
    mpOption.classList.remove('selected');
});

// Inicializar el SDK de Mercado Pago
/*
const mp = new MercadoPago('TU_PUBLIC_KEY');
mp.bricks().create("wallet", "wallet_container", {
    initialization: {
        preferenceId: "TU_PREFERENCE_ID",
},
});
 */