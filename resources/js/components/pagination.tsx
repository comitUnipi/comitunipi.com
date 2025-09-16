import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface Props {
  currentPage: number;
  totalItems: number;
  from: number;
  to: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalItems,
  from,
  to,
  lastPage,
  onPageChange,
}: Props) {
  const generatePageNumbers = () => {
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(lastPage, currentPage + 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="flex flex-col items-center justify-between gap-4 px-2 sm:flex-row">
      <div className="text-muted-foreground text-center text-sm sm:text-left">
        Menampilkan {from} sampai {to} dari {totalItems} data
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex max-w-xs items-center space-x-1 overflow-x-auto">
          {generatePageNumbers().map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? 'default' : 'outline'}
              size="icon"
              onClick={() => onPageChange(page)}
              className="h-8 w-8 text-xs"
            >
              {page}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
          className="h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
