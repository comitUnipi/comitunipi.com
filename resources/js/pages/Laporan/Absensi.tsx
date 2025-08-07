import ButtonExport from '@/components/app-button-export';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/format-date';
import { Absensi } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import FilterLaporanAbsensi from './components/laporan-absensi-filter';
import TableLaporanAbsensi from './components/laporan-absensi-table';

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

export default function Pages({ laporan, periode, totalScan, statusCounts }: Props) {
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
    <AppLayout
      breadcrumbs={[
        {
          title: 'Laporan Absensi',
          href: '/laporan/absensi',
        },
      ]}
    >
      <Head title="Laporan Absensi" />
      <div className="from-background to-muted/20 flex h-full flex-1 flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Heading
            title="Laporan Absensi"
            description="Manajemen untuk mengelola laporan hasil absensi dari scan absensi berdasarkan tanggal tertentu."
          />
          <div className="flex gap-2 sm:gap-4">
            <ButtonExport exportUrl={`/laporan/absensi/export/csv?date=${selectedDate}`} />
          </div>
        </div>
        <FilterLaporanAbsensi
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          handleFilterTanggal={handleFilterTanggal}
          handleResetTanggal={handleResetTanggal}
        />
        {periode && <p>Data anggota yang melakukan absensi pada {formatDate(periode.date)}</p>}
        <TableLaporanAbsensi laporan={laporan} totalScan={totalScan} statusCounts={statusCounts} />
      </div>
    </AppLayout>
  );
}
