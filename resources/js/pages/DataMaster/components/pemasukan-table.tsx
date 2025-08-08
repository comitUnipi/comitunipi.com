import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/format-date';
import { formatRupiah } from '@/lib/format-rupiah';
import { Pemasukan } from '@/types';
import { Pencil, Trash2 } from 'lucide-react';

type CurrentUser = {
  role: string;
};

interface Props {
  pemasukan: {
    data: Pemasukan[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
  user: CurrentUser;
  handleEdit: (pemasukan: Pemasukan) => void;
  setConfirmDeleteId: (id: number) => void;
}

export default function TablePemasukan({ user, pemasukan, handleEdit, setConfirmDeleteId }: Props) {
  return (
    <div className="rounded-md border">
      <div className="relative hidden w-full overflow-x-auto lg:block">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="hover:bg-muted/50 border-b transition-colors">
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">No</th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">Tanggal</th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">Jumlah</th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">Keterangan</th>
              {['Super Admin', 'Finance'].includes(user.role) && <th className="text-muted-foreground h-12 px-4 text-center font-medium">Actions</th>}
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {pemasukan.data.map((data, index) => (
              <tr key={data.id} className="hover:bg-muted/50 border-b transition-colors">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{formatDate(data.date)}</td>
                <td className="p-4">{formatRupiah(data.amount)}</td>
                <td className="p-4">{data.description}</td>
                {['Super Admin', 'Finance'].includes(user.role) && (
                  <td className="space-x-2 p-4 text-center">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(data)} className="hover:text-primary cursor-pointer">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setConfirmDeleteId(data.id!)}
                      className="hover:text-destructive cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                )}
              </tr>
            ))}
            {pemasukan.data.length === 0 && (
              <tr>
                <td colSpan={6} className="text-muted-foreground p-8 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-4xl">📋</div>
                    <p>Tidak ada data pemasukan</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="lg:hidden">
        {pemasukan.data.map((data) => (
          <div key={data.id} className="space-y-3 border-b p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold">{formatRupiah(data.amount)}</h3>
                <p className="text-muted-foreground text-sm">{formatDate(data.date)}</p>
              </div>
              {['Super Admin', 'Finance'].includes(user.role) && (
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(data)} className="hover:text-primary h-8 w-8 cursor-pointer">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setConfirmDeleteId(data.id!)}
                    className="hover:text-destructive h-8 w-8 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Keterangan:</span>
                <p className="font-medium">{data.description}</p>
              </div>
            </div>
          </div>
        ))}
        {pemasukan.data.length === 0 && <div className="text-muted-foreground p-6 text-center">Tidak ada data.</div>}
      </div>
    </div>
  );
}
