import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { JURUSAN_OPTIONS, MINAT_KEAHLIAN_OPTIONS, POSITION_OPTIONS, ROLE_OPTIONS, STATUS_OPTIONS } from '../constants/form-option';

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
              {ROLE_OPTIONS.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={positionFilter} onValueChange={handleFilterPositionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Posisi" />
            </SelectTrigger>
            <SelectContent>
              {POSITION_OPTIONS.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={handleFilterStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={jurusanFilter} onValueChange={handleFilterJurusanChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by jurusan" />
            </SelectTrigger>
            <SelectContent>
              {JURUSAN_OPTIONS.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={minatKeahlianFilter} onValueChange={handleFilterMinatKeahlianChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by minat" />
            </SelectTrigger>
            <SelectContent>
              {MINAT_KEAHLIAN_OPTIONS.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
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
