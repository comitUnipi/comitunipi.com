import ButtonExport from '@/components/app-button-export';
import ModalConfirm from '@/components/app-modal-confirm';
import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import ToastNotification from '@/components/toast-notification';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import useKegiatanForm from '@/hooks/use-kegiatan-form';
import usePaginate from '@/hooks/use-paginate';
import useSearch from '@/hooks/use-search';
import useToastFlash from '@/hooks/use-toast-flash';
import AppLayout from '@/layouts/app-layout';
import { Kegiatan, User } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import FilterKegiatan from './components/kegiatan-filter';
import FormKegiatan from './components/kegiatan-form';
import TableKegiatan from './components/kegiatan-table';

interface Props {
  kegiatan: {
    data: Kegiatan[];
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
  flash?: {
    success?: string;
    error?: string;
  };
  auth: {
    user: User;
  };
}

export default function Pages({ kegiatan, filters, flash, auth }: Props) {
  const { showToast, toastMessage, toastType } = useToastFlash(flash);
  const { data, setData, handleSubmit, processing, isOpen, setIsOpen, editing, handleEdit } = useKegiatanForm();

  const [searchTerm, setSearchTerm] = useState(filters.search);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const getFilterParams = () => ({
    search: searchTerm,
  });

  const { handlePageChange } = usePaginate({
    routeName: 'kegiatan.index',
    getFilterParams,
  });

  const user = auth?.user;
  const form = useForm();

  const handleDelete = (id: number) => {
    form.delete(route('kegiatan.destroy', id), {
      onSuccess: () => {
        setConfirmDeleteId(null);
      },
    });
  };

  const { handleSearch } = useSearch({
    routeName: 'kegiatan.index',
    getFilterParams,
  });

  const queryParams = new URLSearchParams(
    Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== '' && value !== null)),
  ).toString();
  const exportUrl = `/kegiatan/export/csv?${queryParams}`;

  return (
    <AppLayout
      breadcrumbs={[
        {
          title: 'Data Kegiatan',
          href: '/data-master/data-kegiatan',
        },
      ]}
    >
      <Head title="Data Kegiatan" />
      <div className="from-background to-muted/20 flex h-full flex-1 flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">
        <ToastNotification message={toastMessage} type={toastType} visible={showToast} />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Heading title="Data Kegiatan" description="Manajemen untuk mengelola data kegiatan atau event besar." />
          <ModalConfirm
            open={confirmDeleteId !== null}
            onCancel={() => setConfirmDeleteId(null)}
            onConfirm={() => {
              if (confirmDeleteId !== null) {
                handleDelete(confirmDeleteId);
                setConfirmDeleteId(null);
              }
            }}
          />
          {['Super Admin', 'Finance'].includes(user.role) && (
            <div className="flex gap-4">
              <ButtonExport exportUrl={exportUrl} />
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger>
                  <div className="bg-primary hover:bg-primary/90 flex cursor-pointer items-center rounded-md px-3 py-2 text-sm whitespace-nowrap text-white shadow-lg dark:text-black">
                    <Plus className="mr-2 h-4 w-4" />
                    <span className="md:inline">Tambah Data</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] overflow-y-auto sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">{editing ? 'Ubah Data ' : 'Tambah Data'}</DialogTitle>
                  </DialogHeader>
                  <FormKegiatan data={data} setData={setData} editing={editing !== null} handleSubmit={handleSubmit} processing={processing} />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
        <FilterKegiatan searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
        <TableKegiatan kegiatan={kegiatan} user={user} handleEdit={handleEdit} setConfirmDeleteId={setConfirmDeleteId} />
        <Pagination
          currentPage={kegiatan.current_page}
          totalItems={kegiatan.total}
          from={kegiatan.from}
          to={kegiatan.to}
          lastPage={kegiatan.last_page}
          onPageChange={handlePageChange}
        />
      </div>
    </AppLayout>
  );
}
