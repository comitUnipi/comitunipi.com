import ButtonExport from '@/components/app-button-export';
import ModalConfirm from '@/components/app-modal-confirm';
import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import ToastNotification from '@/components/toast-notification';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import useToastFlash from '@/hooks/use-toast-flash';
import AppLayout from '@/layouts/app-layout';
import { Kegiatan, User } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
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
}

type PageProps = {
  auth: {
    user: User;
  };
};

export default function Pages({ kegiatan, filters, flash }: Props) {
  const { showToast, toastMessage, toastType } = useToastFlash(flash);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Kegiatan | null>(null);
  const [searchTerm, setSearchTerm] = useState(filters.search);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const { auth } = usePage<PageProps>().props;
  const user = auth?.user;

  const {
    data,
    setData,
    post,
    put,
    processing,
    reset,
    delete: destroy,
  } = useForm({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    audiens: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editing) {
      put(route('kegiatan.update', editing.id), {
        onSuccess: () => {
          setIsOpen(false);
          setEditing(null);
          reset();
        },
      });
    } else {
      post(route('kegiatan.store'), {
        onSuccess: () => {
          setIsOpen(false);
          reset();
        },
      });
    }
  };

  const handleEdit = (kegiatanItem: Kegiatan) => {
    setEditing(kegiatanItem);
    setData({
      name: kegiatanItem.name,
      description: kegiatanItem.description,
      date: kegiatanItem.date,
      time: kegiatanItem.time,
      location: kegiatanItem.location,
      audiens: kegiatanItem.audiens,
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    destroy(route('kegiatan.destroy', id));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(
      route('kegiatan.index'),
      { search: searchTerm },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  const handlePageChange = (page: number) => {
    router.get(
      route('kegiatan.index'),
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
