import ButtonExport from '@/components/app-button-export';
import AppLayout from '@/layouts/app-layout';
import { Absensi, BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import LaporanAbsensiTable from './components/laporan-absensi-table';
import LaporanFilter from './components/laporan-filter';

interface Props {
  laporan: Absensi[];
  periode?: {
    start: string;
    end: string;
  };
  totalScan: number;
  statusCounts: {
    masuk: number;
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
  const [startDate, setStartDate] = useState(periode?.start ?? '');
  const [endDate, setEndDate] = useState(periode?.end ?? '');

  const handleFilterTanggal = () => {
    router.get(
      route('laporan.absensi.index'),
      {
        start_date: startDate,
        end_date: endDate,
      },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  const handleResetTanggal = () => {
    setStartDate('');
    setEndDate('');
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
            <ButtonExport exportUrl={`/laporan/absensi/export?start_date=${startDate}&end_date=${endDate}`} />
          </div>
        </div>
        <LaporanFilter
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          periode={periode}
          handleFilterTanggal={handleFilterTanggal}
          handleResetTanggal={handleResetTanggal}
        />
        <LaporanAbsensiTable laporan={laporan} totalScan={totalScan} statusCounts={statusCounts} />
      </div>
    </AppLayout>
  );
}
