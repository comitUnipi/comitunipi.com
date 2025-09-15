import ButtonExport from '@/components/app-button-export';
import ModalConfirm from '@/components/app-modal-confirm';
import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import ToastNotification from '@/components/toast-notification';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import useDateRangeFilter from '@/hooks/use-date-range-filter';
import usePaginate from '@/hooks/use-paginate';
import usePengeluaranForm from '@/hooks/use-pengeluaran-form';
import useToastFlash from '@/hooks/use-toast-flash';
import AppLayout from '@/layouts/app-layout';
import { Pengeluaran, User } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import FilterPengeluaran from './components/pengeluaran-filter';
import FormPengeluaran from './components/pengeluaran-form';
import TablePengeluaran from './components/pengeluaran-table';

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
  auth: {
    user: User;
  };
}

export default function Pages({ pengeluaran, filters, flash, auth }: Props) {
  const { showToast, toastMessage, toastType } = useToastFlash(flash);
  const { handlePageChange } = usePaginate({ routeName: 'pengeluaran.index' });
  const { data, setData, handleSubmit, processing, isOpen, setIsOpen, editingPengeluaran, handleEdit } = usePengeluaranForm();
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    handleFilterTanggal,
    handleResetTanggal: handleResetFilter,
  } = useDateRangeFilter('pengeluaran.index', filters.start_date, filters.end_date);

  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const user = auth?.user;

  const form = useForm();

  const handleDelete = (id: number) => {
    form.delete(route('pengeluaran.destroy', id), {
      onSuccess: () => {
        setConfirmDeleteId(null);
      },
    });
  };

  const queryParams = new URLSearchParams(Object.fromEntries(Object.entries(filters).filter(([value]) => value !== '' && value !== null))).toString();
  const exportUrl = `/pengeluaran/export/csv?${queryParams}`;

  return (
    <AppLayout
      breadcrumbs={[
        {
          title: 'Data Pengeluaran',
          href: '/data-master/data-pengeluaran',
        },
      ]}
    >
      <Head title="Data Pengeluaran" />
      <div className="from-background to-muted/20 flex h-full flex-1 flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">
        <ToastNotification message={toastMessage} type={toastType} visible={showToast} />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Heading title="Data Pengeluaran" description="Manajemen untuk mengelola data pengeluaran keuangan." />
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
                <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] overflow-y-auto sm:max-w-[600px]">
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
        <FilterPengeluaran
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          handleFilterTanggal={handleFilterTanggal}
          handleResetFilter={handleResetFilter}
        />
        <TablePengeluaran pengeluaran={pengeluaran} user={user} handleEdit={handleEdit} setConfirmDeleteId={setConfirmDeleteId} />
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
