const mpOption = document.getElementById('mp-option');
const transferOption = document.getElementById('transfer-option');

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