// Selecciona los elementos del DOM necesarios.
const productDetailSection = document.getElementById('product-details-container');
const cartButton = document.querySelector('.cart-button');

// Función para mostrar una notificación temporal al usuario.
const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'notification-message';
    document.body.appendChild(notification);

    // Hace que la notificación desaparezca después de 2 segundos.
    setTimeout(() => {
        notification.classList.add('fade-out');
        notification.addEventListener('transitionend', () => {
            notification.remove();
        });
    }, 2000);
};

// Función para actualizar el contador del carrito en el encabezado.
const updateCartCount = () => {
    // Obtiene el carrito de localStorage, si no existe, usa un array vacío.
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Calcula el total de artículos en el carrito sumando las cantidades de cada producto.
    const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
    // Actualiza el texto del botón del carrito con el nuevo total.
    cartButton.textContent = `🛒 Carrito (${totalItems})`;
};

// Inicializa la página al cargar el DOM.
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Obtiene el producto seleccionado del almacenamiento local.
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

    // Verifica si hay un producto seleccionado.
    if (selectedProduct) {
        // Genera el HTML de los detalles del producto de forma dinámica.
        productDetailSection.innerHTML = `
            <div class="product-gallery">
                <img src="${selectedProduct.image}" alt="${selectedProduct.name}">
            </div>
            <div class="product-info">
                <h1 id="product-name">${selectedProduct.name}</h1>
                <p class="product-price" id="product-price">$${selectedProduct.price}</p>
                <p class="product-description" id="product-description">${selectedProduct.description}</p>
                <div class="product-features">
                    <h3>Características destacadas:</h3>
                    <ul>
                        ${selectedProduct.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <a href="#" class="add-to-cart-button" data-id="${selectedProduct.id}">Añadir al carrito</a>
            </div>
        `;
        
        // Asigna el evento de clic al botón "Añadir al carrito" de la página de detalles.
        const addToCartButton = document.querySelector('.add-to-cart-button');
        if (addToCartButton) {
            addToCartButton.addEventListener('click', (event) => {
                event.preventDefault();
                // Obtiene el carrito de localStorage, si no existe.
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                // Busca si el producto ya está en el carrito.
                const existingProductIndex = cart.findIndex(item => item.id === selectedProduct.id);

                if (existingProductIndex !== -1) {
                    // Si el producto ya existe, solo incrementa su cantidad.
                    cart[existingProductIndex].quantity += 1;
                } else {
                    // Si no existe, añade el nuevo producto al carrito con una cantidad de 1.
                    cart.push({
                        id: selectedProduct.id,
                        name: selectedProduct.name,
                        price: selectedProduct.price,
                        image: selectedProduct.image,
                        quantity: 1
                    });
                }
                
                // Guarda el carrito actualizado en localStorage.
                localStorage.setItem('cart', JSON.stringify(cart));
                // Actualiza el contador del carrito en la interfaz.
                updateCartCount();
                // Muestra una notificación al usuario.
                showNotification(`${selectedProduct.name} ha sido añadido al carrito.`);
            });
        }
    } else {
        // Si no se encontró un producto, muestra un mensaje de error.
        productDetailSection.innerHTML = `<p>Producto no encontrado.</p>`;
    }
});
