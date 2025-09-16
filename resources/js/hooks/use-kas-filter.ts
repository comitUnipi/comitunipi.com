import { router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
  initialFilter: string;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  startDate: string;
  endDate: string;
  handleResetTanggal: () => void;
}

export default function useKasFilter({
  initialFilter,
  searchTerm,
  setSearchTerm,
  startDate,
  endDate,
  handleResetTanggal,
}: Props) {
  const [typeFilter, setTypeFilter] = useState(initialFilter);

  const handleFilterKas = () => {
    router.get(
      route('kas.index'),
      {
        search: searchTerm,
        type: typeFilter,
        start_date: startDate,
        end_date: endDate,
      },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  const handleFilterTypeChange = (value: string) => {
    const typeValue = value === 'all' ? '' : value;
    setTypeFilter(value);
    router.get(
      route('kas.index'),
      {
        search: searchTerm,
        start_date: startDate,
        end_date: endDate,
        type: typeValue,
      },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  const handleResetKas = () => {
    setSearchTerm('');
    setTypeFilter('all');
    handleResetTanggal();
    router.get(route('kas.index'));
  };

  return {
    typeFilter,
    setTypeFilter,
    handleFilterKas,
    handleFilterTypeChange,
    handleResetKas,
  };
}
