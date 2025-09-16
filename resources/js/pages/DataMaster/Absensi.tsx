import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import usePaginate from '@/hooks/use-paginate';
import useSearch from '@/hooks/use-search';
import AppLayout from '@/layouts/app-layout';
import { Absensi } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import FilterAbsensi from './components/absensi-filter';
import TableAbsensi from './components/absensi-table';

interface Props {
  scans: {
    data: Absensi[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
  filters: {
    search: string;
  };
}

export default function Pages({ scans, filters }: Props) {
  const [searchTerm, setSearchTerm] = useState(filters.search);

  const getFilterParams = () => ({
    search: searchTerm,
  });

  const { handlePageChange } = usePaginate({
    routeName: 'absensi.index',
    getFilterParams,
  });

  const { handleSearch } = useSearch({
    routeName: 'absensi.index',
    getFilterParams,
  });

  return (
    <AppLayout
      breadcrumbs={[
        {
          title: 'Data Absensi',
          href: '/data-master/data-absensi',
        },
      ]}
    >
      <Head title="Data Absensi" />
      <div className="from-background to-muted/20 flex h-full flex-1 flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">
        <Heading title="Data Absensi" description="Manajemen data anggota yang telah melakukan absensi melalui scan Absensi QRCode." />
        <FilterAbsensi searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
        <TableAbsensi scans={scans} />
        <Pagination
          currentPage={scans.current_page}
          totalItems={scans.total}
          from={scans.from}
          to={scans.to}
          lastPage={scans.last_page}
          onPageChange={handlePageChange}
        />
      </div>
    </AppLayout>
  );
}
