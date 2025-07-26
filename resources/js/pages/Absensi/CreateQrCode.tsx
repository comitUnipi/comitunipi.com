import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import ToastNotification from '@/components/toast-notification';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';

import { Kegiatan, type BreadcrumbItem } from '@/types';

interface QrData {
  id: number;
  kegiatan_id: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
}

interface FlashMessage {
  success?: string;
  error?: string;
}

interface Props {
  kegiatan: Kegiatan[];
  qrData?: QrData;
  qrCodeSvg?: string;
  flash?: FlashMessage;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Buat Absensi',
    href: '/absensi/generate/qr-code',
  },
];

export default function PemasukanIndex({ kegiatan, qrData, qrCodeSvg, flash }: Props) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const { data, setData, post, processing, reset } = useForm({
    kegiatan_id: qrData?.kegiatan_id?.toString() || '',
    start_time: qrData?.start_time || '',
    end_time: qrData?.end_time || '',
  });

  const { post: postDeactivate } = useForm();

  useEffect(() => {
    if (flash?.success || flash?.error) {
      setToastMessage(flash.success || flash.error);
      setToastType(flash.success ? 'success' : 'error');
      setShowToast(true);
    }
  }, [flash]);

  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  }, [showToast]);

  useEffect(() => {
    if (qrData) {
      setData({
        kegiatan_id: qrData.kegiatan_id.toString(),
        start_time: qrData.start_time,
        end_time: qrData.end_time,
      });
    }
  }, [qrData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('qr.generate'), {
      onSuccess: () => reset(),
    });
  };

  const handleDeactivate = () => {
    if (confirm('Yakin ingin menonaktifkan QR Code ini?')) {
      postDeactivate(route('qr.deactivate', { id: qrData.id }), {
        preserveScroll: true,
      });
    }
  };

  const handlePreviewQrInNewTab = () => {
    const newWindow = window.open('', '_blank', 'width=300,height=300');
    if (newWindow && qrCodeSvg) {
      newWindow.document.write(`
            <html>
                <head>
                    <title>QR Code Preview</title>
                    <style>
                        body { display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
                    </style>
                </head>
                <body>
                    ${qrCodeSvg}
                </body>
            </html>
        `);
      newWindow.document.close();
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Data Pemasukan" />

      <div className="flex">
        <div className="from-background to-muted/20 flex w-full max-w-2xl flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">
          <ToastNotification message={toastMessage} type={toastType} visible={showToast} />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">Buat Absensi</h1>
              <p className="text-muted-foreground mt-1 text-base">Buat QR Code untuk melakukan absensi berdasarkan kegiatan.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="kegiatan_id">Kegiatan</Label>
              <Select onValueChange={(value) => setData('kegiatan_id', value)} value={data.kegiatan_id} defaultValue={data.kegiatan_id}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Kegiatan" />
                </SelectTrigger>
                <SelectContent>
                  {Array.isArray(kegiatan) && kegiatan.length > 0 ? (
                    kegiatan.map((k) => (
                      <SelectItem key={k.id} value={k.id.toString()}>
                        {k.name}
                      </SelectItem>
                    ))
                  ) : (
                    <p className="text-muted-foreground p-2 text-sm">Tidak ada kegiatan</p>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="start_time">Jam Mulai</Label>
              <Input id="start_time" type="time" value={data.start_time} onChange={(e) => setData('start_time', e.target.value)} />
            </div>

            <div>
              <Label htmlFor="end_time">Jam Selesai</Label>
              <Input id="end_time" type="time" value={data.end_time} onChange={(e) => setData('end_time', e.target.value)} />
            </div>

            <Button type="submit" disabled={processing} className="w-full">
              {processing ? 'Memproses...' : qrData ? 'Perbarui QR Code' : 'Generate QR'}
            </Button>
          </form>

          {qrData && qrCodeSvg && (
            <div className="bg-muted mt-10 rounded-lg border p-6">
              <h2 className="mb-2 text-lg font-semibold">QR Code</h2>

              <p className={`mb-4 text-sm font-medium ${qrData.is_active ? 'text-green-600' : 'text-red-500'}`}>
                {qrData.is_active ? 'QR Code ini saat ini aktif dan sedang digunakan untuk absensi.' : 'QR Code ini sudah tidak aktif.'}
              </p>

              <div className="mx-auto h-[250px] w-[250px]" dangerouslySetInnerHTML={{ __html: qrCodeSvg }} />
              <div className="text-muted-foreground mt-10 space-y-1 text-sm">
                <p>
                  <strong>Waktu:</strong> {qrData.start_time} - {qrData.end_time}
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  {qrData.is_active ? (
                    <span className="font-medium text-green-600">Aktif</span>
                  ) : (
                    <span className="font-medium text-red-600">Tidak Aktif</span>
                  )}
                </p>
              </div>

              <div className="flex items-center justify-center gap-4">
                {qrData.is_active && (
                  <Button variant="destructive" onClick={handleDeactivate} className="mt-6">
                    Nonaktifkan QR Code
                  </Button>
                )}
                <Button variant="outline" onClick={handlePreviewQrInNewTab} className="mt-6">
                  Preview QR Code
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
