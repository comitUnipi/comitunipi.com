import { router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
  initialFilter: string;
  getFilterParams?: () => Record<
    string,
    string | number | boolean | null | undefined
  >;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  startDate: string;
  endDate: string;
  handleResetTanggal: () => void;
}

export default function useKasFilter({
  getFilterParams,
  initialFilter,
  setSearchTerm,
  handleResetTanggal,
}: Props) {
  const [typeFilter, setTypeFilter] = useState(initialFilter);

  const handleFilterKas = () => {
    router.get(
      route('kas.index'),
      {
        type: typeFilter,
        ...getFilterParams?.(),
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
        type: typeValue,
        ...getFilterParams?.(),
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
