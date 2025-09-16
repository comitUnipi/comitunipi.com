import { router } from '@inertiajs/react';
import { CameraDevice, Html5Qrcode } from 'html5-qrcode';
import { useEffect, useRef, useState } from 'react';

export function useQrScanner() {
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const isScanningRef = useRef<boolean>(false);

  const [scannerActive, setScannerActive] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [cameras, setCameras] = useState<CameraDevice[]>([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);

  const loadCameras = async () => {
    try {
      const devices = await Html5Qrcode.getCameras();
      setCameras(devices);
    } catch (error) {
      console.error(error);
      setGeneralError('Gagal mendapatkan daftar kamera');
    }
  };

  const startScanner = async (cameraId?: string): Promise<void> => {
    setGeneralError('');

    try {
      const devices = cameras.length ? cameras : await Html5Qrcode.getCameras();
      if (!devices || devices.length === 0) {
        setGeneralError('Tidak ada kamera yang tersedia.');
        return;
      }

      const selectedDevice = cameraId || devices[currentCameraIndex].id;
      const html5QrCode = new Html5Qrcode('reader');
      html5QrCodeRef.current = html5QrCode;

      await html5QrCode.start(
        selectedDevice,
        { fps: 10, qrbox: { width: 250, height: 250 } },
        handleScanSuccess,
        handleScanError,
      );

      isScanningRef.current = true;
      setScannerActive(true);
    } catch (error) {
      console.error('Scanner error:', error);
      setGeneralError(
        'Gagal mengakses kamera. Pastikan izin kamera sudah diberikan.',
      );
    }
  };

  const stopScanner = async (): Promise<void> => {
    await html5QrCodeRef.current?.stop();
    html5QrCodeRef.current?.clear();

    isScanningRef.current = false;
    setScannerActive(false);
  };

  const switchCamera = async () => {
    if (cameras.length <= 1) return;

    const prevIndex = currentCameraIndex;
    const nextIndex = (currentCameraIndex + 1) % cameras.length;

    try {
      await stopScanner();
      await startScanner(cameras[nextIndex].id);
      setCurrentCameraIndex(nextIndex);
    } catch (error) {
      console.error('Gagal switch kamera:', error);
      setGeneralError('Kamera tidak tersedia, kembali ke kamera sebelumnya.');

      try {
        await startScanner(cameras[prevIndex].id);
        setCurrentCameraIndex(prevIndex);
      } catch (err) {
        console.error('Gagal mengembalikan kamera sebelumnya:', err);
        setGeneralError('Tidak ada kamera yang dapat digunakan.');
      }
    }
  };

  const handleScanSuccess = async (decodedText: string): Promise<void> => {
    if (!isScanningRef.current) return;

    await stopScanner();

    router.post(
      route('qr.scan.store'),
      {
        token: decodedText,
        status: 'hadir',
      },
      {
        preserveScroll: true,
      },
    );
  };

  const handleScanError = (errorMessage: string): void => {
    if (!errorMessage.includes('NotFoundException')) {
      console.warn('Scan error:', errorMessage);
    }
  };

  useEffect(() => {
    loadCameras();
    return () => {
      stopScanner();
    };
  }, []);

  return {
    scannerActive,
    generalError,
    cameras,
    currentCameraIndex,
    startScanner,
    stopScanner,
    switchCamera,
  };
}
