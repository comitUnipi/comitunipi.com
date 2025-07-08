import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/format-rupiah';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CheckCircle, Clock, Plus, UserCog, Users } from 'lucide-react';

interface Props {
    stats?: {
        totalUsers: number;
        totalUsersAktif: number;
        totalUsersNonaktif: number;
        totalPengurus: number;
        totalKAS: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({
    stats = {
        totalUsers: 0,
        totalUsersAktif: 0,
        totalUsersNonaktif: 0,
        totalPengurus: 0,
        totalKAS: 0,
    },
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="from-background to-muted/20 flex h-full flex-1 flex-col gap-6 rounded-xl bg-gradient-to-br p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Selamat datang di Dashboard, COMIT</p>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-blue-600/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-500">Total Anggota</CardTitle>
                            <Users className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-500">{stats.totalUsers}</div>
                            <p className="text-muted-foreground text-xs">Total semua termasuk pengurus</p>
                        </CardContent>
                    </Card>

                    <Card className="border-green-500/20 bg-gradient-to-br from-green-500/10 to-green-600/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-green-500">Total Anggota Aktif</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-500">{stats.totalUsersAktif}</div>
                            <p className="text-muted-foreground text-xs">Total semua anggota aktif</p>
                        </CardContent>
                    </Card>

                    <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-yellow-500">Total Anggota Nonaktif</CardTitle>
                            <Clock className="h-4 w-4 text-yellow-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-500">{stats.totalUsersNonaktif}</div>
                            <p className="text-muted-foreground text-xs">Total semua anggota nonaktif termasuk calon anggota</p>
                        </CardContent>
                    </Card>

                    <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-purple-600/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-purple-500">Total Pengurus</CardTitle>
                            <UserCog className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-500">{stats.totalPengurus}</div>
                            <p className="text-muted-foreground text-xs">Total semua badan pengurus harian</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-lg">Total Uang Kas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-primary text-2xl font-bold">{formatRupiah(stats.totalKAS)}</div>
                        </CardContent>
                    </Card>
                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-lg">Total Pemasukan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-primary text-2xl font-bold">{formatRupiah(stats.totalPemasukan)}</div>
                        </CardContent>
                    </Card>
                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-lg">Total Pengeluaran</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-primary text-2xl font-bold">{formatRupiah(stats.totalPengeluaran)}</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
