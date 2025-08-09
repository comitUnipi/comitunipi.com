import Heading from '@/components/heading';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { CameraDevice, Html5Qrcode } from 'html5-qrcode';
import { CheckCircle, XCircle } from 'lucide-react';
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

  const { flash } = usePage<{ flash: FlashMessages }>().props;

  const startScanner = async (): Promise<void> => {
    setGeneralError('');

    try {
      const devices: CameraDevice[] = await Html5Qrcode.getCameras();
      if (!devices || devices.length === 0) {
        setGeneralError('Tidak ada kamera yang tersedia.');
        return;
      }

      const selectedDevice =
        devices.find((device) => device.label.toLowerCase().includes('back') || device.label.toLowerCase().includes('rear')) || devices[0];

      const html5QrCode = new Html5Qrcode('reader');
      html5QrCodeRef.current = html5QrCode;

      await html5QrCode.start(selectedDevice.id, { fps: 10, qrbox: { width: 250, height: 250 } }, handleScanSuccess, handleScanError);

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
                <Button onClick={startScanner}>Mulai Scan</Button>
              ) : (
                <p className="flex items-center space-x-1 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Scanner aktif. Arahkan kamera ke QR code.</span>
                </p>
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
