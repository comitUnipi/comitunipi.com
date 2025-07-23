import ButtonExport from '@/components/app-button-export';
import ModalConfirm from '@/components/app-modal-confirm';
import Pagination from '@/components/pagination';
import ToastNotification from '@/components/toast-notification';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { User, type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import UsersFilter from './components/users-filter';
import FormAnggota from './components/users-form';
import { UserTable } from './components/users-table';

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
    role: string;
    position: string;
    status: string;
    jurusan: string;
    minat_keahlian: string;
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
    title: 'Data Anggota',
    href: '/users',
  },
];

export default function UsersIndex({ users, filters, flash }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState(filters.search);
  const [roleFilter, setRoleFilter] = useState(filters.role);
  const [statusFilter, setStatusFilter] = useState(filters.status);
  const [jurusanFilter, setJurusanFilter] = useState(filters.status);
  const [minatKeahlianFilter, setMinatKeahlianFilter] = useState(filters.minat_keahlian);
  const [positionFilter, setPositionFilter] = useState(filters.position);
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
    processing,
    reset,
    errors,
    delete: destroy,
  } = useForm({
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
    } else {
      post(route('users.store'), {
        onSuccess: () => {
          setIsOpen(false);
          reset();
        },
      });
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

  const handleDelete = (id: number) => {
    destroy(route('users.destroy', id));
  };

  const getFilterParams = () => ({
    search: searchTerm,
    role: roleFilter === 'all' ? '' : roleFilter,
    position: positionFilter === 'all' ? '' : positionFilter,
    jurusan: jurusanFilter === 'all' ? '' : jurusanFilter,
    minat_keahlian: minatKeahlianFilter === 'all' ? '' : minatKeahlianFilter,
    is_active: statusFilter === 'all' ? '' : statusFilter,
  });

  const handleFilterRoleChange = (value: string) => {
    setRoleFilter(value);
    router.get(
      route('users.index'),
      {
        ...getFilterParams(),
        role: value === 'all' ? '' : value,
      },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  const handleFilterPositionChange = (value: string) => {
    setPositionFilter(value);
    router.get(
      route('users.index'),
      {
        ...getFilterParams(),
        position: value === 'all' ? '' : value,
      },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  const handleFilterStatusChange = (value: string) => {
    setStatusFilter(value);
    router.get(
      route('users.index'),
      {
        ...getFilterParams(),
        is_active: value === 'all' ? '' : value,
      },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  const handleFilterJurusanChange = (value: string) => {
    setJurusanFilter(value);
    router.get(
      route('users.index'),
      {
        ...getFilterParams(),
        jurusan: value === 'all' ? '' : value,
      },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  const handleFilterMinatKeahlianChange = (value: string) => {
    setMinatKeahlianFilter(value);
    router.get(
      route('users.index'),
      {
        ...getFilterParams(),
        minat_keahlian: value === 'all' ? '' : value,
      },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(route('users.index'), getFilterParams(), {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setRoleFilter('all');
    setPositionFilter('all');
    setJurusanFilter('all');
    setMinatKeahlianFilter('all');
    setStatusFilter('all');
    router.get(route('users.index'));
  };

  const handlePageChange = (page: number) => {
    router.get(
      route('users.index'),
      {
        ...getFilterParams(),
        page,
      },
      {
        preserveState: true,
        preserveScroll: true,
      },
    );
  };

  const exportUrl =
    `/users/export/csv?` +
    new URLSearchParams({
      search: searchTerm ?? '',
      role: roleFilter ?? 'all',
      position: positionFilter ?? 'all',
      is_active: statusFilter ?? 'all',
      jurusan: jurusanFilter ?? 'all',
      minat_keahlian: minatKeahlianFilter ?? 'all',
    }).toString();

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Data Anggota" />
      <div className="from-background to-muted/20 flex h-full flex-1 flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">
        <ToastNotification message={toastMessage} type={toastType} visible={showToast} />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Data Anggota</h1>
            <p className="text-muted-foreground mt-1 text-base">Manajemen untuk mengelola data anggota.</p>
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

          {user.role === 'Super Admin' && (
            <div className="flex gap-4">
              <ButtonExport exportUrl={exportUrl} />
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger>
                  <div className="bg-primary hover:bg-primary/90 flex cursor-pointer items-center rounded-md px-3 py-2 text-sm whitespace-nowrap text-white shadow-lg dark:text-black">
                    <Plus className="mr-2 h-4 w-4" />
                    <span className="sm:inline">Tambah Data</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="mx-4 max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">{editingUser ? 'Ubah Anggota' : 'Tambah Anggota'}</DialogTitle>
                  </DialogHeader>
                  <FormAnggota
                    editingUser={editingUser !== null}
                    handleSubmit={handleSubmit}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                  />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        <UsersFilter
          handleSearch={handleSearch}
          handleFilterRoleChange={handleFilterRoleChange}
          handleFilterPositionChange={handleFilterPositionChange}
          handleFilterStatusChange={handleFilterStatusChange}
          handleFilterJurusanChange={handleFilterJurusanChange}
          handleFilterMinatKeahlianChange={handleFilterMinatKeahlianChange}
          searchTerm={searchTerm}
          roleFilter={roleFilter}
          positionFilter={positionFilter}
          statusFilter={statusFilter}
          jurusanFilter={jurusanFilter}
          minatKeahlianFilter={minatKeahlianFilter}
          setSearchTerm={setSearchTerm}
          handleResetFilters={handleResetFilters}
        />

        <UserTable users={users} user={user} handleEdit={handleEdit} setConfirmDeleteId={setConfirmDeleteId} />
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
