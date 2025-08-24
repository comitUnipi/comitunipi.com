import { Button } from '@/components/ui/button';

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
        <label className="text-xs font-medium">Kegiatan</label>
        <select
          value={selectedKegiatan}
          onChange={(e) => setSelectedKegiatan(e.target.value)}
          className="w-64 rounded-md border border-gray-300 p-2 text-sm"
        >
          <option value="">Semua Kegiatan</option>
          {kegiatanList.map((k) => (
            <option key={k.id} value={k.id}>
              {k.name}
            </option>
          ))}
        </select>
      </div>
      <Button onClick={handleFilter}>Filter</Button>
      <Button variant="outline" onClick={handleReset}>
        Reset
      </Button>
    </div>
  );
}
