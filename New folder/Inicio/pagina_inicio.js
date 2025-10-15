document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar los elementos del DOM.
    const productCards = document.querySelectorAll('.product-card');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartButton = document.querySelector('.cart-button');

    // Mapeo de IDs de producto a sus URLs de imagen.
    // Usamos nombres de archivo para los productos que tienen imágenes locales 
    // y URLs de placeholder completas para los accesorios.
    const productImageMap = {
        'iphone16promax': 'iphone-16-pro-max-1_6EFF873F24804524AAB5AAD8389E9913.jpg',
        'ipadpro': 'D_NQ_NP_758447-MLA46975173385_082021-O.webp',
        'applewatchultra2': 'D_Q_NP_2X_882490-MLU77852262960_072024-P.webp',
        // **CORRECCIÓN:** URLs de placeholder completas y válidas.
        'funda_silicona': 'images (3).jpeg', 
        'cargador_magsafe': 'D_NQ_NP_692212-MLU70775490991_072023-O.webp'
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

    
    // Función para manejar la navegación a la página de producto
    productCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Si el clic fue en el botón 'Añadir al carrito', no navegamos.
            if (e.target.classList.contains('add-to-cart')) {
                return;
            }

            // Evita la navegación si el clic fue en un enlace diferente al producto
            e.preventDefault(); 
            
            // Obtención de datos del producto
            const productId = card.getAttribute('data-id');
            const productName = card.querySelector('h3').textContent;
            const productPriceText = card.querySelector('.price').textContent;
            const productPrice = parseFloat(productPriceText.replace('$', '').replace(',', ''));
            
            // Obtiene la imagen del mapa
            let productImage = productImageMap[productId];
            
            // Si no está en el mapa, intenta obtenerla de la etiqueta <img> (aunque ya no se usa para los principales)
            if (!productImage) {
                const imgElement = card.querySelector('img');
                productImage = imgElement ? imgElement.src : 'placeholder.jpg'; 
            }

            // Datos de ejemplo para la página de detalle (ajustados para cada producto si es necesario, 
            // pero manteniendo el ejemplo genérico para la demostración)
            let productDescription = "Experimenta el poder inigualable y el diseño de vanguardia. Este producto redefine lo que esperas de la tecnología.";
            let productFeatures = [
                "Características estándar",
                "Integración total con Apple Ecosystem",
                "Diseño premium"
            ];
            
            if (productId === 'iphone16promax') {
                 productDescription = "El iPhone 16 Pro Max, con el chip A-Biónico de última generación y sistema de cámara Pro, ofrece un rendimiento sin precedentes.";
                 productFeatures = ["Chip A-Biónico", "Pantalla ProMotion", "Sistema de cámara triple de 48MP"];
            } else if (productId === 'funda_silicona') {
                 productDescription = "Funda de silicona con MagSafe. Suave al tacto y diseñada para proteger tu iPhone de caídas y rasguños.";
                 productFeatures = ["Material de silicona", "Compatible con MagSafe", "Interior de microfibra"];
            }

            const selectedProduct = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage, // El nombre del archivo o la URL de placeholder
                description: productDescription,
                features: productFeatures
            };
            
            // Guarda el producto seleccionado y redirige.
            localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
            // Redirige a la página de producto.
            window.location.href = `../Producto/pagina_producto.html`;
        });
    });
    
    /// Función para actualizar el contador del carrito en el encabezado.
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
