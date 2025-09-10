import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import ToastNotification from '@/components/toast-notification';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import usePaginate from '@/hooks/use-paginate';
import useSearch from '@/hooks/use-search';
import useToastFlash from '@/hooks/use-toast-flash';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Filter from './components/filter';
import Form from './components/form';
import Table from './components/table';

interface Props {
  users: {
    data: User[];
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

export default function Pages({ users, filters, flash, auth }: Props) {
  const { showToast, toastMessage, toastType } = useToastFlash(flash);
  const [searchTerm, setSearchTerm] = useState(filters.search);
  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const getFilterParams = () => ({
    search: searchTerm,
  });

  const { handlePageChange } = usePaginate({
    routeName: 'badan-pengurus-harian.index',
    getFilterParams,
  });

  const user = auth?.user;

  const { data, setData, processing, reset } = useForm({
    name: '',
    email: '',
    npm: '',
    password: '',
    password_confirmation: '',
    role: '',
    position: '',
    jenis_kelamin: '',
    no_wa: '',
    jurusan: '',
    minat_keahlian: '',
    alasan: '',
    is_active: false as boolean,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingUser) {
      router.put(
        route('users.update', editingUser.id),
        {
          role: data.role,
          position: data.position,
          is_active: data.is_active,
          redirect_to: 'badan-pengurus-harian.index',
        },
        {
          onSuccess: () => {
            setIsOpen(false);
            setEditingUser(null);
            reset();
          },
          preserveState: true,
        },
      );
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setData((previousData) => ({
      ...previousData,
      role: user.role,
      position: user.position,
      is_active: user.is_active,
    }));
    setIsOpen(true);
  };

  const { handleSearch } = useSearch({
    routeName: 'badan-pengurus-harian.index',
    getFilterParams,
  });

  return (
    <AppLayout
      breadcrumbs={[
        {
          title: 'Badan Pengurus Harian',
          href: '/data-master/badan-pengurus-harian',
        },
      ]}
    >
      <Head title="Data Badan Pengurus Harian" />
      <div className="from-background to-muted/20 flex h-full flex-1 flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">
        <ToastNotification message={toastMessage} type={toastType} visible={showToast} />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Heading title="Badan Pengurus Harian" description="Manajemen untuk memperbarui semua data badan pengurus harian." />
          {user.role === 'Super Admin' && (
            <div className="flex gap-4">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">Ubah Data</DialogTitle>
                  </DialogHeader>
                  <Form editingUser={editingUser !== null} handleSubmit={handleSubmit} data={data} setData={setData} processing={processing} />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
        <Filter handleSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Table viewRoute="badan-pengurus-harian.show" users={users} user={user} handleEdit={handleEdit} />
        <Pagination
          currentPage={users.current_page}
          totalItems={users.total}
          from={users.from}
          to={users.to}
          lastPage={users.last_page}
          onPageChange={handlePageChange}
        />
      </div>
    </AppLayout>
  );
}
