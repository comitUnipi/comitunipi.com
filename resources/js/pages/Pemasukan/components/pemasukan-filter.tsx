import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
    startDate: string;
    endDate: string;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
    handleFilterTanggal: () => void;
    handleResetFilter: () => void;
};

export default function PemasukanFilter({ startDate, endDate, setStartDate, setEndDate, handleFilterTanggal, handleResetFilter }: Props) {
    return (
        <div className="flex flex-col gap-3 sm:gap-4">
            <p className="text-sm font-medium">Filter berdasarkan tanggal:</p>
            <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    placeholder="Tanggal Mulai"
                    className="w-full sm:w-auto"
                />
                <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="Tanggal Akhir"
                    className="w-full sm:w-auto"
                />
                <div className="flex gap-2">
                    <Button onClick={handleFilterTanggal} className="flex-1 sm:flex-none">
                        <span className="sm:inline">Filter tanggal</span>
                    </Button>
                    <Button variant="outline" onClick={handleResetFilter} className="flex-1 sm:flex-none">
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
}
