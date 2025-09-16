import Heading from '@/components/heading';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQrScanner } from '@/hooks/use-qr-scanner';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Camera, CheckCircle, XCircle } from 'lucide-react';

interface Props {
  flash: {
    success?: string;
    error?: string;
    message?: string;
  };
}

export default function Pages({ flash }: Props) {
  const { scannerActive, generalError, cameras, startScanner, switchCamera } = useQrScanner();

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
