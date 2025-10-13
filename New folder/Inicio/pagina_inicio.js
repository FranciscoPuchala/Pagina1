document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar los elementos del DOM.
    const productCards = document.querySelectorAll('.product-card');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartButton = document.querySelector('.cart-button');

    // Mapeo de IDs de producto a sus URLs de imagen reales.
    // Esto es NECESARIO porque las imágenes de los productos destacados (iPhone, iPad, Watch)
    // ahora son fondos CSS, y no hay una etiqueta <img> de donde obtener la URL.
    const productImageMap = {
        'iphone16promax': 'iphone-16-pro-max-1_6EFF873F24804524AAB5AAD8389E9913.jpg',
        'ipadpro': 'D_NQ_NP_758447-MLA46975173385_082021-O.webp',
        'applewatchultra2': 'D_Q_NP_2X_882490-MLU77852262960_072024-P.webp',
        // Se mantienen las URLs de placeholder para los accesorios (Funda y Cargador) 
        // ya que el HTML usa el mismo placeholder y aún tienen la etiqueta <img>.
        'funda_silicona': 'https://via.placeholder.com/300x300',
        'cargador_magsafe': 'https://via.placeholder.com/300x300',
    };

    // Función para mostrar una notificación temporal al usuario.
    const showNotification = (message) => {
        const notification = document.createElement('div');
        notification.textContent = message;
        // Se añade estilo CSS inline para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #38c172;
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            opacity: 0.95;
            transition: transform 0.3s ease-out, opacity 0.3s ease-out;
        `;
        document.body.appendChild(notification);

        // Oculta la notificación después de 2 segundos.
        setTimeout(() => {
            notification.style.transform = 'translateY(-20px)';
            notification.style.opacity = '0';
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

    // Inicializar el contador del carrito al cargar la página.
    updateCartCount();

    // --- Lógica para añadir productos al carrito (Botón) ---
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Detiene la propagación y previene la navegación del enlace.
            event.stopPropagation();
            event.preventDefault(); 

            const productCard = button.closest('.product-card');
            
            // Recolectar la información del producto.
            const productId = productCard.dataset.id;
            const productName = productCard.querySelector('h3').textContent;
            const productPriceText = productCard.querySelector('.price').textContent;
            const productPrice = parseFloat(productPriceText.replace('$', ''));
            
            // **OBTENCIÓN DE IMAGEN MODIFICADA:** // Usa el mapa para obtener la URL. Si no existe en el mapa (ej: Accesorios), 
            // intenta obtenerla de la etiqueta <img> (si está presente).
            let productImage = productImageMap[productId];
            if (!productImage) {
                const imgElement = productCard.querySelector('img');
                productImage = imgElement ? imgElement.src : 'placeholder.jpg';
            }
            
            const productToAdd = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage, 
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            
            const existingProductIndex = cart.findIndex(item => item.id === productToAdd.id);

            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push({ ...productToAdd, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            showNotification(`${productName} ha sido añadido al carrito.`);
        });
    });

    // --- Lógica para la navegación a la página de producto (Clic en tarjeta) ---
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            // Recolectar toda la información del producto.
            const productId = card.dataset.id;
            const productName = card.querySelector('h3').textContent;
            const productPriceText = card.querySelector('.price').textContent;
            const productPrice = parseFloat(productPriceText.replace('$', ''));
            
            // **OBTENCIÓN DE IMAGEN MODIFICADA:** Usa el mapa o la etiqueta <img>.
            let productImage = productImageMap[productId];
            if (!productImage) {
                const imgElement = card.querySelector('img');
                productImage = imgElement ? imgElement.src : 'placeholder.jpg'; 
            }

            // Datos de ejemplo para la página de detalle
            const productDescription = "Experimenta el poder inigualable y el diseño de vanguardia. Este producto redefine lo que esperas de la tecnología, ofreciendo un rendimiento excepcional y una integración perfecta con tu ecosistema digital.";
            const productFeatures = [
                "Chip A-Biónico de última generación",
                "Pantalla ProMotion Super Retina XDR",
                "Sistema de cámara triple de 48MP",
                "Batería de larga duración"
            ];

            const selectedProduct = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage, 
                description: productDescription,
                features: productFeatures
            };
            
            // Guarda el producto seleccionado y redirige.
            localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
            window.location.href = `../Producto/pagina_producto.html`;
        });
    });
});
