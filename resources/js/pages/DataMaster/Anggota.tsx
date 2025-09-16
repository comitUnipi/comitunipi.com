import ButtonExport from '@/components/app-button-export';
import ModalConfirm from '@/components/app-modal-confirm';
import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import ToastNotification from '@/components/toast-notification';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import useAnggotaFilter from '@/hooks/use-anggota-filter';
import useAnggotaForm from '@/hooks/use-anggota-form';
import useDelete from '@/hooks/use-delete';
import usePaginate from '@/hooks/use-paginate';
import useSearch from '@/hooks/use-search';
import useToastFlash from '@/hooks/use-toast-flash';
import AppLayout from '@/layouts/app-layout';
import { User } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import FilterAnggota from './components/anggota-filter';
import FormAnggota from './components/anggota-form';
import TableAnggota from './components/anggota-table';

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
  auth: {
    user: User;
  };
}

export default function Pages({ users, filters, flash, auth }: Props) {
  const { showToast, toastMessage, toastType } = useToastFlash(flash);
  const { data, setData, errors, handleSubmit, processing, isOpen, setIsOpen, editing, handleEdit } = useAnggotaForm();
  const {
    searchTerm,
    setSearchTerm,
    roleFilter,
    positionFilter,
    statusFilter,
    jurusanFilter,
    minatKeahlianFilter,
    getFilterParams,
    handleFilterRoleChange,
    handleFilterPositionChange,
    handleFilterStatusChange,
    handleFilterJurusanChange,
    handleFilterMinatKeahlianChange,
    handleResetFilters,
  } = useAnggotaFilter({ initialFilters: filters });

  const { confirmDeleteId, setConfirmDeleteId, handleDelete } = useDelete('users.destroy');

  const user = auth?.user;

  const { handleSearch } = useSearch({
    routeName: 'users.index',
    getFilterParams,
  });

  const { handlePageChange } = usePaginate({
    routeName: 'users.index',
    getFilterParams,
  });

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
    <AppLayout
      breadcrumbs={[
        {
          title: 'Data Anggota',
          href: '/data-master/data-anggota',
        },
      ]}
    >
      <Head title="Data Anggota" />
      <div className="from-background to-muted/20 flex h-full flex-1 flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">
        <ToastNotification message={toastMessage} type={toastType} visible={showToast} />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Heading title="Data Anggota" description="Manajemen untuk mengelola semua data anggota." />
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
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="text-lg sm:text-xl">{editing ? 'Ubah Anggota' : 'Tambah Anggota'}</DialogTitle>
                  </DialogHeader>
                  <FormAnggota
                    editingUser={editing !== null}
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
        <FilterAnggota
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
        <TableAnggota users={users} user={user} handleEdit={handleEdit} setConfirmDeleteId={setConfirmDeleteId} />
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
