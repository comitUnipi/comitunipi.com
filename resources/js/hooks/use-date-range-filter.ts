import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function useDateRangeFilter(routeName: string, initialStart = '', initialEnd = '') {
  const [startDate, setStartDate] = useState(initialStart);
  const [endDate, setEndDate] = useState(initialEnd);

  const handleFilterTanggal = () => {
    router.get(
      route(routeName),
      { start_date: startDate, end_date: endDate },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  const handleResetTanggal = () => {
    setStartDate('');
    setEndDate('');
    router.get(route(routeName));
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
