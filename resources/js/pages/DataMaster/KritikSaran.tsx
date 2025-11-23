import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import TableKritikSaran from './components/kritik-saran-table';

interface KritikSaran {
  id: number;
  kategori: string;
  pesan: string;
  created_at: string;
}

interface Props {
  kritik_saran: {
    data: KritikSaran[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
  flash: {
    success?: string;
    error?: string;
  };
}
export default function Pages({ kritik_saran }: Props) {
  const handlePageChange = (page: number) => {
    const url = route('kritik-saran.index', { page });
    window.location.href = url;
  };

  return (
    <AppLayout
      breadcrumbs={[
        {
          title: 'Kritik dan Saran',
          href: '/fitur-khusus/kritik-saran',
        },
      ]}
    >
      <Head title="Kritik dan Saran" />
      <div className="from-background to-muted/20 flex h-full flex-1 flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Heading
            title="Kritik dan Saran"
            description="Daftar semua kritik dan saran dari pengguna."
          />
        </div>

        <TableKritikSaran kritikSaran={kritik_saran.data} />

        <Pagination
          currentPage={kritik_saran.current_page}
          totalItems={kritik_saran.total}
          from={kritik_saran.from}
          to={kritik_saran.to}
          lastPage={kritik_saran.last_page}
          onPageChange={handlePageChange}
        />
      </div>
    </AppLayout>
  );
}
