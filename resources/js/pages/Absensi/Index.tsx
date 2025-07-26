import Pagination from '@/components/pagination';
import AppLayout from '@/layouts/app-layout';
import { Absensi } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AbsensiFilter from './components/absensi-filter';
import AbsensiTable from './components/absensi-table';

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

const breadcrumbs = [
  {
    title: 'Data Absensi',
    href: '/absensi',
  },
];

export default function AbsensiIndex({ scans, filters }: Props) {
  const [searchTerm, setSearchTerm] = useState(filters.search);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(
      route('absensi.index'),
      { search: searchTerm },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  const handlePageChange = (page: number) => {
    router.get(
      route('absensi.index'),
      {
        page,
        search: searchTerm,
      },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Data Absensi" />
      <div className="from-background to-muted/20 flex h-full flex-1 flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">Data Absensi</h1>
            <p className="text-muted-foreground mt-1 text-base">Daftar anggota yang telah melakukan absensi melalui scan QR Code.</p>
          </div>
        </div>
        <AbsensiFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
        <AbsensiTable scans={scans} />
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
