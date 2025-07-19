import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface Props {
    typeFilter: string;
    handleFilterTypeChange: (value: string) => void;
    startDate: string;
    setStartDate: (date: string) => void;
    endDate: string;
    setEndDate: (date: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    handleFilterKas: () => void;
    handleResetKas: () => void;
    handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function KasFilter({
    typeFilter,
    handleFilterTypeChange,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    searchTerm,
    setSearchTerm,
    handleFilterKas,
    handleResetKas,
    handleSearch,
}: Props) {
    return (
        <div className="flex flex-col gap-3 sm:gap-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                <Select value={typeFilter} onValueChange={handleFilterTypeChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Filter KAS Untuk" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua</SelectItem>
                        <SelectItem value="Pengurus">Pengurus</SelectItem>
                        <SelectItem value="Anggota">Anggota</SelectItem>
                    </SelectContent>
                </Select>
            </div>
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
                    <Button onClick={handleFilterKas} className="flex-1 sm:flex-none">
                        <span className="sm:inline">Filter tanggal</span>
                    </Button>
                    <Button variant="outline" onClick={handleResetKas} className="flex-1 sm:flex-none">
                        Reset
                    </Button>
                </div>
            </div>
            <form onSubmit={handleSearch} className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <Input placeholder="Cari anggota..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10" />
            </form>
        </div>
    );
}
