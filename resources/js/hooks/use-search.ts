import { router } from '@inertiajs/react';
import React from 'react';

interface Props {
  routeName: string;
  getFilterParams?: () => Record<string, unknown>;
}

export default function useSearch({ routeName, getFilterParams }: Props) {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(
      route(routeName),
      { ...getFilterParams },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  return { handleSearch };
}
