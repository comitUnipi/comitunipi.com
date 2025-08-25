import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Props = {
  selectedKegiatan: string;
  setSelectedKegiatan: (id: string) => void;
  kegiatanList: { id: number; name: string }[];
  handleFilter: () => void;
  handleReset: () => void;
};

export default function FilterLaporanAbsensi({ selectedKegiatan, setSelectedKegiatan, kegiatanList, handleFilter, handleReset }: Props) {
  return (
    <div className="flex items-end gap-3">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium">Filter Kegiatan</label>
        <Select value={selectedKegiatan} onValueChange={(val) => setSelectedKegiatan(val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Semua Kegiatan" />
          </SelectTrigger>
          <SelectContent>
            {kegiatanList.map((k) => (
              <SelectItem key={k.id} value={k.id.toString()}>
                {k.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleFilter}>Filter</Button>
      <Button variant="outline" onClick={handleReset}>
        Reset
      </Button>
    </div>
  );
}
