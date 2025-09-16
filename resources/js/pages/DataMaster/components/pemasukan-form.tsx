import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { formatRupiah } from '@/lib/format-rupiah';
import { parseRupiah } from '@/lib/parse-rupiah';
import { Pemasukan } from '@/types';

type Props = {
  data: Pemasukan;
  editingPemasukan: boolean;
  processing: boolean;
  setData: <K extends keyof Pemasukan>(key: K, value: Pemasukan[K]) => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

export default function FormPemasukan({
  data,
  setData,
  editingPemasukan,
  handleSubmit,
  processing,
}: Props) {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label
            htmlFor="amount"
            className="text-sm font-medium"
          >
            Jumlah
          </Label>
          <Input
            id="amount"
            type="text"
            placeholder="Jumlah Uang"
            value={formatRupiah(data.amount || 0)}
            onChange={(e) => {
              const numericValue = parseRupiah(e.target.value);
              setData('amount', numericValue);
            }}
            required
            className="w-full"
          />
        </div>
        <div className="grid gap-2">
          <Label
            htmlFor="date"
            className="text-sm font-medium"
          >
            Tanggal
          </Label>
          <Input
            id="date"
            type="date"
            value={data.date}
            onChange={(e) => setData('date', e.target.value)}
            required
            className="w-full"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label
          htmlFor="description"
          className="text-sm font-medium"
        >
          Keterangan
        </Label>
        <Textarea
          id="description"
          required
          value={data.description}
          onChange={(e) => setData('description', e.target.value)}
          disabled={processing}
          placeholder="Jelaskan keterangan dari pemasukan ini"
          className="border-input bg-background ring-offset-background focus-visible:ring-ring placeholder:text-muted-foreground flex w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        />
      </div>
      <Button
        type="submit"
        disabled={processing}
        className="w-full"
      >
        {editingPemasukan ? 'Ubah Data pemasukan' : 'Tambah Data'}
      </Button>
    </form>
  );
}
