import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function useLaporanAbsensiFilter(
  initialKegiatanId: string = '',
) {
  const [selectedKegiatanId, setSelectedKegiatanId] =
    useState(initialKegiatanId);

  const handleFilter = () => {
    const params = selectedKegiatanId
      ? { kegiatan_id: selectedKegiatanId }
      : {};
    router.get(route('laporan.absensi.index'), params, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleReset = () => {
    setSelectedKegiatanId('');
    router.get(route('laporan.absensi.index'));
  };

  return {
    selectedKegiatanId,
    setSelectedKegiatanId,
    handleFilter,
    handleReset,
  };
}
