import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { formatDate } from '@/lib/format-date';
import { formatRupiah } from '@/lib/format-rupiah';
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface Laporan {
    date: string;
    type: string;
    real_type: 'plus' | 'minus';
    amount: number;
}

interface Periode {
    start: string;
    end: string;
}

interface Props {
    laporan: Laporan[];
    periode?: Periode;
    totalSaldo: number;
    totalDebit: number;
    totalKredit: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Laporan Keuangan',
        href: '/laporan/keuangan',
    },
];

export default function LaporanIndex({ laporan, periode, totalSaldo, totalDebit, totalKredit }: Props) {
    const [startDate, setStartDate] = useState(periode?.start);
    const [endDate, setEndDate] = useState(periode?.end);
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Keuangan" />
            <div className="from-background to-muted/20 flex h-full flex-1 flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">Laporan Keuangan</h1>
                        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                            Manajemen untuk mengelola data laporan keuangan mingguan dan bulanan.
                        </p>
                    </div>
                    {['Super Admin', 'Finance'].includes(user.role) && (
                        <div className="flex gap-2 sm:gap-4">
                            <a
                                href={`/laporan/export/csv?end_date=${endDate}&start_date=${startDate}`}
                                className="flex items-center rounded-md bg-green-600 px-3 py-2 text-sm text-white shadow-lg transition-colors hover:bg-green-700"
                                download
                            >
                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="sm:inline">Export CSV</span>
                            </a>
                        </div>
                    )}
                </div>

                {/* Filter Section */}
                <div className="flex flex-col gap-3 sm:gap-4">
                    <p className="px-2 py-1 text-sm font-medium">
                        <span className="hidden sm:inline">Filter berdasarkan tanggal periode: </span>
                        <span className="sm:hidden">Periode: </span>
                        {periode && (
                            <span>
                                {formatDate(periode.start)} - {formatDate(periode.end)}
                            </span>
                        )}
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                        <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:gap-3">
                            <div className="flex flex-1 flex-col gap-1">
                                <label className="text-xs font-medium text-gray-600 sm:hidden">Tanggal Mulai</label>
                                <Input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    placeholder="Tanggal Mulai"
                                    className="w-full"
                                />
                            </div>
                            <div className="flex flex-1 flex-col gap-1">
                                <label className="text-xs font-medium text-gray-600 sm:hidden">Tanggal Akhir</label>
                                <Input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    placeholder="Tanggal Akhir"
                                    className="w-full"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 sm:gap-3">
                            <Button
                                onClick={() =>
                                    router.get(
                                        route('laporan.index'),
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
                                className="flex-1 text-xs sm:flex-none sm:text-sm"
                            >
                                <span className="hidden sm:inline">Filter tanggal</span>
                                <span className="sm:hidden">Filter</span>
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setStartDate('');
                                    setEndDate('');
                                    router.get(route('laporan.index'));
                                }}
                                className="flex-1 text-xs sm:flex-none sm:text-sm"
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="overflow-hidden rounded-md border">
                    {/* Desktop Table */}
                    <div className="relative hidden w-full overflow-x-auto lg:block">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="hover:bg-muted/50 border-b transition-colors">
                                    <th className="text-muted-foreground h-12 px-4 text-left font-medium">No</th>
                                    <th className="text-muted-foreground h-12 px-4 text-left font-medium">Tanggal</th>
                                    <th className="text-muted-foreground h-12 px-4 text-left font-medium">Jenis</th>
                                    <th className="text-muted-foreground h-12 px-4 text-left font-medium">Debit</th>
                                    <th className="text-muted-foreground h-12 px-4 text-left font-medium">Kredit</th>
                                </tr>
                            </thead>

                            <tbody className="[&_tr:last-child]:border-0">
                                {/* Data Rows */}
                                {laporan.map((data, index) => (
                                    <tr key={index} className="hover:bg-muted/50 border-b transition-colors">
                                        <td className="p-4">{index + 1}</td>
                                        <td className="p-4">{formatDate(data.date)}</td>
                                        <td className="p-4">{data.type}</td>
                                        <td className="p-4 font-semibold">{data.real_type === 'plus' ? formatRupiah(data.amount) : '-'}</td>
                                        <td className="p-4 font-semibold">{data.real_type === 'minus' ? formatRupiah(data.amount) : '-'}</td>
                                    </tr>
                                ))}

                                {/* Totals */}
                                {laporan.length > 0 && (
                                    <>
                                        <tr className="hover:bg-muted/50 border-b font-semibold transition-colors">
                                            <td colSpan={3} className="p-4 text-right">
                                                Total Debit
                                            </td>
                                            <td className="p-4">{formatRupiah(totalDebit)}</td>
                                            <td className="p-4">-</td>
                                        </tr>
                                        <tr className="hover:bg-muted/50 border-b font-semibold transition-colors">
                                            <td colSpan={3} className="p-4 text-right">
                                                Total Kredit
                                            </td>
                                            <td className="p-4">-</td>
                                            <td className="p-4">{formatRupiah(totalKredit)}</td>
                                        </tr>
                                        <tr className="hover:bg-muted/50 border-b font-semibold transition-colors">
                                            <td colSpan={4} className="p-4 text-right">
                                                Total Saldo
                                            </td>
                                            <td className="p-4">{formatRupiah(totalSaldo)}</td>
                                        </tr>
                                    </>
                                )}

                                {/* Empty State */}
                                {laporan.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-muted-foreground p-8 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="text-4xl">📋</div>
                                                <p>Tidak ada data silahkan filter berdasarkan tanggal</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile/Tablet Card View */}
                    <div className="block lg:hidden">
                        {laporan.length > 0 ? (
                            <div className="divide-y divide-gray-200">
                                {laporan.map((data, index) => (
                                    <div key={index} className="space-y-3 p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="mb-2 flex items-center gap-2">
                                                    <span className="text-primary text-sm font-medium">{data.type}</span>
                                                </div>
                                                <p className="text-muted-foreground text-sm">{formatDate(data.date)}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-3">
                                            <div className="space-y-1">
                                                <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">Debit</p>
                                                <p className="text-sm font-semibold">{data.real_type === 'plus' ? formatRupiah(data.amount) : '-'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-muted-foreground text-xs font-medium tracking-wider uppercase">Kredit</p>
                                                <p className="text-sm font-semibold">
                                                    {data.real_type === 'minus' ? formatRupiah(data.amount) : '-'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Mobile Totals */}
                                <div className="space-y-3 p-4">
                                    <h3 className="text-muted-foreground mb-3 text-sm font-semibold">Ringkasan</h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div className="flex items-center justify-between border-b border-gray-200 py-2">
                                            <span className="text-muted-foreground text-sm font-medium">Total Debit</span>
                                            <span className="text-sm font-semibold">{formatRupiah(totalDebit)}</span>
                                        </div>
                                        <div className="flex items-center justify-between border-b border-gray-200 py-2">
                                            <span className="text-muted-foreground text-sm font-medium">Total Kredit</span>
                                            <span className="text-sm font-semibold">{formatRupiah(totalKredit)}</span>
                                        </div>
                                        <div className="flex items-center justify-between rounded-md bg-blue-50 px-3 py-2">
                                            <span className="text-sm font-semibold text-gray-900">Total Saldo</span>
                                            <span className="text-sm font-bold dark:text-black">{formatRupiah(totalSaldo)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-muted-foreground p-8 text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="text-4xl">📋</div>
                                    <p className="text-sm">Tidak ada data</p>
                                    <p className="text-xs">Silahkan filter berdasarkan tanggal</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
