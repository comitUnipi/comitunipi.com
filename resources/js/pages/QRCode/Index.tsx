import ModalConfirm from '@/components/app-modal-confirm';
import ToastNotification from '@/components/toast-notification';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { capitalizeFirstLetter } from '@/lib/capitalize-first-letter';
import { Kegiatan, type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface QrData {
  id: number;
  kegiatan_id: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
  kegiatan?: {
    name: string;
    audiens: string;
  };
}

interface Props {
  kegiatan: Kegiatan[];
  flash?: {
    success?: string;
    error?: string;
  };
  qrData?: QrData;
  qrCodeSvg?: string;
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Buat Absensi', href: '/qr-code/create' }];

export default function CreateQrCodePage({ kegiatan, qrData, qrCodeSvg, flash }: Props) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const { data, setData, post, processing, reset, errors } = useForm({
    kegiatan_id: '',
    start_time: '',
    end_time: '',
  });

  useEffect(() => {
    if (flash?.success || flash?.error) {
      setToastMessage(flash.success || flash.error || '');
      setToastType(flash.success ? 'success' : 'error');
      setShowToast(true);
    }
  }, [flash]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    post(route('qr.store'), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        router.visit(route('qr.create'), {
          preserveScroll: true,
          preserveState: true,
        });
      },
    });
  };

  const handleDeactivate = () => {
    setShowConfirmModal(true);
  };

  const confirmDeactivate = () => {
    setShowConfirmModal(false);
    if (qrData) {
      router.post(
        route('qr.deactivate', { id: qrData.id }),
        {},
        {
          preserveScroll: true,
        },
      );
    }
  };

  const handlePreviewQrInNewTab = () => {
    if (!qrCodeSvg) return;
    const newWindow = window.open('', '_blank', 'width=300,height=300');
    if (newWindow) {
      newWindow.document.write(`
        <html><head><title>QR Preview</title></head>
        <body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh">
          ${qrCodeSvg}
        </body></html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="QR Code Absensi" />
      <div className="flex">
        <div className="from-background to-muted/20 flex w-full max-w-2xl flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">
          <ToastNotification message={toastMessage} type={toastType} visible={showToast} />
          <ModalConfirm
            open={showConfirmModal}
            title="Nonaktifkan QR Code"
            description="Yakin ingin menonaktifkan QR Code ini?"
            onCancel={() => setShowConfirmModal(false)}
            onConfirm={confirmDeactivate}
          />

          <h1 className="text-xl font-bold sm:text-2xl">Buat Absensi</h1>
          <p className="text-muted-foreground">Generate QR Code berdasarkan kegiatan.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="kegiatan_id">Kegiatan</Label>
              <Select value={data.kegiatan_id} onValueChange={(val) => setData('kegiatan_id', val)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kegiatan" />
                </SelectTrigger>
                <SelectContent>
                  {kegiatan.map((k) => (
                    <SelectItem key={k.id} value={k.id!.toString()}>
                      {k.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.kegiatan_id && <p className="text-sm text-red-600">{errors.kegiatan_id}</p>}
            </div>

            <div>
              <Label htmlFor="start_time">Jam Mulai</Label>
              <Input id="start_time" type="time" value={data.start_time} onChange={(e) => setData('start_time', e.target.value)} />
              {errors.start_time && <p className="text-sm text-red-600">{errors.start_time}</p>}
            </div>

            <div>
              <Label htmlFor="end_time">Jam Selesai</Label>
              <Input id="end_time" type="time" value={data.end_time} onChange={(e) => setData('end_time', e.target.value)} />
              {errors.end_time && <p className="text-sm text-red-600">{errors.end_time}</p>}
            </div>

            <Button type="submit" disabled={processing} className="w-full">
              {processing ? 'Memproses...' : 'Generate QR Code'}
            </Button>
          </form>

          {qrData && qrCodeSvg && (
            <div className="bg-muted mt-10 rounded-lg border p-6">
              <h2 className="text-lg font-semibold">Absensi</h2>
              <p className={`mb-4 text-sm font-medium ${qrData.is_active ? 'text-green-600' : 'text-red-500'}`}>
                {qrData.is_active ? 'QR Code ini saat ini aktif dan bisa digunakan untuk absensi.' : 'QR Code ini sudah tidak aktif.'}
              </p>

              <div className="mx-auto h-[250px] w-[250px]" dangerouslySetInnerHTML={{ __html: qrCodeSvg }} />

              <div className="text-muted-foreground mt-10 space-y-1 text-sm">
                <p>
                  <strong>Nama Kegiatan:</strong> {qrData.kegiatan?.name}
                </p>
                <p>
                  <strong>Kegiatan untuk:</strong> {capitalizeFirstLetter(qrData.kegiatan?.audiens || '')}
                </p>
                <p>
                  <strong>Waktu:</strong> {qrData.start_time} - {qrData.end_time}
                </p>
                <p>
                  <strong>Status:</strong> {qrData.is_active ? 'Aktif' : 'Nonaktif'}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-center gap-4">
                {qrData.is_active && (
                  <Button variant="destructive" onClick={handleDeactivate}>
                    Nonaktifkan QR Code
                  </Button>
                )}
                <Button variant="outline" onClick={handlePreviewQrInNewTab}>
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
