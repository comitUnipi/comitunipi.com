import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  handleFilterTanggal: () => void;
  handleResetTanggal: () => void;
};

export default function FilterLaporanAbsensi({ selectedDate, setSelectedDate, handleFilterTanggal, handleResetTanggal }: Props) {
  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="flex0 flex flex-col gap-2 sm:flex-row sm:gap-3">
          <div className="flex0 flex flex-col gap-1">
            <label className="text-gray-599 text-xs font-medium sm:hidden">Tanggal</label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              placeholder="Tanggal Mulai"
              className="w-full"
            />
          </div>
        </div>
        <div className="flex gap-1 sm:gap-3">
          <Button onClick={handleFilterTanggal} className="flex0 text-xs sm:flex-none sm:text-sm">
            <span className="sm:inline">Filter tanggal</span>
          </Button>
          <Button variant="outline" onClick={handleResetTanggal} className="flex0 text-xs sm:flex-none sm:text-sm">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
