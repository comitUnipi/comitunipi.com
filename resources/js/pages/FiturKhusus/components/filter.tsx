import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface Props {
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  setSearchTerm: (value: string) => void;
  searchTerm: string;
}

export default function Filter({ handleSearch, searchTerm, setSearchTerm }: Props) {
  return (
    <>
      <div className="flex flex-col gap-3 sm:gap-4">
        <form onSubmit={handleSearch} className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input placeholder="Cari anggota..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </form>
      </div>
    </>
  );
}
