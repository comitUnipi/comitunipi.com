import { router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
  initialFilters: {
    search: string;
    role: string;
    position: string;
    status: string;
    jurusan: string;
    minat_keahlian: string;
  };
}

export default function useAnggotaFilter({ initialFilters }: Props) {
  const [searchTerm, setSearchTerm] = useState(initialFilters.search);
  const [roleFilter, setRoleFilter] = useState(initialFilters.role);
  const [statusFilter, setStatusFilter] = useState(initialFilters.status);
  const [jurusanFilter, setJurusanFilter] = useState(initialFilters.jurusan);
  const [minatKeahlianFilter, setMinatKeahlianFilter] = useState(initialFilters.minat_keahlian);
  const [positionFilter, setPositionFilter] = useState(initialFilters.position);

  const getFilterParams = () => ({
    search: searchTerm,
    role: roleFilter === 'all' ? '' : roleFilter,
    position: positionFilter === 'all' ? '' : positionFilter,
    jurusan: jurusanFilter === 'all' ? '' : jurusanFilter,
    minat_keahlian: minatKeahlianFilter === 'all' ? '' : minatKeahlianFilter,
    is_active: statusFilter === 'all' ? '' : statusFilter,
  });

  const updateFilter = (key: string, value: string) => {
    const paramValue = value === 'all' ? '' : value;

    const setters: Record<string, (val: string) => void> = {
      role: setRoleFilter,
      position: setPositionFilter,
      status: setStatusFilter,
      jurusan: setJurusanFilter,
      minat_keahlian: setMinatKeahlianFilter,
    };

    if (setters[key]) setters[key](value);

    router.get(
      route('users.index'),
      {
        ...getFilterParams(),
        [key === 'status' ? 'is_active' : key]: paramValue,
      },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setRoleFilter('all');
    setPositionFilter('all');
    setJurusanFilter('all');
    setMinatKeahlianFilter('all');
    setStatusFilter('all');

    router.get(route('users.index'));
  };

  return {
    searchTerm,
    setSearchTerm,
    roleFilter,
    positionFilter,
    statusFilter,
    jurusanFilter,
    minatKeahlianFilter,
    getFilterParams,
    handleResetFilters,
    handleFilterRoleChange: (val: string) => updateFilter('role', val),
    handleFilterPositionChange: (val: string) => updateFilter('position', val),
    handleFilterStatusChange: (val: string) => updateFilter('status', val),
    handleFilterJurusanChange: (val: string) => updateFilter('jurusan', val),
    handleFilterMinatKeahlianChange: (val: string) => updateFilter('minat_keahlian', val),
  };
}
