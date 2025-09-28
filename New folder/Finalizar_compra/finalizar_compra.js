const totalElement = document.getElementById('total-price')
const mpOption = document.getElementById('mp-option');
const transferOption = document.getElementById('transfer-option');
const cartButton = document.querySelector('.cart-button');

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