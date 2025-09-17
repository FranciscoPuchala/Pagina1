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

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;

            // Oculta todos los productos y títulos de categoría
            productCards.forEach(card => card.style.display = 'none');
            categoryTitles.forEach(title => title.style.display = 'none');

            if (category === 'all') {
                // Muestra todos los productos y títulos si el filtro es 'all'
                productCards.forEach(card => card.style.display = 'block');
                categoryTitles.forEach(title => title.style.display = 'block');
            } else {
                // Muestra solo los productos y el título de la categoría seleccionada
                document.querySelectorAll(`.product-card[data-category=\"${category}\"]`).forEach(card => {
                    card.style.display = 'block';
                });
                document.querySelector(`.category-title[data-category=\"${category}\"]`).style.display = 'block';
            }
        });
    });

    // Lógica para redirigir a la página de producto
    const viewProductBtns = document.querySelectorAll('.view-product-btn');
    viewProductBtns.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Previene el comportamiento predeterminado del enlace
            const productCard = button.closest('.product-card');

            // Asegúrate de que la tarjeta de producto exista
            if (!productCard) {
                console.error("No se encontró la tarjeta de producto.");
                showNotification("Error: No se puede ver el producto. Inténtalo de nuevo.");
                return;
            }

            // Recopila los datos del producto
            const productId = productCard.getAttribute('data-id');
            const productName = productCard.querySelector('h3').textContent;
            const productPriceText = productCard.querySelector('.price').textContent;
            const productPrice = parseFloat(productPriceText.replace('$', ''));
            const productImage = productCard.querySelector('img').src;

            // Añade una descripción y características de ejemplo para la página del producto
            let productDescription;
            let productFeatures;

            if (productId === "iphone16pro") {
                productDescription = "El iPhone más potente y sofisticado hasta la fecha. Con una pantalla más grande, cámaras de nivel profesional y un rendimiento inigualable.";
                productFeatures = ["Cámara principal de 50 MP", "Pantalla OLED de 6.7\" con ProMotion", "Batería de larga duración", "Cuerpo de titanio"];
            } else if (productId === "iphonese") {
                productDescription = "El iPhone SE combina el chip A15 Bionic, 5G, gran autonomía y un diseño robusto en un solo dispositivo.";
                productFeatures = ["Chip A15 Bionic", "Conectividad 5G ultrarrápida", "Gran autonomía de batería", "Botón de inicio con Touch ID"];
            } else if (productId === "ipadpro") {
                productDescription = "El iPad Pro es el lienzo y el cuaderno más versátiles del mundo.";
                productFeatures = ["Chip M4 ultrarrápido", "Pantalla Liquid Retina XDR", "Sistema de cámara avanzado"];
            } else if (productId === "macbookair15") {
                productDescription = "El MacBook Air 15'' es increíblemente fino, potente y perfecto para cualquier tarea.";
                productFeatures = ["Chip M3", "Pantalla Liquid Retina de 15.3 pulgadas", "Batería de hasta 18 horas"];
            } else if (productId === "applewatchseries10") {
                productDescription = "El Apple Watch Series 10 te ayuda a mantenerte activo, sano y conectado.";
                productFeatures = ["Pantalla más grande", "Nuevas funciones de salud", "Detección de accidentes"];
            } else if (productId === "airpodspro") {
                productDescription = "Los AirPods Pro ofrecen cancelación de ruido, sonido envolvente y un ajuste cómodo.";
                productFeatures = ["Cancelación activa de ruido", "Modo de sonido ambiente adaptable", "Audio espacial personalizado"];
            } else if (productId === "cargador_magsafe") {
                productDescription = "El Cargador MagSafe simplifica la carga inalámbrica.";
                productFeatures = ["Carga rápida inalámbrica", "Imanes perfectamente alineados", "Diseño compacto"];
            } else {
                productDescription = "Descripción no disponible.";
                productFeatures = [];
            }
            
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
