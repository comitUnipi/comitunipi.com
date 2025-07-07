import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/format-date';
import { formatRupiah } from '@/lib/format-rupiah';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { CheckCircle2, ChevronLeft, ChevronRight, Eye, Pencil, Plus, Search, Trash2, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Kas {
    id: number;
    user_id: string;
    amount: number;
    date: string;
    type: string;
    user: {
        id: number;
        name: string;
    };
}

interface User {
    id: number;
    name: string;
}

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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Uang KAS',
        href: '/kas',
    },
];

export default function KasIndex({ kas, users, filters, flash }: Props) {
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
        user_id: '',
        amount: null,
        date: '',
        type: '',
    });

    const handleFilterTypeChange = (value: 'all') => {
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
        setData({
            amount: kasItem.amount,
            date: kasItem.date,
            type: kasItem.type,
        });
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Uang Kas" />
            <div className="from-background to-muted/20 flex h-full flex-1 flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">
                {showToast && (
                    <div
                        className={`fixed top-4 right-4 z-50 flex max-w-[90vw] items-center gap-2 rounded-lg p-3 shadow-lg sm:max-w-sm sm:p-4 ${
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
                        <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">Data Uang KAS</h1>
                        <p className="text-muted-foreground mt-1 text-xs sm:text-sm md:text-base">
                            manajemen untuk mengelola data uang kas anggota dan pengurus
                        </p>
                    </div>

                    <Dialog open={confirmDeleteId !== null} onOpenChange={() => setConfirmDeleteId(null)}>
                        <DialogContent className="mx-4 w-[calc(100vw-2rem)] sm:max-w-[400px]">
                            <DialogHeader>
                                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                            </DialogHeader>
                            <p className="text-sm sm:text-base">Apakah kamu yakin ingin menghapus data ini?</p>
                            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end sm:space-x-2">
                                <Button variant="outline" onClick={() => setConfirmDeleteId(null)} className="order-2 sm:order-1">
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
                                    className="order-1 sm:order-2"
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
                                <span className="xs:inline hidden sm:hidden md:inline">Tambah Data</span>
                                <span className="xs:hidden sm:inline md:hidden">Tambah</span>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="mx-4 max-h-[90vh] w-[calc(100vw-2rem)] overflow-y-auto sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle className="text-lg sm:text-xl">{editingKAS ? 'Ubah Data KAS' : 'Tambah KAS'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {editingKAS ? (
                                    <>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div className="grid gap-2">
                                                <Label htmlFor="amount" className="text-sm font-medium">
                                                    Jumlah
                                                </Label>
                                                <Input
                                                    id="amount"
                                                    type="number"
                                                    placeholder="Jumlah Uang"
                                                    value={data.amount}
                                                    onChange={(e) => setData('amount', Number(e.target.value))}
                                                    required
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="date" className="text-sm font-medium">
                                                    Tanggal
                                                </Label>
                                                <Input
                                                    id="date"
                                                    type="date"
                                                    value={data.date}
                                                    onChange={(e) => setData('date', e.target.value)}
                                                    required
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="type" className="text-sm font-medium">
                                                    KAS Untuk
                                                </Label>
                                                <Select value={data.type} onValueChange={(val) => setData('type', val)}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih Untuk" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Pengurus">Pengurus</SelectItem>
                                                        <SelectItem value="Anggota">Anggota</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <Button type="submit" disabled={processing} className="w-full">
                                            {editingKAS ? 'Ubah Data Uang KAS' : 'Tambah Data'}
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            <div className="grid gap-2">
                                                <Label htmlFor="user_id" className="text-sm font-medium">
                                                    Pilih Anggota
                                                </Label>
                                                <Select value={data.user_id} onValueChange={(val) => setData('user_id', val)}>
                                                    <SelectTrigger id="user_id" className="w-full">
                                                        <SelectValue placeholder="Pilih Anggota" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {users.map((user) => (
                                                            <SelectItem key={user.id} value={user.id.toString()}>
                                                                {user.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="amount" className="text-sm font-medium">
                                                    Jumlah
                                                </Label>
                                                <Input
                                                    id="amount"
                                                    type="number"
                                                    placeholder="Jumlah Uang"
                                                    value={data.amount}
                                                    onChange={(e) => setData('amount', Number(e.target.value))}
                                                    required
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="date" className="text-sm font-medium">
                                                    Tanggal
                                                </Label>
                                                <Input
                                                    id="date"
                                                    type="date"
                                                    value={data.date}
                                                    onChange={(e) => setData('date', e.target.value)}
                                                    required
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="type" className="text-sm font-medium">
                                                    KAS Untuk
                                                </Label>
                                                <Select value={data.type} onValueChange={(val) => setData('type', val)}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Pilih Untuk" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Pengurus">Pengurus</SelectItem>
                                                        <SelectItem value="Anggota">Anggota</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <Button type="submit" disabled={processing} className="w-full">
                                            {editingKAS ? 'Ubah Data Uang KAS' : 'Tambah Data'}
                                        </Button>
                                    </>
                                )}
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Search and Filter Section */}
                <div className="flex flex-col gap-3 sm:gap-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                        <Select value={typeFilter} onValueChange={handleFilterTypeChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Filter KAS Untuk" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua</SelectItem>
                                <SelectItem value="Pengurus">Pengurus</SelectItem>
                                <SelectItem value="Anggota">Anggota</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <p className="text-sm font-medium">Filter berdasarkan tanggal:</p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            placeholder="Tanggal Mulai"
                            className="w-full sm:w-auto"
                        />
                        <Input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            placeholder="Tanggal Akhir"
                            className="w-full sm:w-auto"
                        />
                        <div className="flex gap-2">
                            <Button
                                onClick={() =>
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
                                    )
                                }
                                className="flex-1 sm:flex-none"
                            >
                                <span className="hidden sm:inline">Filter tanggal</span>
                                <span className="sm:hidden">Filter</span>
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearchTerm('');
                                    setTypeFilter('all');
                                    setStartDate('');
                                    setEndDate('');
                                    router.get(route('kas.index'));
                                }}
                                className="flex-1 sm:flex-none"
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="relative">
                        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                        <Input
                            placeholder="Cari anggota..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10"
                        />
                    </form>
                </div>

                {/* Table Section */}
                <div className="rounded-md border">
                    {/* Desktop Table */}
                    <div className="relative hidden w-full overflow-x-auto lg:block">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="hover:bg-muted/50 border-b transition-colors">
                                    <th className="text-muted-foreground h-12 px-4 text-left font-medium">No</th>
                                    <th className="text-muted-foreground h-12 px-4 text-left font-medium">Nama</th>
                                    <th className="text-muted-foreground h-12 px-4 text-left font-medium">Tanggal Bayar</th>
                                    <th className="text-muted-foreground h-12 px-4 text-left font-medium">Kas Untuk</th>
                                    <th className="text-muted-foreground h-12 px-4 text-left font-medium">Jumlah</th>
                                    <th className="text-muted-foreground h-12 px-4 text-center font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {kas.data.map((data, index) => (
                                    <tr key={data.id} className="hover:bg-muted/50 border-b transition-colors">
                                        <td className="p-4">{index + 1}</td>
                                        <td className="p-4">{data.user?.name}</td>
                                        <td className="p-4">{formatDate(data.date)}</td>
                                        <td className="p-4">{data.type}</td>
                                        <td className="p-4">{formatRupiah(data.amount)}</td>
                                        <td className="space-x-2 p-4 text-center">
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
                                {kas.data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-muted-foreground p-8 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="text-4xl">📋</div>
                                                <p>Tidak ada data KAS</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card Layout */}
                    <div className="block lg:hidden">
                        <div className="space-y-4 p-4">
                            {kas.data.map((data, index) => (
                                <div key={data.id} className="bg-card rounded-lg border p-4 shadow-sm">
                                    <div className="mb-3 flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="mb-1 flex items-center gap-2">
                                                <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
                                                    #{index + 1}
                                                </span>
                                                <span
                                                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                        data.type === 'Pengurus'
                                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                    }`}
                                                >
                                                    {data.type}
                                                </span>
                                            </div>
                                            <h3 className="mb-1 text-base font-semibold">{data.user?.name}</h3>
                                            <p className="text-muted-foreground mb-2 text-sm">{formatDate(data.date)}</p>
                                            <p className="text-primary text-lg font-bold">{formatRupiah(data.amount)}</p>
                                        </div>
                                        <div className="ml-4 flex gap-1">
                                            <Link
                                                href={route('users.show', data.id)}
                                                className="hover:text-primary hover:bg-muted inline-flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors"
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
                                </div>
                            ))}
                            {kas.data.length === 0 && (
                                <div className="py-12 text-center">
                                    <div className="mb-4 text-6xl">📋</div>
                                    <p className="text-muted-foreground text-lg">Tidak ada data KAS</p>
                                    <p className="text-muted-foreground mt-2 text-sm">Mulai dengan menambahkan data KAS pertama</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex flex-col items-center justify-between gap-4 px-2 sm:flex-row">
                    <div className="text-muted-foreground text-center text-xs sm:text-sm">
                        Menampilkan {kas.from} sampai {kas.to} dari {kas.total} data
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handlePageChange(kas.current_page - 1)}
                            disabled={kas.current_page === 1}
                            className="h-8 w-8"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex max-w-[200px] items-center space-x-1 overflow-x-auto sm:max-w-xs">
                            {Array.from({ length: kas.last_page }, (_, i) => i + 1)
                                .slice(Math.max(0, kas.current_page - 2), Math.min(kas.last_page, kas.current_page + 1))
                                .map((page) => (
                                    <Button
                                        key={page}
                                        variant={page === kas.current_page ? 'default' : 'outline'}
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
                            onClick={() => handlePageChange(kas.current_page + 1)}
                            disabled={kas.current_page === kas.last_page}
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
