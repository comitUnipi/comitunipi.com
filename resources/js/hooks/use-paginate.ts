import { router } from '@inertiajs/react';
interface Props {
  routeName: string;
  getFilterParams?: () => Record<string, unknown>;
}

export default function usePaginate({ routeName, getFilterParams }: Props) {
  const handlePageChange = (page: number) => {
    router.get(
      route(routeName),
      { page, ...getFilterParams },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  return { handlePageChange };
}
