import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  onCategoryChange: (category: string) => void;
  defaultValue?: string;
}

export default function KritikSaranFilter({
  onCategoryChange,
  defaultValue,
}: Props) {
  const categories = ['Pelatihan Akademik', 'Kepengurusan', 'Lainnya'];

  return (
    <Select
      onValueChange={(value) => onCategoryChange(value)}
      defaultValue={defaultValue}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="semua">Semua Kategori</SelectItem>
        {categories.map((category) => (
          <SelectItem
            key={category}
            value={category}
          >
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
