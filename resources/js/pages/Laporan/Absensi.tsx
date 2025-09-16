import ButtonExport from '@/components/app-button-export';
import Heading from '@/components/heading';
import useLaporanAbsensiFilter from '@/hooks/use-laporan-absensi-filter';
import AppLayout from '@/layouts/app-layout';
import { Absensi } from '@/types';
import { Head } from '@inertiajs/react';
import FilterLaporanAbsensi from './components/laporan-absensi-filter';
import TableLaporanAbsensi from './components/laporan-absensi-table';

interface Props {
  laporan: Absensi[];
  totalScan: number;
  statusCounts: {
    hadir: number;
    izin: number;
    sakit: number;
  };
  kegiatanList: { id: number; name: string }[];
  selectedKegiatan?: string;
}

export default function Pages({
  laporan,
  totalScan,
  statusCounts,
  kegiatanList,
  selectedKegiatan,
}: Props) {
  const {
    selectedKegiatanId,
    setSelectedKegiatanId,
    handleFilter,
    handleReset,
  } = useLaporanAbsensiFilter(selectedKegiatan);

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
            <ButtonExport
              exportUrl={`/laporan/absensi/export/csv?kegiatan_id=${selectedKegiatanId}`}
            />
          </div>
        </div>
        <FilterLaporanAbsensi
          selectedKegiatan={selectedKegiatanId}
          setSelectedKegiatan={setSelectedKegiatanId}
          kegiatanList={kegiatanList}
          handleFilter={handleFilter}
          handleReset={handleReset}
        />
        <TableLaporanAbsensi
          laporan={laporan}
          totalScan={totalScan}
          statusCounts={statusCounts}
        />
      </div>
    </AppLayout>
  );
}
