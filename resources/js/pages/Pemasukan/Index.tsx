import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/format-date';
import { formatRupiah } from '@/lib/format-rupiah';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { CheckCircle2, ChevronLeft, ChevronRight, Pencil, Plus, Trash2, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Pemasukan {
    id: number;
    amount: number;
    date: string;
    description: string;
}

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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Pemasukan',
        href: '/pemasukan',
    },
];

export default function PemasukanIndex({ pemasukan, filters, flash }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingPemasukan, setEditingPemasukan] = useState<Pemasukan | null>(null);
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
        amount: null,
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

    const queryParams = new URLSearchParams(
        Object.fromEntries(Object.entries(filters).filter(([value]) => value !== '' && value !== null)),
    ).toString();

    const exportUrl = `/pemasukan/export/csv?${queryParams}`;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Pemasukan" />
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
                        <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">Data Pemasukan</h1>
                        <p className="text-muted-foreground mt-1 text-base">Manajemen untuk mengelola data pemasukan keuangan.</p>
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
                                    <span className="xs:inline hidden sm:hidden md:inline">Tambah Data</span>
                                    <span className="xs:hidden sm:inline md:hidden">Tambah</span>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="mx-4 max-h-[90vh] w-[calc(100vw-2rem)] overflow-y-auto sm:max-w-[600px]">
                                <DialogHeader>
                                    <DialogTitle className="text-lg sm:text-xl">
                                        {editingPemasukan ? 'Ubah Data Pemasukan' : 'Tambah Pemasukan'}
                                    </DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4">
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
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="description" className="text-sm font-medium">
                                            Keterangan
                                        </Label>
                                        <textarea
                                            id="description"
                                            required
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            disabled={processing}
                                            placeholder="Jelaskan keterangan dari pemasukan ini"
                                            className="border-input bg-background ring-offset-background focus-visible:ring-ring placeholder:text-muted-foreground flex w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                                        />
                                    </div>
                                    <Button type="submit" disabled={processing} className="w-full">
                                        {editingPemasukan ? 'Ubah Data pemasukan' : 'Tambah Data'}
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4">
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
                                        route('pemasukan.index'),
                                        {
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
                                    setStartDate('');
                                    setEndDate('');
                                    router.get(route('pemasukan.index'));
                                }}
                                className="flex-1 sm:flex-none"
                            >
                                Reset
                            </Button>
                        </div>
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
                                    <th className="text-muted-foreground h-12 px-4 text-left font-medium">Tanggal</th>
                                    <th className="text-muted-foreground h-12 px-4 text-left font-medium">Jumlah</th>
                                    <th className="text-muted-foreground h-12 px-4 text-left font-medium">Keterangan</th>
                                    <th className="text-muted-foreground h-12 px-4 text-center font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {pemasukan.data.map((data, index) => (
                                    <tr key={data.id} className="hover:bg-muted/50 border-b transition-colors">
                                        <td className="p-4">{index + 1}</td>
                                        <td className="p-4">{formatDate(data.date)}</td>
                                        <td className="p-4">{formatRupiah(data.amount)}</td>
                                        <td className="p-4">{data.description}</td>
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
                                {pemasukan.data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-muted-foreground p-8 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="text-4xl">📋</div>
                                                <p>Tidak ada data pemasukan</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Mobile Card Layout */}
                    <div className="lg:hidden">
                        {pemasukan.data.map((data) => (
                            <div key={data.id} className="space-y-3 border-b p-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-base font-semibold">{formatRupiah(data.amount)}</h3>
                                        <p className="text-muted-foreground text-sm">{formatDate(data.date)}</p>
                                    </div>
                                    <div className="flex space-x-2">
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
                                        <span className="text-muted-foreground">Keterangan:</span>
                                        <p className="font-medium">{data.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {pemasukan.data.length === 0 && <div className="text-muted-foreground p-6 text-center">Tidak ada data.</div>}
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex flex-col items-center justify-between gap-4 px-2 sm:flex-row">
                    <div className="text-muted-foreground text-center text-xs sm:text-sm">
                        Menampilkan {pemasukan.from} sampai {pemasukan.to} dari {pemasukan.total} data
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handlePageChange(pemasukan.current_page - 1)}
                            disabled={pemasukan.current_page === 1}
                            className="h-8 w-8"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex max-w-[200px] items-center space-x-1 overflow-x-auto sm:max-w-xs">
                            {Array.from({ length: pemasukan.last_page }, (_, i) => i + 1)
                                .slice(Math.max(0, pemasukan.current_page - 2), Math.min(pemasukan.last_page, pemasukan.current_page + 1))
                                .map((page) => (
                                    <Button
                                        key={page}
                                        variant={page === pemasukan.current_page ? 'default' : 'outline'}
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
                            onClick={() => handlePageChange(pemasukan.current_page + 1)}
                            disabled={pemasukan.current_page === pemasukan.last_page}
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
