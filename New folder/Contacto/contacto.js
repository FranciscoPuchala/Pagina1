        // --- Lógica del Chat ---
        const startChatBtn = document.getElementById('start-chat-btn');
        const closeChatBtn = document.getElementById('close-chat-btn');
        const chatWidget = document.getElementById('chat-widget');
        const chatForm = document.getElementById('chat-form');
        const chatInput = document.getElementById('chat-input');
        const chatMessages = document.getElementById('chat-messages');
         const cartButton = document.querySelector('.cart-button');
    // Función para renderizar los productos del carrito y actualizar el resumen
    
    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
        cartButton.textContent = `🛒 Carrito (${totalItems})`;
    };

        function openChat() {
            chatWidget.style.display = 'flex';
            setTimeout(() => {
                chatWidget.classList.add('visible');
            }, 10);
            
            if(chatMessages.children.length === 0) {
                 addMessage('¡Hola! Bienvenido al soporte de Iplace. ¿Cómo podemos ayudarte hoy?', 'support');
            }
        }

        function closeChat() {
            chatWidget.classList.remove('visible');
             setTimeout(() => {
                chatWidget.style.display = 'none';
            }, 300);
        }

        function addMessage(text, sender) {
            const bubble = document.createElement('div');
            bubble.className = `chat-bubble chat-bubble-${sender}`;
            bubble.textContent = text;
            chatMessages.appendChild(bubble);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.id = 'typing-indicator';
            typingDiv.className = 'chat-bubble chat-bubble-support typing-indicator';
            typingDiv.innerHTML = '<span></span><span></span><span></span>';
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function removeTypingIndicator() {
            const indicator = document.getElementById('typing-indicator');
            if (indicator) {
                indicator.remove();
            }
        }

        function simulateSupportResponse() {
            const responses = [
                "Entendido. Un momento por favor mientras reviso la información.",
                "Gracias por la información. Estoy buscando la mejor solución para ti.",
                "Perfecto, déjame consultar con un especialista.",
                "¿Podrías darme un poco más de detalle sobre tu consulta?",
                "Gracias por esperar. Nuestro equipo se pondrá en contacto contigo en breve si es necesario."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            setTimeout(() => {
                showTypingIndicator();
                setTimeout(() => {
                    removeTypingIndicator();
                    addMessage(randomResponse, 'support');
                }, 1500 + Math.random() * 1000);
            }, 500);
        }

        startChatBtn.addEventListener('click', openChat);
        closeChatBtn.addEventListener('click', closeChat);

        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const messageText = chatInput.value.trim();
            if (messageText) {
                addMessage(messageText, 'user');
                chatInput.value = '';
                simulateSupportResponse();
            }
        });
        updateCartCount();