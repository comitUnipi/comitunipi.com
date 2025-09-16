import ModalConfirm from '@/components/app-modal-confirm';
import Heading from '@/components/heading';
import ToastNotification from '@/components/toast-notification';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useQrDeactivate from '@/hooks/use-qr-deactivate';
import useQrForm from '@/hooks/use-qr-form';
import useQrPreview from '@/hooks/use-qr-preview';
import useToastFlash from '@/hooks/use-toast-flash';
import AppLayout from '@/layouts/app-layout';
import { capitalizeFirstLetter } from '@/lib/capitalize-first-letter';
import { Kegiatan } from '@/types';
import { Head } from '@inertiajs/react';

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

export default function Pages({ kegiatan, qrData, qrCodeSvg, flash }: Props) {
  const { showToast, toastMessage, toastType } = useToastFlash(flash);
  const { data, setData, handleSubmit, processing, errors } = useQrForm();
  const { showConfirmModal, openModal, closeModal, confirmDeactivate } =
    useQrDeactivate(qrData?.id);
  const previewQr = useQrPreview(qrCodeSvg);

  return (
    <AppLayout
      breadcrumbs={[
        { title: 'Buat Absensi', href: '/fitur-khusus/buat-absensi' },
      ]}
    >
      <Head title="Buat Absensi" />
      <div className="flex">
        <div className="flex w-full max-w-2xl flex-col gap-4 rounded-xl p-3 sm:gap-6 sm:p-4 md:p-6">
          <ToastNotification
            message={toastMessage}
            type={toastType}
            visible={showToast}
          />
          <ModalConfirm
            open={showConfirmModal}
            title="Nonaktifkan QR Code"
            description="Yakin ingin menonaktifkan QR Code ini?"
            onCancel={closeModal}
            onConfirm={confirmDeactivate}
          />
          <Heading
            title="Buat Absensi"
            description="Generate QRCode berdasarkan kegiatan yang akan dijadwalkan."
          />
          <form
            onSubmit={handleSubmit}
            className="max-w-md space-y-5"
          >
            <div>
              <Label htmlFor="kegiatan_id">Kegiatan</Label>
              <Select
                value={data.kegiatan_id}
                onValueChange={(val) => setData('kegiatan_id', val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kegiatan" />
                </SelectTrigger>
                <SelectContent>
                  {kegiatan.map((k) => (
                    <SelectItem
                      key={k.id}
                      value={k.id!.toString()}
                    >
                      {k.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.kegiatan_id && (
                <p className="text-sm text-red-600">{errors.kegiatan_id}</p>
              )}
            </div>
            <div>
              <Label htmlFor="start_time">Jam Mulai</Label>
              <Input
                id="start_time"
                type="time"
                value={data.start_time}
                onChange={(e) => setData('start_time', e.target.value)}
              />
              {errors.start_time && (
                <p className="text-sm text-red-600">{errors.start_time}</p>
              )}
            </div>
            <div>
              <Label htmlFor="end_time">Jam Selesai</Label>
              <Input
                id="end_time"
                type="time"
                value={data.end_time}
                onChange={(e) => setData('end_time', e.target.value)}
              />
              {errors.end_time && (
                <p className="text-sm text-red-600">{errors.end_time}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={processing}
              className="w-full"
            >
              {processing ? 'Memproses...' : 'Generate QRCode'}
            </Button>
          </form>
          {qrData && qrCodeSvg && (
            <div className="bg-muted mt-10 max-w-md rounded-lg border p-6">
              <h2 className="text-lg font-semibold">Absensi</h2>
              <p
                className={`mb-4 text-sm font-medium ${qrData.is_active ? 'text-green-600' : 'text-red-500'}`}
              >
                {qrData.is_active
                  ? 'QRCode saat ini aktif dan bisa digunakan untuk absensi.'
                  : 'QR Code ini sudah tidak aktif.'}
              </p>
              <div
                className="mx-auto h-[250px] w-[250px]"
                dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
              />
              <div className="text-muted-foreground mt-10 space-y-1 text-sm">
                <p>
                  <span className="font-semibold">Nama Kegiatan:</span>{' '}
                  {qrData.kegiatan?.name}
                </p>
                <p>
                  <span className="font-semibold">Kegiatan untuk:</span>{' '}
                  {capitalizeFirstLetter(qrData.kegiatan?.audiens || '')}
                </p>
                <p>
                  <span className="font-semibold">Waktu:</span>{' '}
                  {qrData.start_time} - {qrData.end_time}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{' '}
                  {qrData.is_active ? 'Aktif' : 'Nonaktif'}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-center gap-4">
                {qrData.is_active && (
                  <Button
                    variant="destructive"
                    onClick={openModal}
                  >
                    Nonaktifkan QRCode
                  </Button>
                )}
                <Button
                  variant="default"
                  onClick={previewQr}
                >
                  Preview QRCode
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
