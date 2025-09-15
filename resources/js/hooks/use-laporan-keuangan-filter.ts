import { router } from '@inertiajs/react';
import { useState } from 'react';

interface Periode {
  start: string;
  end: string;
}
export default function useLaporanKeuanganFilter(initialPeriode?: Periode) {
  const [startDate, setStartDate] = useState(initialPeriode?.start ?? '');
  const [endDate, setEndDate] = useState(initialPeriode?.end ?? '');

  const handleFilterTanggal = () => {
    router.get(
      route('laporan.index'),
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
    router.get(route('laporan.index'));
  };

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    handleFilterTanggal,
    handleResetTanggal,
  };
}
