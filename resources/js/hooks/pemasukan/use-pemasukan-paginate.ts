import { router } from '@inertiajs/react';

export default function usePemasukanPaginate() {
  const handlePageChange = (page: number) => {
    router.get(
      route('pemasukan.index'),
      { page },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  return { handlePageChange };
}
