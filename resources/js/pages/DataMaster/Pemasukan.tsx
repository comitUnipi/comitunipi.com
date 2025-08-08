import ButtonExport from '@/components/app-button-export';
import ModalConfirm from '@/components/app-modal-confirm';
import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import ToastNotification from '@/components/toast-notification';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Pemasukan, User } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import FilterPemasukan from './components/pemasukan-filter';
import FormPemasukan from './components/pemasukan-form';
import TablePemasukan from './components/pemasukan-table';

interface Props {
  pemasukan: {
    data: Pemasukan[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
  filters: {
    start_date: string;
    end_date: string;
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

export default function Pages({ pemasukan, filters, flash }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingPemasukan, setEditingPemasukan] = useState<Pemasukan | null>(null);
  const [startDate, setStartDate] = useState(filters.start_date);
  const [endDate, setEndDate] = useState(filters.end_date);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const { auth } = usePage<PageProps>().props;
  const user = auth?.user;

  useEffect(() => {
    if (flash?.success) {
      setToastMessage(flash.success);
      setToastType('success');
      setShowToast(true);
    } else if (flash?.error) {
      setToastMessage(flash.error);
      setToastType('error');
      setShowToast(true);
    }
  }, [flash]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const {
    data,
    setData,
    post,
    put,
    processing,
    reset,
    delete: destroy,
  } = useForm({
    amount: 0,
    date: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPemasukan) {
      put(route('pemasukan.update', editingPemasukan.id), {
        onSuccess: () => {
          setIsOpen(false);
          setEditingPemasukan(null);
          reset();
        },
      });
    } else {
      post(route('pemasukan.store'), {
        onSuccess: () => {
          setIsOpen(false);
          reset();
        },
      });
    }
  };

  const handleEdit = (pemasukanItem: Pemasukan) => {
    setEditingPemasukan(pemasukanItem);
    setData({
      amount: pemasukanItem.amount,
      date: pemasukanItem.date,
      description: pemasukanItem.description,
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    destroy(route('pemasukan.destroy', id));
  };

  const handlePageChange = (page: number) => {
    router.get(
      route('pemasukan.index'),
      {
        page,
      },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  const handleFilterTanggal = () => {
    router.get(
      route('pemasukan.index'),
      {
        start_date: startDate,
        end_date: endDate,
      },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  const handleResetFilter = () => {
    setStartDate('');
    setEndDate('');
    router.get(route('pemasukan.index'));
  };

  const queryParams = new URLSearchParams(Object.fromEntries(Object.entries(filters).filter(([value]) => value !== '' && value !== null))).toString();
  const exportUrl = `/pemasukan/export/csv?${queryParams}`;

  return (
    <AppLayout
      breadcrumbs={[
        {
          title: 'Data Pemasukan',
          href: '/data-master/data-pemasukan',
        },
      ]}
    >
      <Head title="Data Pemasukan" />
      <div className="from-background to-muted/20 flex h-full flex-1 flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">
        <ToastNotification message={toastMessage} type={toastType} visible={showToast} />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Heading title="Data Pemasukan" description="Manajemen untuk mengelola data pemasukan keuangan." />
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
                    <span className="sm:inline">Tambah Data</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] overflow-y-auto sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">{editingPemasukan ? 'Ubah Data Pemasukan' : 'Tambah Pemasukan'}</DialogTitle>
                  </DialogHeader>
                  <FormPemasukan
                    data={data}
                    setData={setData}
                    editingPemasukan={editingPemasukan !== null}
                    handleSubmit={handleSubmit}
                    processing={processing}
                  />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
        <FilterPemasukan
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          handleFilterTanggal={handleFilterTanggal}
          handleResetFilter={handleResetFilter}
        />
        <TablePemasukan pemasukan={pemasukan} user={user} handleEdit={handleEdit} setConfirmDeleteId={setConfirmDeleteId} />{' '}
        <Pagination
          currentPage={pemasukan.current_page}
          totalItems={pemasukan.total}
          from={pemasukan.from}
          to={pemasukan.to}
          lastPage={pemasukan.last_page}
          onPageChange={handlePageChange}
        />
      </div>
    </AppLayout>
  );
}
