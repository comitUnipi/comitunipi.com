import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { capitalizeFirstLetter } from '@/lib/capitalize-first-letter';
import { formatDate } from '@/lib/format-date';
import { Kegiatan } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Calendar, CalendarDays, Clock, MapPin, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Props {
  flash?: {
    success?: string;
    error?: string;
  };
  kegiatan?: Kegiatan;
}

const DetailItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground">{icon}</span>
      <span className="truncate">{text}</span>
    </div>
  );
};

export default function Pages({ kegiatan, flash }: Props) {
  const { data, setData, post, processing } = useForm({
    tanggal_izin: '',
    alasan: '',
    status: 'izin',
  });

  const [agreed, setAgreed] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    post(route('absensi.store'));
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setData('tanggal_izin', today);
  }, [setData]);

  return (
    <AppLayout
      breadcrumbs={[
        {
          title: 'Form Permohonan Izin',
          href: '/fitur-utama/form-izin',
        },
      ]}
    >
      <Head title="Form Permohonan Izin" />
      <div className="from-background to-muted/20 flex flex-col gap-6 rounded-xl bg-gradient-to-br p-4 md:p-6">
        <Heading title="Form Permohonan Izin" description="Ajukan permohonan izin atau sakit untuk kegiatan aktif." />
        <div className="max-w-md space-y-6">
          {kegiatan ? (
            kegiatan && (
              <Card className="group transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">{kegiatan.name}</CardTitle>
                  <CardDescription className="text-justify">{kegiatan.description || 'Tidak ada deskripsi tersedia'}</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                  <DetailItem icon={<Calendar className="h-4 w-4" />} text={formatDate(kegiatan.date)} />
                  <DetailItem icon={<Clock className="h-4 w-4" />} text={kegiatan.time} />
                  <DetailItem icon={<MapPin className="h-4 w-4" />} text={kegiatan.location} />
                  <DetailItem icon={<Users className="h-4 w-4" />} text={capitalizeFirstLetter(kegiatan.audiens)} />
                </CardContent>
              </Card>
            )
          ) : (
            <div className="animate-in fade-in-50 col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <div className="bg-muted mx-auto flex h-20 w-20 items-center justify-center rounded-full">
                <CalendarDays className="text-muted-foreground h-10 w-10" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Belum Ada Kegiatan</h3>
              <p className="text-muted-foreground mt-2 mb-4 max-w-sm text-sm">
                Kegiatan terbaru akan segera hadir. Pantau terus halaman ini untuk mendapatkan informasi terbaru.
              </p>
            </div>
          )}
          {flash?.success && <div className="rounded-md bg-green-100 px-4 py-2 text-sm text-green-800">{flash.success}</div>}
          {flash?.error && <div className="rounded-md bg-red-100 px-4 py-2 text-sm text-red-800">{flash.error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="tanggal_izin" value={data.tanggal_izin} />
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="izin">Izin</SelectItem>
                  <SelectItem value="sakit">Sakit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="alasan">Alasan</Label>
              <Textarea
                id="alasan"
                placeholder="Masukkan alasan izin atau sakit..."
                value={data.alasan}
                onChange={(e) => setData('alasan', e.target.value)}
                required
              />
            </div>
            {data.tanggal_izin && (
              <div className="border-muted bg-muted/50 text-muted-foreground rounded-md border p-4 text-sm">
                <p className="text-justify">
                  Dengan ini saya mengajukan permohonan <strong>{data.status}</strong> tidak bisa mengikuti kegiatan COMIT pada tanggal{' '}
                  <strong>{formatDate(data.tanggal_izin)}</strong> dengan alasan: <em>{data.alasan || '...'}</em>.
                </p>
                <p className="mt-2">Saya menyatakan bahwa data yang saya isi adalah benar dan dapat dipertanggung jawabkan.</p>
              </div>
            )}
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="agree" checked={agreed} onCheckedChange={(v) => setAgreed(Boolean(v))} />
              <Label htmlFor="agree" className="text-sm">
                Saya setuju dengan pernyataan di atas.
              </Label>
            </div>
            <Button type="submit" disabled={processing || !agreed} className="w-full">
              Kirim
            </Button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
