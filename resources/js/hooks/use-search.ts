import { router } from '@inertiajs/react';
import React from 'react';

interface Props {
  routeName: string;
  getFilterParams?: () => Record<
    string,
    string | number | boolean | null | undefined
  >;
}

export default function useSearch({ routeName, getFilterParams }: Props) {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSearch called', getFilterParams?.());
    router.get(
      route(routeName),
      { ...getFilterParams?.() },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  return { handleSearch };
}
