import { formatDate } from '@/lib/format-date';
import { formatRupiah } from '@/lib/format-rupiah';
import { Laporan } from '@/types';

type Props = {
  laporan: Laporan[];
  totalDebit: number;
  totalKredit: number;
  totalSaldo: number;
};

export default function TableLaporanKeuangan({ laporan, totalDebit, totalKredit, totalSaldo }: Props) {
  return (
    <div className="overflow-hidden rounded-md border">
      <div className="relative hidden w-full overflow-x-auto lg:block">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="hover:bg-muted/50 border-b transition-colors">
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">No</th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">Tanggal</th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">Jenis</th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">Debit</th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">Kredit</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {laporan.map((data, index) => (
              <tr key={index} className="hover:bg-muted/50 border-b transition-colors">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{formatDate(data.date)}</td>
                <td className="p-4">{data.type}</td>
                <td className="p-4 font-semibold">{data.real_type === 'plus' ? formatRupiah(data.amount) : '-'}</td>
                <td className="p-4 font-semibold">{data.real_type === 'minus' ? formatRupiah(data.amount) : '-'}</td>
              </tr>
            ))}
            {laporan.length > 0 && (
              <>
                <tr className="hover:bg-muted/50 border-b font-semibold transition-colors">
                  <td colSpan={3} className="p-4 text-right">
                    Total Debit
                  </td>
                  <td className="p-4">{formatRupiah(totalDebit)}</td>
                  <td className="p-4">-</td>
                </tr>
                <tr className="hover:bg-muted/50 border-b font-semibold transition-colors">
                  <td colSpan={3} className="p-4 text-right">
                    Total Kredit
                  </td>
                  <td className="p-4">-</td>
                  <td className="p-4">{formatRupiah(totalKredit)}</td>
                </tr>
                <tr className="hover:bg-muted/50 border-b font-semibold transition-colors">
                  <td colSpan={4} className="p-4 text-right">
                    Total Saldo
                  </td>
                  <td className="p-4">{formatRupiah(totalSaldo)}</td>
                </tr>
              </>
            )}
            {laporan.length === 0 && (
              <tr>
                <td colSpan={5} className="text-muted-foreground p-8 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-4xl">📋</div>
                    <p>Tidak ada data silahkan filter berdasarkan tanggal</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="block lg:hidden">
        {laporan.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {laporan.map((data, index) => (
              <div key={index} className="space-y-3 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-primary text-sm font-medium">{data.type}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{formatDate(data.date)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-3">
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">Debit</p>
                    <p className="text-sm font-semibold">{data.real_type === 'plus' ? formatRupiah(data.amount) : '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">Kredit</p>
                    <p className="text-sm font-semibold">{data.real_type === 'minus' ? formatRupiah(data.amount) : '-'}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="space-y-3 p-4">
              <h3 className="text-muted-foreground mb-3 text-sm font-semibold">Ringkasan</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between border-b border-gray-200 py-2">
                  <span className="text-muted-foreground text-sm font-medium">Total Debit</span>
                  <span className="text-sm font-semibold">{formatRupiah(totalDebit)}</span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 py-2">
                  <span className="text-muted-foreground text-sm font-medium">Total Kredit</span>
                  <span className="text-sm font-semibold">{formatRupiah(totalKredit)}</span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-blue-50 px-3 py-2">
                  <span className="text-sm font-semibold text-gray-900">Total Saldo</span>
                  <span className="text-sm font-bold dark:text-black">{formatRupiah(totalSaldo)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground p-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="text-4xl">📋</div>
              <p className="text-sm">Tidak ada data</p>
              <p className="text-xs">Silahkan filter berdasarkan tanggal</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
