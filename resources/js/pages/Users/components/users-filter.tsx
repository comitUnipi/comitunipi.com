import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface Props {
    handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
    handleFilterRoleChange: (value: string) => void;
    handleFilterPositionChange: (value: string) => void;
    handleFilterStatusChange: (value: string) => void;
    handleFilterJurusanChange: (value: string) => void;
    handleFilterMinatKeahlianChange: (value: string) => void;
    handleResetFilters: () => void;
    setSearchTerm: (value: string) => void;
    searchTerm: string;
    roleFilter: string;
    positionFilter: string;
    statusFilter: string;
    jurusanFilter: string;
    minatKeahlianFilter: string;
}

export default function UsersFilter({
    handleSearch,
    handleFilterRoleChange,
    handleFilterPositionChange,
    handleFilterStatusChange,
    handleFilterJurusanChange,
    handleFilterMinatKeahlianChange,
    searchTerm,
    roleFilter,
    positionFilter,
    statusFilter,
    jurusanFilter,
    minatKeahlianFilter,
    setSearchTerm,
    handleResetFilters,
}: Props) {
    return (
        <>
            <div className="flex flex-col gap-3 sm:gap-4">
                <form onSubmit={handleSearch} className="relative">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                    <Input placeholder="Cari anggota..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                </form>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
                    <Select value={roleFilter} onValueChange={handleFilterRoleChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua role</SelectItem>
                            <SelectItem value="Guest">Guest</SelectItem>
                            <SelectItem value="User">User</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Super Admin">Super Admin</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={positionFilter} onValueChange={handleFilterPositionChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by Posisi" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Calon Anggota">Calon Anggota</SelectItem>
                            <SelectItem value="Anggota">Anggota</SelectItem>
                            <SelectItem value="Ketua Umum">Ketua Umum</SelectItem>
                            <SelectItem value="Wakil Ketua">Wakil Ketua</SelectItem>
                            <SelectItem value="Bendahara">Bendahara</SelectItem>
                            <SelectItem value="Sekretaris">Sekretaris</SelectItem>
                            <SelectItem value="Koordinator Akadamik">Koordinator Akadamik</SelectItem>
                            <SelectItem value="Koordinator SDM">Koordinator SDM</SelectItem>
                            <SelectItem value="Koordinator Kominfo">Koordinator Kominfo</SelectItem>
                            <SelectItem value="Koordinator Humas">Koordinator Humas</SelectItem>
                            <SelectItem value="Koordinator Prasarana">Koordinator Prasarana</SelectItem>
                            <SelectItem value="Humas Internal">Humas Internal</SelectItem>
                            <SelectItem value="Humas Eksternal">Humas Eksternal</SelectItem>
                            <SelectItem value="Prasarana">Prasarana</SelectItem>
                            <SelectItem value="SDM">SDM</SelectItem>
                            <SelectItem value="Kominfo">Kominfo</SelectItem>
                            <SelectItem value="Staff Programming">Staff Programming</SelectItem>
                            <SelectItem value="Staff Design Grafis">Staff Design Grafis</SelectItem>
                            <SelectItem value="Staff Comp dan Network">Staff Comp dan Network</SelectItem>
                            <SelectItem value="Staff Microsoft Office">Staff Microsoft Office</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={statusFilter} onValueChange={handleFilterStatusChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua status</SelectItem>
                            <SelectItem value="1">Aktif</SelectItem>
                            <SelectItem value="0">Nonaktif</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={jurusanFilter} onValueChange={handleFilterJurusanChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by jurusan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua jurusan</SelectItem>
                            <SelectItem value="Sistem Informasi">Sistem Informasi</SelectItem>
                            <SelectItem value="Teknologi Informasi">Teknologi Informasi</SelectItem>
                            <SelectItem value="Software Enginner">Software Enginner</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={minatKeahlianFilter} onValueChange={handleFilterMinatKeahlianChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by minat" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua minat</SelectItem>
                            <SelectItem value="Programming">Programming</SelectItem>
                            <SelectItem value="Design Grafis">Design Grafis</SelectItem>
                            <SelectItem value="Computer & Networking">Computer & Networking</SelectItem>
                            <SelectItem value="Microsoft Office">Microsoft Office</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={handleResetFilters} className="flex-1 sm:flex-none">
                        Reset
                    </Button>
                </div>
            </div>
        </>
    );
}
