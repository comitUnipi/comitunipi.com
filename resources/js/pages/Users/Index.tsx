import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { CheckCircle2, ChevronLeft, ChevronRight, Eye, Pencil, Plus, Search, Trash2, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    npm: string;
    role: string;
    position: string;
    is_active: boolean;
    jenis_kelamin: string;
    no_wa: string;
    jurusan: string;
    minat_keahlian: string;
    alasan: string;
}

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
                    postition: data.position,
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

    const handleFilterRoleChange = (value: 'all' | 'Guest' | 'User' | 'Admin' | 'Super Admin') => {
        setRoleFilter(value);
        router.get(
            route('users.index'),
            {
                search: searchTerm,
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
                search: searchTerm,
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
                search: searchTerm,
                role: roleFilter,
                jurusan: jurusanFilter,
                minat_keahlian: minatKeahlianFilter,
                is_active: value === 'all' ? '' : value,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleFilterJurusanChange = (value: 'all' | 'Sistem Informasi' | 'Teknologi Informasi' | 'Software Enginner') => {
        setJurusanFilter(value);
        router.get(
            route('users.index'),
            {
                search: searchTerm,
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
                search: searchTerm,
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
        router.get(
            route('users.index'),
            { search: searchTerm, role: roleFilter },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handlePageChange = (page: number) => {
        router.get(
            route('users.index'),
            {
                page,
                search: searchTerm,
                role: roleFilter,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Anggota" />
            <div className="from-background to-muted/20 flex h-full flex-1 flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">
                {showToast && (
                    <div
                        className={`fixed top-4 right-4 z-50 flex max-w-sm items-center gap-2 rounded-lg p-3 shadow-lg sm:p-4 ${
                            toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
                        } animate-in fade-in slide-in-from-top-5 text-sm text-white`}
                    >
                        {toastType === 'success' ? (
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
                        ) : (
                            <XCircle className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
                        )}
                        <span className="break-words">{toastMessage}</span>
                    </div>
                )}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Data Anggota</h1>
                        <p className="text-muted-foreground mt-1 text-sm sm:text-base">manajemen untuk mengelola data anggota</p>
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
                                            <Select value={data.is_active ? '1' : '0'} onValueChange={(val) => setData('is_active', val === '1')}>
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
                                            <Select value={data.is_active ? '1' : '0'} onValueChange={(val) => setData('is_active', val === '1')}>
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

                                <Button type="submit" disabled={processing} className="bg-primary hover:bg-primary/90 w-full text-white shadow-lg">
                                    {editingUser ? 'Ubah Data Anggota' : 'Tambah Anggota'}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Search and Filter Section */}
                <div className="flex flex-col gap-3 sm:gap-4">
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                        <Input placeholder="Cari anggota..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                    </form>

                    {/* Filters - Mobile: Stack vertically, Desktop: Horizontal */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
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
                    </div>
                </div>

                {/* Table Section */}
                <div className="rounded-md border">
                    {/* Desktop Table */}
                    <div className="relative hidden w-full overflow-x-auto lg:block">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="hover:bg-muted/50 border-b transition-colors">
                                    <th className="text-muted-foreground h-12 px-4 text-left font-medium">No</th>
                                    <th className="text-muted-foreground h-12 px-4 text-left font-medium">Nama Lengkap</th>
                                    <th className="text-muted-foreground h-12 px-4 text-left font-medium">NPM</th>
                                    <th className="text-muted-foreground h-12 px-4 text-left font-medium">Jurusan</th>
                                    <th className="text-muted-foreground h-12 px-4 text-left font-medium">Minat Keahlian</th>
                                    <th className="text-muted-foreground h-12 px-4 text-left font-medium">Status</th>
                                    <th className="text-muted-foreground h-12 px-4 text-left font-medium">Posisi</th>
                                    <th className="text-muted-foreground h-12 px-4 text-left font-medium">Role</th>
                                    <th className="text-muted-foreground h-12 px-4 text-center font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {users.data.map((data, index) => (
                                    <tr key={data.id} className="hover:bg-muted/50 border-b transition-colors">
                                        <td className="p-4">{index + 1}</td>
                                        <td className="p-4">{data.name}</td>
                                        <td className="p-4">{data.npm}</td>
                                        <td className="p-4">{data.jurusan}</td>
                                        <td className="p-4">{data.minat_keahlian}</td>
                                        <td className="p-4">
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                                    data.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {data.is_active ? 'Aktif' : 'Nonaktif'}
                                            </span>
                                        </td>
                                        <td className="p-4">{data.position}</td>
                                        <td className="p-4">{data.role}</td>
                                        <td className="space-x-2 p-4 text-center">
                                            <Link
                                                href={route('users.show', data.id)}
                                                className="hover:text-primary inline-flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(data)}
                                                className="hover:text-primary cursor-pointer"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => setConfirmDeleteId(data.id)}
                                                className="hover:text-destructive cursor-pointer"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {users.data.length === 0 && (
                                    <tr>
                                        <td colSpan={9} className="text-muted-foreground p-4 text-center">
                                            Tidak ada data anggota.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card Layout */}
                    <div className="lg:hidden">
                        {users.data.map((data) => (
                            <div key={data.id} className="space-y-3 border-b p-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-base font-semibold">{data.name}</h3>
                                        <p className="text-muted-foreground text-sm">{data.npm}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Link
                                            href={route('users.show', data.id)}
                                            className="hover:text-primary inline-flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleEdit(data)}
                                            className="hover:text-primary h-8 w-8 cursor-pointer"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setConfirmDeleteId(data.id)}
                                            className="hover:text-destructive h-8 w-8 cursor-pointer"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Jurusan:</span>
                                        <p className="font-medium">{data.jurusan}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Minat:</span>
                                        <p className="font-medium">{data.minat_keahlian}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Posisi:</span>
                                        <p className="font-medium">{data.position}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Role:</span>
                                        <p className="font-medium">{data.role}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-muted-foreground text-sm">Status:</span>
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                                            data.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}
                                    >
                                        {data.is_active ? 'Aktif' : 'Nonaktif'}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {users.data.length === 0 && <div className="text-muted-foreground p-6 text-center">Tidak ada data anggota.</div>}
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex flex-col items-center justify-between gap-4 px-2 sm:flex-row">
                    <div className="text-muted-foreground text-center text-sm sm:text-left">
                        Showing {users.from} to {users.to} of {users.total} results
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handlePageChange(users.current_page - 1)}
                            disabled={users.current_page === 1}
                            className="h-8 w-8"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex max-w-xs items-center space-x-1 overflow-x-auto">
                            {Array.from({ length: users.last_page }, (_, i) => i + 1)
                                .slice(Math.max(0, users.current_page - 3), Math.min(users.last_page, users.current_page + 2))
                                .map((page) => (
                                    <Button
                                        key={page}
                                        variant={page === users.current_page ? 'default' : 'outline'}
                                        size="icon"
                                        onClick={() => handlePageChange(page)}
                                        className="h-8 w-8 text-xs"
                                    >
                                        {page}
                                    </Button>
                                ))}
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handlePageChange(users.current_page + 1)}
                            disabled={users.current_page === users.last_page}
                            className="h-8 w-8"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
