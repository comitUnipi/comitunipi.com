import Pagination from '@/components/pagination';
import ToastNotification from '@/components/toast-notification';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { User, type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
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

    const { auth } = usePage().props;
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
        is_active: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingUser) {
            put(route('users.update', editingUser.id), {
                data: {
                    role: data.role,
                    position: data.position,
                    is_active: data.is_active,
                },
                onSuccess: () => {
                    setIsOpen(false);
                    setEditingUser(null);
                    reset();
                },
            });
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
        setData({ ...user });
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

    const handleFilterRoleChange = (value: 'all') => {
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

    const handleFilterPositionChange = (value: 'all') => {
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

    const handleFilterStatusChange = (value: 'all' | '1' | '0') => {
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

    const handleFilterJurusanChange = (value: 'all') => {
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

    const handleFilterMinatKeahlianChange = (value: 'all' | 'Programming' | 'Design Grafis' | 'Computer & Networking' | 'Microsoft Office') => {
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

                    <Dialog open={confirmDeleteId !== null} onOpenChange={() => setConfirmDeleteId(null)}>
                        <DialogContent className="mx-4 sm:max-w-[400px]">
                            <DialogHeader>
                                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                            </DialogHeader>
                            <p>Apakah kamu yakin ingin menghapus data ini?</p>
                            <div className="mt-4 flex justify-end space-x-2">
                                <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>
                                    Batal
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        if (confirmDeleteId !== null) {
                                            handleDelete(confirmDeleteId);
                                            setConfirmDeleteId(null);
                                        }
                                    }}
                                >
                                    Ya, Hapus
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {user.role === 'Super Admin' && (
                        <div className="flex gap-4">
                            <a
                                href={exportUrl}
                                className="flex items-center rounded-md bg-green-600 px-3 py-2 text-sm text-white shadow-lg hover:bg-green-700"
                                download
                            >
                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="sm:inline">Export CSV</span>
                            </a>
                            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                <DialogTrigger>
                                    <div className="bg-primary hover:bg-primary/90 flex cursor-pointer items-center rounded-md px-3 py-2 text-sm whitespace-nowrap text-white shadow-lg dark:text-black">
                                        <Plus className="mr-2 h-4 w-4" />
                                        <span className="hidden sm:inline">Tambah Data</span>
                                        <span className="sm:hidden">Tambah</span>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="mx-4 max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
                                    <DialogHeader>
                                        <DialogTitle className="text-lg sm:text-xl">{editingUser ? 'Ubah Anggota' : 'Tambah Anggota'}</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {editingUser ? (
                                            <div className="space-y-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="role">Role</Label>
                                                    <Select value={data.role} onValueChange={(val) => setData('role', val)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Pilih Role" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Guest">Guest</SelectItem>
                                                            <SelectItem value="User">User</SelectItem>
                                                            <SelectItem value="Finance">Finance</SelectItem>
                                                            <SelectItem value="Admin">Admin</SelectItem>
                                                            <SelectItem value="Super Admin">Super Admin</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="position">Position</Label>
                                                    <Select value={data.position} onValueChange={(val) => setData('position', val)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Pilih Position" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Calon Anggota">Calon Anggota</SelectItem>
                                                            <SelectItem value="Anggota">Anggota</SelectItem>
                                                            <SelectItem value="Ketua Umum">Ketua Umum</SelectItem>
                                                            <SelectItem value="Wakil Ketua">Wakil Ketua</SelectItem>
                                                            <SelectItem value="Bendahara">Bendahara</SelectItem>
                                                            <SelectItem value="Sekretaris">Sekretaris</SelectItem>
                                                            <SelectItem value="Koordinator Akadamik">Koordinator Akadamik</SelectItem>
                                                            <SelectItem value="Koordinator SDM">Koordinator SDM</SelectItem>
                                                            <SelectItem value="Koordinator Kominfo">Koordinator Kominfo</SelectItem>
                                                            <SelectItem value="Koordinator Humas">Koordinator Humas</SelectItem>
                                                            <SelectItem value="Koordinator Prasarana">Koordinator Prasarana</SelectItem>
                                                            <SelectItem value="Humas Internal">Humas Internal</SelectItem>
                                                            <SelectItem value="Humas Eksternal">Humas Eksternal</SelectItem>
                                                            <SelectItem value="Prasarana">Prasarana</SelectItem>
                                                            <SelectItem value="SDM">SDM</SelectItem>
                                                            <SelectItem value="Kominfo">Kominfo</SelectItem>
                                                            <SelectItem value="Staff Programming">Staff Programming</SelectItem>
                                                            <SelectItem value="Staff Design Grafis">Staff Design Grafis</SelectItem>
                                                            <SelectItem value="Staff Comp dan Network">Staff Comp dan Network</SelectItem>
                                                            <SelectItem value="Staff Microsoft Office">Staff Microsoft Office</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="is_active">Status</Label>
                                                    <Select
                                                        value={data.is_active ? '1' : '0'}
                                                        onValueChange={(val) => setData('is_active', val === '1')}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Status Aktif" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="1">Aktif</SelectItem>
                                                            <SelectItem value="0">Nonaktif</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="nama">Nama Lengkap</Label>
                                                    <Input
                                                        placeholder="Nama Lengkap"
                                                        value={data.name}
                                                        onChange={(e) => setData('name', e.target.value)}
                                                        type="text"
                                                        required
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="npm">NPM</Label>
                                                    <Input
                                                        placeholder="NPM"
                                                        value={data.npm}
                                                        onChange={(e) => setData('npm', e.target.value)}
                                                        type="text"
                                                        required
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input
                                                        placeholder="Email"
                                                        value={data.email}
                                                        onChange={(e) => setData('email', e.target.value)}
                                                        type="email"
                                                        required
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="password">Password</Label>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        required
                                                        tabIndex={3}
                                                        autoComplete="new-password"
                                                        value={data.password}
                                                        onChange={(e) => setData('password', e.target.value)}
                                                        disabled={processing}
                                                        placeholder="Password"
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="password_confirmation">Konfirmasi password</Label>
                                                    <Input
                                                        id="password_confirmation"
                                                        type="password"
                                                        required
                                                        tabIndex={4}
                                                        autoComplete="new-password"
                                                        value={data.password_confirmation}
                                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                                        disabled={processing}
                                                        placeholder="Confirm password"
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="no_wa">Nomor Whatsapp</Label>
                                                    <Input
                                                        placeholder="088*********"
                                                        value={data.no_wa}
                                                        onChange={(e) => setData('no_wa', e.target.value)}
                                                        type="text"
                                                        required
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="minat_keahlian">Minat Keahlian</Label>
                                                    <Select value={data.minat_keahlian} onValueChange={(val) => setData('minat_keahlian', val)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Pilih Minat Keahlian" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Programming">Programming</SelectItem>
                                                            <SelectItem value="Design Grafis">Design Grafis</SelectItem>
                                                            <SelectItem value="Computer & Networking">Computer & Networking</SelectItem>
                                                            <SelectItem value="Microsoft Office">Microsoft Office</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="jurusan">Jurusan</Label>
                                                    <Select value={data.jurusan} onValueChange={(val) => setData('jurusan', val)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Pilih Jurusan" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Teknologi Informasi">Teknologi Informasi</SelectItem>
                                                            <SelectItem value="Sistem Informasi">Sistem Informasi</SelectItem>
                                                            <SelectItem value="Software Enginner">Software Enginner</SelectItem>
                                                            <SelectItem value="Akutansi">Akutansi</SelectItem>
                                                            <SelectItem value="Manajemen">Manajemen</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="role">Role</Label>
                                                    <Select value={data.role} onValueChange={(val) => setData('role', val)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Pilih Role" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Guest">Guest</SelectItem>
                                                            <SelectItem value="User">User</SelectItem>
                                                            <SelectItem value="Admin">Admin</SelectItem>
                                                            <SelectItem value="Super Admin">Super Admin</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="is_active">Status</Label>
                                                    <Select
                                                        value={data.is_active ? '1' : '0'}
                                                        onValueChange={(val) => setData('is_active', val === '1')}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Status Aktif" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="1">Aktif</SelectItem>
                                                            <SelectItem value="0">Tidak Aktif</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                                                    <Select value={data.jenis_kelamin} onValueChange={(val) => setData('jenis_kelamin', val)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Jenis Kelamin" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                                            <SelectItem value="Perempuan">Perempuan</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="col-span-1 grid gap-2 sm:col-span-2">
                                                    <Label htmlFor="alasan">Alasan Mengikuti</Label>
                                                    <textarea
                                                        id="alasan"
                                                        required
                                                        value={data.alasan}
                                                        onChange={(e) => setData('alasan', e.target.value)}
                                                        disabled={processing}
                                                        placeholder="Jelaskan alasan kamu mengikuti kegiatan ini"
                                                        className="border-input bg-background ring-offset-background focus-visible:ring-ring placeholder:text-muted-foreground flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-primary hover:bg-primary/90 w-full text-white shadow-lg"
                                        >
                                            {editingUser ? 'Ubah Data Anggota' : 'Tambah Anggota'}
                                        </Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}
                </div>

                {/* Search and Filter Section */}
                <div className="flex flex-col gap-3 sm:gap-4">
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                        <Input placeholder="Cari anggota..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                    </form>

                    {/* Filters - Mobile: Stack vertically, Desktop: Horizontal */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
                        <Select value={roleFilter} onValueChange={handleFilterRoleChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua role</SelectItem>
                                <SelectItem value="Guest">Guest</SelectItem>
                                <SelectItem value="User">User</SelectItem>
                                <SelectItem value="Finance">Finance</SelectItem>
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="Super Admin">Super Admin</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={positionFilter} onValueChange={handleFilterPositionChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by Posisi" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Calon Anggota">Calon Anggota</SelectItem>
                                <SelectItem value="Anggota">Anggota</SelectItem>
                                <SelectItem value="Ketua Umum">Ketua Umum</SelectItem>
                                <SelectItem value="Wakil Ketua">Wakil Ketua</SelectItem>
                                <SelectItem value="Bendahara">Bendahara</SelectItem>
                                <SelectItem value="Sekretaris">Sekretaris</SelectItem>
                                <SelectItem value="Koordinator Akadamik">Koordinator Akadamik</SelectItem>
                                <SelectItem value="Koordinator SDM">Koordinator SDM</SelectItem>
                                <SelectItem value="Koordinator Kominfo">Koordinator Kominfo</SelectItem>
                                <SelectItem value="Koordinator Humas">Koordinator Humas</SelectItem>
                                <SelectItem value="Koordinator Prasarana">Koordinator Prasarana</SelectItem>
                                <SelectItem value="Humas Internal">Humas Internal</SelectItem>
                                <SelectItem value="Humas Eksternal">Humas Eksternal</SelectItem>
                                <SelectItem value="Prasarana">Prasarana</SelectItem>
                                <SelectItem value="SDM">SDM</SelectItem>
                                <SelectItem value="Kominfo">Kominfo</SelectItem>
                                <SelectItem value="Staff Programming">Staff Programming</SelectItem>
                                <SelectItem value="Staff Design Grafis">Staff Design Grafis</SelectItem>
                                <SelectItem value="Staff Comp dan Network">Staff Comp dan Network</SelectItem>
                                <SelectItem value="Staff Microsoft Office">Staff Microsoft Office</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={statusFilter} onValueChange={handleFilterStatusChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua status</SelectItem>
                                <SelectItem value="1">Aktif</SelectItem>
                                <SelectItem value="0">Nonaktif</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={jurusanFilter} onValueChange={handleFilterJurusanChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by jurusan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua jurusan</SelectItem>
                                <SelectItem value="Sistem Informasi">Sistem Informasi</SelectItem>
                                <SelectItem value="Teknologi Informasi">Teknologi Informasi</SelectItem>
                                <SelectItem value="Software Enginner">Software Enginner</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={minatKeahlianFilter} onValueChange={handleFilterMinatKeahlianChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by minat" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua minat</SelectItem>
                                <SelectItem value="Programming">Programming</SelectItem>
                                <SelectItem value="Design Grafis">Design Grafis</SelectItem>
                                <SelectItem value="Computer & Networking">Computer & Networking</SelectItem>
                                <SelectItem value="Microsoft Office">Microsoft Office</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchTerm('');
                                setRoleFilter('all');
                                setPositionFilter('all');
                                setJurusanFilter('all');
                                setMinatKeahlianFilter('all');
                                setStatusFilter('all');
                                router.get(route('users.index'));
                            }}
                            className="flex-1 sm:flex-none"
                        >
                            Reset
                        </Button>
                    </div>
                </div>

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
