import { formatDate } from '@/lib/format-date';
import { formatTime } from '@/lib/format-time';
import { Absensi } from '@/types';

type Props = {
  scans: {
    data: Absensi[];
  };
};

export default function TableAbsensi({ scans }: Props) {
  return (
    <div className="rounded-md border">
      <div className="relative hidden w-full overflow-x-auto lg:block">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="hover:bg-muted/50 border-b transition-colors">
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">
                No
              </th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">
                Tanggal
              </th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">
                Nama
              </th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">
                Kegiatan
              </th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">
                Status
              </th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">
                Alasan
              </th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">
                Waktu Scan
              </th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {scans.data.map((scan, index) => (
              <tr
                key={scan.id}
                className="hover:bg-muted/50 border-b transition-colors"
              >
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{formatDate(scan.scan_date)}</td>
                <td className="p-4">{scan.user?.name ?? '-'}</td>
                <td className="p-4">{scan.qr_code?.kegiatan?.name ?? '-'}</td>
                <td className="p-4 capitalize">{scan.status}</td>
                <td className="p-4">{scan.description ?? '-'}</td>
                <td className="p-4">
                  {scan.scanned_at ? formatTime(scan.scanned_at) : '-'}
                </td>
              </tr>
            ))}
            {scans.data.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-muted-foreground p-8 text-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-4xl">📋</div>
                    <p>Tidak ada data absensi</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="lg:hidden">
        {scans.data.map((scan) => (
          <div
            key={scan.id}
            className="space-y-3 border-b p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold">{scan.user?.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {scan.qr_code?.kegiatan?.name}
                </p>
                <p className="text-muted-foreground text-sm">
                  {scan.description}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Tanggal:</span>
                <p className="font-medium">{formatDate(scan.scan_date)}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Waktu Scan:</span>
                <p className="font-medium">
                  {scan.scanned_at ? formatTime(scan.scanned_at) : '-'}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <p className="font-medium capitalize">{scan.status}</p>
              </div>
            </div>
          </div>
        ))}
        {scans.data.length === 0 && (
          <div className="text-muted-foreground p-6 text-center">
            Tidak ada data absensi.
          </div>
        )}
      </div>
    </div>
  );
}
