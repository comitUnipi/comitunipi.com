import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Kegiatan } from '@/types';

type Props = {
  data: Kegiatan;
  editing: boolean;
  processing: boolean;
  setData: <K extends keyof Kegiatan>(key: K, value: Kegiatan[K]) => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

export default function FormKegiatan({ data, setData, editing, handleSubmit, processing }: Props) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Nama Kegiatan</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            placeholder="Nama kegiatan"
            required
            disabled={processing}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="date">Tanggal</Label>
          <Input id="date" type="date" value={data.date} onChange={(e) => setData('date', e.target.value)} required disabled={processing} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="time">Waktu</Label>
          <Input id="time" type="time" value={data.time} onChange={(e) => setData('time', e.target.value)} required disabled={processing} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Lokasi</Label>
          <Input
            id="location"
            value={data.location}
            onChange={(e) => setData('location', e.target.value)}
            placeholder="Lokasi kegiatan"
            required
            disabled={processing}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="audiens">Audiens</Label>
          <Select value={data.audiens} onValueChange={(value) => setData('audiens', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih audiens" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="umum">Umum</SelectItem>
              <SelectItem value="anggota">Anggota</SelectItem>
              <SelectItem value="pengurus">Pengurus</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Keterangan</Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => setData('description', e.target.value)}
          placeholder="Keterangan kegiatan (opsional)"
          disabled={processing}
        />
      </div>
      <Button type="submit" disabled={processing} className="w-full">
        {editing ? 'Ubah Data Kegiatan' : 'Tambah Kegiatan'}
      </Button>
    </form>
  );
}
