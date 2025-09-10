import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function usePemasukanFilterDate(initialStart: string, initialEnd: string) {
  const [startDate, setStartDate] = useState(initialStart);
  const [endDate, setEndDate] = useState(initialEnd);

  const handleFilterTanggal = () => {
    router.get(
      route('pemasukan.index'),
      { start_date: startDate, end_date: endDate },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  const handleResetFilter = () => {
    setStartDate('');
    setEndDate('');
    router.get(route('pemasukan.index'));
  };

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    handleFilterTanggal,
    handleResetFilter,
  };
}
