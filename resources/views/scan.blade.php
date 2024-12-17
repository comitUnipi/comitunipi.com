<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Scan QR Code</title>
    <script src="https://cdn.jsdelivr.net/npm/jsqr/dist/jsQR.js"></script>
    <style>
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }
        
        .modal-content {
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            margin: 15% auto;
            width: 300px;
            text-align: center;
        }

        .btn {
            padding: 10px 20px;
            margin: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .btn-yes {
            background-color: #2563eb;
            color: white;
        }
        .btn-no {
            background-color: red;
            color: white;
        }
    </style>
</head>
<body>
    <div style="text-align: center;">
        <h2>Scan Absensi</h2>
        <video id="preview" width="100%" height="400" autoplay></video>
        <p style="font-size: 14px;" id="result"></p>
    </div>

    <div id="confirmationModal" class="modal">
        <div class="modal-content">
            <p>Apakah Anda ingin melanjutkan absensi?</p>
            <button class="btn btn-yes" id="btn-yes">Ya</button>
            <button class="btn btn-no" id="btn-no">Tidak</button>
        </div>
    </div>

    <script>
        const videoElement = document.getElementById("preview");
        const resultElement = document.getElementById("result");
        const canvasElement = document.createElement("canvas");
        const canvasContext = canvasElement.getContext("2d");
        const modal = document.getElementById("confirmationModal");
        const btnYes = document.getElementById("btn-yes");
        const btnNo = document.getElementById("btn-no");

        function startScanning() {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
                    .then(function(stream) {
                        videoElement.srcObject = stream;
                        requestAnimationFrame(scanQRCode);
                    })
                    .catch(function(error) {
                        alert("Camera access denied or not available: " + error.message);
                    });
            } else {
                alert("Camera not supported by this browser.");
            }
        }

        function scanQRCode() {
            if (videoElement.readyState === videoElement.HAVE_ENOUGH_DATA) {
                canvasElement.height = videoElement.videoHeight;
                canvasElement.width = videoElement.videoWidth;
                canvasContext.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
                
                const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
                const code = jsQR(imageData.data, canvasElement.width, canvasElement.height);
                
                if (code) {
                    resultElement.textContent = "QR Code berhasil dipindai!";
                    modal.style.display = "block";
                    btnYes.onclick = function() {
                        window.location.href = code.data;
                    };
                    btnNo.onclick = function() {
                        modal.style.display = "none";
                        resultElement.textContent = "Anda membatalkan absensi.";
                    };
                } else {
                    resultElement.textContent = "Tidak ada QR Code yang terdeteksi. Coba lagi.";
                }
            }

            requestAnimationFrame(scanQRCode); 
        }
        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };

        window.onload = startScanning;
    </script>
</body>
</html>
