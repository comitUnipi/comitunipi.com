import ButtonExport from '@/components/app-button-export';
import Heading from '@/components/heading';
import useDateRangeFilter from '@/hooks/use-date-range-filter';
import AppLayout from '@/layouts/app-layout';
import { Laporan, User } from '@/types';
import { Head } from '@inertiajs/react';
import FilterLaporanKeuangan from './components/laporan-keuangan-filter';
import TableLaporanKeuangan from './components/laporan-keuangan-table';

interface Periode {
  start: string;
  end: string;
}

interface Props {
  laporan: Laporan[];
  periode?: Periode;
  totalSaldo: number;
  totalDebit: number;
  totalKredit: number;
  auth: {
    user: User;
  };
}

export default function Pages({
  laporan,
  periode,
  totalSaldo,
  totalDebit,
  totalKredit,
  auth,
}: Props) {
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    handleFilterTanggal,
    handleResetTanggal,
  } = useDateRangeFilter(
    'laporan.index',
    periode?.start ?? '',
    periode?.end ?? '',
  );

  const user = auth?.user;

  return (
    <AppLayout
      breadcrumbs={[
        {
          title: 'Laporan Keuangan',
          href: '/laporan/keuangan',
        },
      ]}
    >
      <Head title="Laporan Keuangan" />
      <div className="from-background to-muted/20 flex h-full flex-1 flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Heading
            title="Laporan Keuangan"
            description="Manajemen untuk mengelola data laporan keuangan mingguan dan bulanan."
          />
          {['Super Admin', 'Finance'].includes(user.role) && (
            <div className="flex gap-2 sm:gap-4">
              <ButtonExport
                exportUrl={`/laporan/export/csv?end_date=${endDate}&start_date=${startDate}`}
              />
            </div>
          )}
        </div>
        <FilterLaporanKeuangan
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          periode={periode}
          handleFilterTanggal={handleFilterTanggal}
          handleResetTanggal={handleResetTanggal}
        />
        <TableLaporanKeuangan
          laporan={laporan}
          totalDebit={totalDebit}
          totalKredit={totalKredit}
          totalSaldo={totalSaldo}
        />
      </div>
    </AppLayout>
  );
}
