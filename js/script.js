document.addEventListener('DOMContentLoaded', function () {
    // Importa la biblioteca QRious
    const script = document.createElement('script');
    script.src = './js/qrious/qrious.min.js';

    // Cuando la biblioteca se cargue, ejecuta el código principal
    script.onload = function () {
        // La función generarCodigoQR ahora estará definida aquí
        function generarCodigoQR() {
            const url = document.getElementById("url").value;
            const logoInput = document.getElementById("logo");
            const qrCanvas = document.getElementById("codigo-qr");
            const qrImage = document.getElementById("qr-image");

            if (url) {
                // Aumenta el tamaño del canvas para dar espacio al logotipo
                const qr = new QRious({
                    element: qrCanvas,
                    value: url,
                    size: 200, // Tamaño del código QR
                    backgroundAlpha: 0.9,
                    foreground: 'black', // Color de los datos del código QR
                });

                qrCanvas.classList.remove("hidden");

                if (logoInput.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const logoImage = new Image();
                        logoImage.src = e.target.result;
                        logoImage.onload = function () {
                            const context = qrCanvas.getContext('2d');
                            const logoSize = qrCanvas.width / 6; // Ajusta el tamaño del logotipo
                            const logoX = (qrCanvas.width - logoSize) / 2;
                            const logoY = (qrCanvas.height - logoSize) / 2;

                            // Agregar el logotipo
                            context.fillStyle = "white"; // Establece el fondo en blanco
                            context.fillRect(logoX, logoY, logoSize, logoSize); // Crea un cuadro blanco para el logotipo
                            context.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
                        };
                    };
                    reader.readAsDataURL(logoInput.files[0]);
                } else {
                    qrImage.src = qrCanvas.toDataURL('image/png');
                    qrImage.classList.remove("hidden");
                }
            }
        }

        // Agrega un event listener al botón
        const generarButton = document.querySelector('button');
        generarButton.addEventListener('click', generarCodigoQR);
    };

    // Agrega el script al documento
    document.head.appendChild(script);
});
