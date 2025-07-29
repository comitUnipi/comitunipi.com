import ButtonExport from '@/components/app-button-export';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/format-date';
import { Absensi, BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import LaporanAbsensiFilter from './components/laporan-absensi-filter';
import LaporanAbsensiTable from './components/laporan-absensi-table';

interface Props {
  laporan: Absensi[];
  periode?: {
    date: string;
  };
  totalScan: number;
  statusCounts: {
    hadir: number;
    ijin: number;
    sakit: number;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Laporan Absensi',
    href: '/laporan/absensi',
  },
];

export default function LaporanAbsensi({ laporan, periode, totalScan, statusCounts }: Props) {
  const [selectedDate, setSelectedDate] = useState(periode?.date ?? '');

  const handleFilterTanggal = () => {
    router.get(
      route('laporan.absensi.index'),
      {
        date: selectedDate,
      },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  const handleResetTanggal = () => {
    setSelectedDate('');
    router.get(route('laporan.absensi.index'));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Laporan Absensi" />
      <div className="from-background to-muted/20 flex h-full flex-1 flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">Laporan Absensi</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">Laporan absensi hasil dari scan QR berdasarkan tanggal.</p>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <ButtonExport exportUrl={`/laporan/absensi/export?date=${selectedDate}`} />
          </div>
        </div>
        <LaporanAbsensiFilter
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          handleFilterTanggal={handleFilterTanggal}
          handleResetTanggal={handleResetTanggal}
        />
        {periode && <p>Data anggota yang melakukan absensi pada {formatDate(periode.date)}</p>}
        <LaporanAbsensiTable laporan={laporan} totalScan={totalScan} statusCounts={statusCounts} />
      </div>
    </AppLayout>
  );
}
