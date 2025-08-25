import Heading from '@/components/heading';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { CameraDevice, Html5Qrcode } from 'html5-qrcode';
import { Camera, CheckCircle, XCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface FlashMessages {
  success?: string;
  error?: string;
  message?: string;
}

export default function Pages() {
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const isScanningRef = useRef<boolean>(false);

  const [scannerActive, setScannerActive] = useState<boolean>(false);
  const [generalError, setGeneralError] = useState<string>('');
  const [cameras, setCameras] = useState<CameraDevice[]>([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState<number>(0);

  const { flash } = usePage<{ flash: FlashMessages }>().props;

  const loadCameras = async () => {
    try {
      const devices = await Html5Qrcode.getCameras();
      setCameras(devices);
    } catch (e) {
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

      await html5QrCode.start(selectedDevice, { fps: 10, qrbox: { width: 250, height: 250 } }, handleScanSuccess, handleScanError);

      isScanningRef.current = true;
      setScannerActive(true);
    } catch (error) {
      console.error('Scanner error:', error);
      setGeneralError('Gagal mengakses kamera. Pastikan izin kamera sudah diberikan.');
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

  return (
    <AppLayout
      breadcrumbs={[
        {
          title: 'Scan Absensi',
          href: '/fitur-utama/scan-absensi',
        },
      ]}
    >
      <Head title="Scan Absensi" />
      <div className="max-w-md space-y-4 p-6">
        <Heading
          title="Absensi"
          description="Lakukan absensi melalui QRCode yang telah disiapkan oleh pengurus dan scan disini untuk menyatakan kehadiran kamu."
        />
        <Card>
          <CardHeader>
            <CardTitle>Scan QRCode</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {flash?.success && (
              <Alert variant="default" className="text-green-500">
                <CheckCircle />
                <AlertTitle>Berhasil</AlertTitle>
                <AlertDescription>{flash.success}</AlertDescription>
              </Alert>
            )}
            {flash?.error && (
              <Alert variant="default" className="text-red-500">
                <XCircle />
                <AlertTitle>Gagal</AlertTitle>
                <AlertDescription>{flash.error}</AlertDescription>
              </Alert>
            )}
            {generalError && (
              <Alert variant="destructive">
                <XCircle className="h-5 w-5 text-red-500" />
                <AlertDescription>{generalError}</AlertDescription>
              </Alert>
            )}
            <div className="flex items-center space-x-2">
              {!scannerActive ? (
                <Button onClick={() => startScanner()}>Mulai Scan</Button>
              ) : (
                <>
                  <p className="flex items-center space-x-1 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Scanner aktif. Arahkan kamera ke QR code.</span>
                  </p>
                  {cameras.length > 1 && (
                    <Button onClick={switchCamera} variant="outline" size="sm">
                      <Camera className="mr-1 h-4 w-4" /> Flip Kamera
                    </Button>
                  )}
                </>
              )}
            </div>
            <div className="relative">
              <div id="reader" className="border-muted rounded border shadow-sm" />
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
