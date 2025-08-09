import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface Props {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function FilterKegiatan({ searchTerm, setSearchTerm, handleSearch }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <form onSubmit={handleSearch} className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
        <Input placeholder="Cari kegiatan..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10" />
      </form>
    </div>
  );
}
