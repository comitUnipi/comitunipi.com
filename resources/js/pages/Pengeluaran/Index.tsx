import ButtonExport from '@/components/app-button-export';
import ModalConfirm from '@/components/app-modal-confirm';
import Pagination from '@/components/pagination';
import ToastNotification from '@/components/toast-notification';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Pengeluaran, User, type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import PengeluaranFilter from './components/pengeluaran-filter';
import FormPengeluaran from './components/pengeluaran-form';
import PengeluaranTable from './components/pengeluaran-table';

interface Props {
  pengeluaran: {
    data: Pengeluaran[];
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

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Data Pengeluaran',
    href: '/pengeluaran',
  },
];

export default function PengeluaranIndex({ pengeluaran, filters, flash }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingPengeluaran, setEditingPengeluaran] = useState<Pengeluaran | null>(null);
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

    if (editingPengeluaran) {
      put(route('pengeluaran.update', editingPengeluaran.id), {
        onSuccess: () => {
          setIsOpen(false);
          setEditingPengeluaran(null);
          reset();
        },
      });
    } else {
      post(route('pengeluaran.store'), {
        onSuccess: () => {
          setIsOpen(false);
          reset();
        },
      });
    }
  };

  const handleEdit = (pengeluaranItem: Pengeluaran) => {
    setEditingPengeluaran(pengeluaranItem);
    setData({
      amount: pengeluaranItem.amount,
      date: pengeluaranItem.date,
      description: pengeluaranItem.description,
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    destroy(route('pengeluaran.destroy', id));
  };

  const handlePageChange = (page: number) => {
    router.get(
      route('pengeluaran.index'),
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
      route('pengeluaran.index'),
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
    router.get(route('pengeluaran.index'));
  };

  const queryParams = new URLSearchParams(Object.fromEntries(Object.entries(filters).filter(([value]) => value !== '' && value !== null))).toString();

  const exportUrl = `/pengeluaran/export/csv?${queryParams}`;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Data Pengeluaran" />
      <div className="from-background to-muted/20 flex h-full flex-1 flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">
        <ToastNotification message={toastMessage} type={toastType} visible={showToast} />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">Data Pengeluaran</h1>
            <p className="text-muted-foreground mt-1 text-base">Manajemen untuk mengelola data pengeluaran keuangan.</p>
          </div>
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
                    <span className="xs:inline md:inline">Tambah Data</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="mx-4 max-h-[90vh] w-[calc(100vw-2rem)] overflow-y-auto sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">{editingPengeluaran ? 'Ubah Data Pengeluaran' : 'Tambah Pengeluaran'}</DialogTitle>
                  </DialogHeader>
                  <FormPengeluaran
                    data={data}
                    setData={setData}
                    editingPengeluaran={editingPengeluaran !== null}
                    handleSubmit={handleSubmit}
                    processing={processing}
                  />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
        <PengeluaranFilter
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          handleFilterTanggal={handleFilterTanggal}
          handleResetFilter={handleResetFilter}
        />
        <PengeluaranTable pengeluaran={pengeluaran} user={user} handleEdit={handleEdit} setConfirmDeleteId={setConfirmDeleteId} />
        <Pagination
          currentPage={pengeluaran.current_page}
          totalItems={pengeluaran.total}
          from={pengeluaran.from}
          to={pengeluaran.to}
          lastPage={pengeluaran.last_page}
          onPageChange={handlePageChange}
        />
      </div>
    </AppLayout>
  );
}
