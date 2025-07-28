import { formatDate } from '@/lib/format-date';
import { formatTime } from '@/lib/format-time';
import { truncateText } from '@/lib/truncate-text';
import { Absensi } from '@/types';

type Props = {
  laporan: Absensi[];
  totalScan: number;
  statusCounts: {
    masuk: number;
    ijin: number;
    sakit: number;
  };
};

export default function LaporanAbsensiTable({ laporan, totalScan, statusCounts }: Props) {
  return (
    <div className="overflow-hidden rounded-md border">
      <div className="relative hidden w-full overflow-x-auto lg:block">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="hover:bg-muted/50 border-b transition-colors">
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">No</th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">Tanggal</th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">Nama</th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">Kegiatan</th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">Status</th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">Alasan</th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">Waktu Scan</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {laporan.map((data, index) => (
              <tr key={data.id} className="hover:bg-muted/50 border-b transition-colors">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{formatDate(data.scan_date)}</td>
                <td className="p-4">{data.user?.name}</td>
                <td className="p-4">{data.qr_code?.kegiatan?.name ?? '-'}</td>
                <td className="p-4">{data.status}</td>
                <td className="p-4">{data.description ? truncateText(data.description) : '-'}</td>
                <td className="p-4">{data.scanned_at ? formatTime(data.scanned_at) : '-'}</td>
              </tr>
            ))}
            {laporan.length > 0 && (
              <>
                <tr className="hover:bg-muted/50 border-b font-semibold transition-colors">
                  <td colSpan={1}></td>
                  <td className="px-4 py-1.5">Total Hadir : {statusCounts.masuk}</td>
                  <td className="px-4 py-1.5">Total Ijin : {statusCounts.ijin}</td>
                  <td className="px-4 py-1.5">Total Sakit : {statusCounts.sakit}</td>
                </tr>
                <tr className="hover:bg-muted/50 border-b font-semibold transition-colors">
                  <td colSpan={1}></td>
                  <td className="px-4 py-1.5">Total Semua : {totalScan}</td>
                </tr>
              </>
            )}
            {laporan.length === 0 && (
              <tr>
                <td colSpan={6} className="text-muted-foreground p-8 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-4xl">📋</div>
                    <p>Tidak ada data, silakan filter berdasarkan tanggal</p>
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
            {laporan.map((data) => (
              <div key={data.id} className="space-y-2 p-4">
                <div className="text-sm font-semibold">{data.user?.name}</div>
                <div className="text-muted-foreground text-sm">{data.qr_code?.kegiatan?.name}</div>
                <div className="text-muted-foreground text-sm">{data.description}</div>
                <div className="flex justify-between text-sm">
                  <span>{formatDate(data.scan_date)}</span>
                  <span>{data.scanned_at ? formatTime(data.scanned_at) : '-'}</span>
                </div>
                <div className="text-xs font-medium text-blue-600 uppercase">{data.status}</div>
              </div>
            ))}
            <div className="text-muted-foreground space-y-1 p-4 text-sm">
              <div>
                Total Masuk: <span className="font-medium text-black">{statusCounts.masuk}</span>
              </div>
              <div>
                Total Ijin: <span className="font-medium text-black">{statusCounts.ijin}</span>
              </div>
              <div>
                Total Sakit: <span className="font-medium text-black">{statusCounts.sakit}</span>
              </div>
            </div>
            <div className="border-t p-4 text-sm font-semibold text-black">Total Absensi: {totalScan}</div>
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
