import ButtonExport from '@/components/app-button-export';
import ModalConfirm from '@/components/app-modal-confirm';
import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import ToastNotification from '@/components/toast-notification';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Kas, User } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import FilterKas from './components/kas-filter';
import FormKas from './components/kas-form';
import TableKas from './components/kas-table';

interface Props {
  kas: {
    data: Kas[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
  users: User[];
  filters: {
    search: string;
    type: string;
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

export default function Pages({ kas, users, filters, flash }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingKAS, setEditingKAS] = useState<Kas | null>(null);
  const [searchTerm, setSearchTerm] = useState(filters.search);
  const [typeFilter, setTypeFilter] = useState(filters.type);
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
    user_id: 0,
    amount: 0,
    date: '',
    type: '',
  });

  const handleFilterTypeChange = (value: string) => {
    setTypeFilter(value);
    router.get(
      route('kas.index'),
      {
        search: searchTerm,
        start_date: startDate,
        end_date: endDate,
        type: value === 'all' ? '' : value,
      },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingKAS) {
      put(route('kas.update', editingKAS.id), {
        onSuccess: () => {
          setIsOpen(false);
          setEditingKAS(null);
          reset();
        },
      });
    } else {
      post(route('kas.store'), {
        onSuccess: () => {
          setIsOpen(false);
          reset();
        },
      });
    }
  };

  const handleEdit = (kasItem: Kas) => {
    setEditingKAS(kasItem);
    setData((previousData) => ({
      ...previousData,
      amount: kasItem.amount,
      date: kasItem.date,
      type: kasItem.type,
    }));
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    destroy(route('kas.destroy', id));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(
      route('kas.index'),
      { search: searchTerm },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  const handleFilterKas = () => {
    router.get(
      route('kas.index'),
      {
        search: searchTerm,
        type: typeFilter,
        start_date: startDate,
        end_date: endDate,
      },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  const handleResetKas = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setStartDate('');
    setEndDate('');
    router.get(route('kas.index'));
  };

  const handlePageChange = (page: number) => {
    router.get(
      route('kas.index'),
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
  const exportUrl = `/kas/export/csv?${queryParams}`;

  return (
    <AppLayout
      breadcrumbs={[
        {
          title: 'Data Uang KAS',
          href: '/data-master/data-kas',
        },
      ]}
    >
      <Head title="Data Uang Kas" />
      <div className="from-background to-muted/20 flex h-full flex-1 flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">
        <ToastNotification message={toastMessage} type={toastType} visible={showToast} />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Heading title="Data Uang KAS" description="Manajemen untuk mengelola data uang kas anggota dan pengurus." />
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
                    <span className="xs:inline hidden sm:hidden md:inline">Tambah Data</span>
                    <span className="xs:hidden sm:inline md:hidden">Tambah</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] overflow-y-auto sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">{editingKAS ? 'Ubah Data KAS' : 'Tambah KAS'}</DialogTitle>
                  </DialogHeader>
                  <FormKas
                    data={data}
                    setData={setData}
                    editingKAS={editingKAS !== null}
                    handleSubmit={handleSubmit}
                    processing={processing}
                    users={users}
                  />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
        <FilterKas
          typeFilter={typeFilter}
          handleFilterTypeChange={handleFilterTypeChange}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleFilterKas={handleFilterKas}
          handleResetKas={handleResetKas}
          handleSearch={handleSearch}
        />
        <TableKas kas={kas} user={user} handleEdit={handleEdit} setConfirmDeleteId={setConfirmDeleteId} />
        <Pagination
          currentPage={kas.current_page}
          totalItems={kas.total}
          from={kas.from}
          to={kas.to}
          lastPage={kas.last_page}
          onPageChange={handlePageChange}
        />
      </div>
    </AppLayout>
  );
}
