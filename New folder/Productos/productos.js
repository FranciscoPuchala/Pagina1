// Selecciona el botón del carrito
const cartButton = document.querySelector('.cart-button');

// Función para mostrar una notificación temporal al usuario.
const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = 'notification-message';
    document.body.appendChild(notification);

    // Oculta la notificación después de 2 segundos.
    setTimeout(() => {
        notification.classList.add('fade-out');
        notification.addEventListener('transitionend', () => {
            notification.remove();
        });
    }, 2000);
};

// Función para actualizar el contador del carrito en el encabezado.
const updateCartCount = () => {
    // Obtiene el carrito de localStorage; si no existe, usa un array vacío.
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Calcula el total de artículos sumando las cantidades de cada producto.
    const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
    // Actualiza el texto del botón del carrito con el nuevo total.
    cartButton.textContent = `🛒 Carrito (${totalItems})`;
};

// Lógica para el filtro de categorías
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const categoryTitles = document.querySelectorAll('.category-title');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const viewProductButtons = document.querySelectorAll('.view-product-btn');
    
    // Manejar los botones de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Manejar el estado del botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const categoryToShow = button.dataset.category;

            // Mostrar u ocultar las tarjetas de productos
            productCards.forEach(card => {
                if (categoryToShow === 'all' || card.dataset.category === categoryToShow) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            // Mostrar u ocultar los títulos de las categorías
            categoryTitles.forEach(title => {
                if (categoryToShow === 'all' || title.dataset.category === categoryToShow) {
                    title.style.display = 'block';
                } else {
                    title.style.display = 'none';
                }
            });
        });
    });

    // Manejar el evento de clic en los botones "Añadir al carrito"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Detiene la propagación del evento para no activar el clic en la tarjeta de producto.
            event.stopPropagation();
            event.preventDefault();

            // Obtiene la tarjeta de producto más cercana al botón.
            const productCard = button.closest('.product-card');
            
            // Recolectar la información del producto de la tarjeta.
            const productId = productCard.dataset.id;
            const productName = productCard.querySelector('h3').textContent;
            const productPriceText = productCard.querySelector('.price').textContent;
            const productPrice = parseFloat(productPriceText.replace('$', ''));
            const productImage = productCard.querySelector('img').src;
            
            // Crea un objeto con la información del producto.
            const productToAdd = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
            };

            // Obtiene el carrito del almacenamiento local.
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            // Busca si el producto ya existe en el carrito.
            const existingProductIndex = cart.findIndex(item => item.id === productToAdd.id);

            if (existingProductIndex !== -1) {
                // Si el producto ya existe, incrementa su cantidad.
                cart[existingProductIndex].quantity += 1;
            } else {
                // Si no existe, añade el nuevo producto al carrito con una cantidad de 1.
                cart.push({ ...productToAdd, quantity: 1 });
            }

            // Guarda el carrito actualizado en localStorage.
            localStorage.setItem('cart', JSON.stringify(cart));

            // Actualiza el contador del carrito en la interfaz.
            updateCartCount();
            
            // Muestra una notificación al usuario.
            showNotification(`${productName} ha sido añadido al carrito.`);
        });
    });

    // Manejar el evento de clic en los botones "Ver más"
    viewProductButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Previene el comportamiento por defecto del enlace.
            event.preventDefault();

            // Obtiene la tarjeta de producto más cercana al botón que se hizo clic.
            const productCard = button.closest('.product-card');
            
            // Recolecta toda la información del producto.
            const productId = productCard.dataset.id;
            const productName = productCard.querySelector('h3').textContent;
            const productPriceText = productCard.querySelector('.price').textContent;
            const productPrice = parseFloat(productPriceText.replace('$', ''));
            const productImage = productCard.querySelector('img').src;
            
            // Añade una descripción y características de ejemplo para la página del producto
            const productDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."; // Ejemplo de descripción
            const productFeatures = [
                "Característica A",
                "Característica B",
                "Característica C"
            ]; // Ejemplo de características

            const selectedProduct = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                description: productDescription,
                features: productFeatures
            };
            
            // Guarda el producto seleccionado en localStorage antes de redirigir.
            localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));

            // Redirige al usuario a la página del producto.
            window.location.href = `../Producto/pagina_producto.html`;
        });
    });
});

// Llama a la función de actualización del carrito.
updateCartCount();
