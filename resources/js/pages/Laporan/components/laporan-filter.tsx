import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/lib/format-date';

type Props = {
    startDate: string;
    endDate: string;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
    handleFilterTanggal: () => void;
    handleResetTanggal: () => void;
    periode?: {
        start: string;
        end: string;
    };
};

export default function LaporanFilter({ startDate, endDate, setStartDate, setEndDate, handleFilterTanggal, handleResetTanggal, periode }: Props) {
    return (
        <div className="flex flex-col gap-3 sm:gap-4">
            <p className="px-2 py-1 text-sm font-medium">
                <span className="hidden sm:inline">Filter berdasarkan tanggal periode: </span>
                <span className="sm:hidden">Periode: </span>
                {periode && (
                    <span>
                        {formatDate(periode.start)} - {formatDate(periode.end)}
                    </span>
                )}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:gap-3">
                    <div className="flex flex-1 flex-col gap-1">
                        <label className="text-xs font-medium text-gray-600 sm:hidden">Tanggal Mulai</label>
                        <Input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            placeholder="Tanggal Mulai"
                            className="w-full"
                        />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                        <label className="text-xs font-medium text-gray-600 sm:hidden">Tanggal Akhir</label>
                        <Input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            placeholder="Tanggal Akhir"
                            className="w-full"
                        />
                    </div>
                </div>
                <div className="flex gap-2 sm:gap-3">
                    <Button onClick={handleFilterTanggal} className="flex-1 text-xs sm:flex-none sm:text-sm">
                        <span className="sm:inline">Filter tanggal</span>
                    </Button>
                    <Button variant="outline" onClick={handleResetTanggal} className="flex-1 text-xs sm:flex-none sm:text-sm">
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
}
