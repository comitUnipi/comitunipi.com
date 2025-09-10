import { router } from '@inertiajs/react';

export default function usePengeluaranPaginate() {
  const handlePageChange = (page: number) => {
    router.get(
      route('pengeluaran.index'),
      { page },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  return { handlePageChange };
}
