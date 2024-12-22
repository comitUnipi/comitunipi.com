<x-filament-panels::page>
    <!-- Video element to show the camera preview -->
    <div class="">
        <video id="preview" class="md:max-w-md h-96" autoplay></video>
        <p class="text-sm" id="result"></p>
    </div>

    <!-- Confirmation Modal -->
    <div id="confirmationModal" class="modal hidden fixed inset-0 z-50 bg-black bg-opacity-50">
        <div class="modal-content bg-white p-5 rounded-lg mx-auto my-20 w-80 text-center">
            <p>Apakah Anda ingin melanjutkan absensi?</p>
            <button class="btn-yes py-2 px-5 my-3 rounded bg-blue-600 text-white" id="btn-yes">Ya</button>
            <button class="btn-no py-2 px-5 my-3 rounded bg-red-600 text-white" id="btn-no">Tidak</button>
        </div>
    </div>

    @push('scripts')
    <script src="https://cdn.jsdelivr.net/npm/jsqr/dist/jsQR.js"></script>
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
                    modal.classList.remove("hidden");
                    btnYes.onclick = function() {
                        window.location.href = code.data;
                    };
                    btnNo.onclick = function() {
                        modal.classList.add("hidden");
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
                modal.classList.add("hidden");
            }
        };

        window.onload = startScanning;
    </script>
    @endpush
</x-filament-panels::page>
