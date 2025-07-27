import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { capitalizeFirstLetter } from '@/lib/capitalize-first-letter';
import { formatDate } from '@/lib/format-date';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const breadcrumbs = [
  {
    title: 'Form Izin',
    href: '/absensi/create',
  },
];

export default function Form() {
  const { flash, kegiatan } = usePage().props;
  const { data, setData, post, processing } = useForm({
    tanggal_izin: '',
    alasan: '',
    status: 'izin',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('absensi.store'));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Form Izin" />

      <div className="from-background to-muted/20 flex flex-col gap-6 rounded-xl bg-gradient-to-br p-4 md:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Form Permohonan Izin</h1>
            <p className="text-muted-foreground text-sm">Generate QR Code berdasarkan kegiatan.</p>
          </div>
        </div>

        <div className="max-w-md">
          {kegiatan && (
            <Card className="group transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">{kegiatan.name}</CardTitle>
                <CardDescription className="line-clamp-2">{kegiatan.description || 'Tidak ada deskripsi tersedia'}</CardDescription>
              </CardHeader>

              <CardContent className="text-muted-foreground grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <DetailItem icon={<Calendar className="h-4 w-4" />} text={formatDate(kegiatan.date)} />
                <DetailItem icon={<Clock className="h-4 w-4" />} text={kegiatan.time} />
                <DetailItem icon={<MapPin className="h-4 w-4" />} text={kegiatan.location} />
                <DetailItem icon={<Users className="h-4 w-4" />} text={capitalizeFirstLetter(kegiatan.audiens)} />
              </CardContent>
            </Card>
          )}

          {flash?.success && <div className="my-4 rounded-md bg-green-100 px-4 py-2 text-sm text-green-800">{flash.success}</div>}

          {flash?.error && <div className="my-4 rounded-md bg-red-100 px-4 py-2 text-sm text-red-800">{flash.error}</div>}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1">
              <Label htmlFor="tanggal_izin">Tanggal Izin</Label>
              <Input id="tanggal_izin" type="date" value={data.tanggal_izin} onChange={(e) => setData('tanggal_izin', e.target.value)} required />
            </div>

            <div className="space-y-1">
              <Label htmlFor="alasan">Alasan</Label>
              <Textarea id="alasan" value={data.alasan} onChange={(e) => setData('alasan', e.target.value)} required maxLength={1000} />
            </div>

            <div className="space-y-1">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={data.status}
                onChange={(e) => setData('status', e.target.value)}
                className="border-input bg-background focus:ring-ring w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:ring-2 focus:outline-none"
              >
                <option value="izin">Izin</option>
                <option value="sakit">Sakit</option>
              </select>
            </div>

            <Button type="submit" disabled={processing} className="w-full">
              Kirim
            </Button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}

function DetailItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground">{icon}</span>
      <span className="truncate">{text}</span>
    </div>
  );
}
