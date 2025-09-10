import { router } from '@inertiajs/react';

interface Props {
  routeName: string;
}

export default function usePaginate({ routeName }: Props) {
  const handlePageChange = (page: number) => {
    router.get(
      route(routeName),
      { page },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  return { handlePageChange };
}
