import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { capitalizeFirstLetter } from '@/lib/capitalize-first-letter';
import { formatDate } from '@/lib/format-date';
import { BreadcrumbItem, Kegiatan } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Calendar, CalendarDays, Clock, MapPin, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Kegiatan Terbaru', href: '/kegiatan/terbaru' }];

interface Props {
    kegiatan: Kegiatan[];
}

interface UserType {
    role: string;
    is_active: boolean | number;
}

type PageProps = {
    auth: {
        user: UserType;
    };
};

export default function Terbaru({ kegiatan }: Props) {
    const { auth } = usePage<PageProps>().props;
    const user = auth?.user;

    const allowedRoles = ['Super Admin', 'Admin', 'Finance'];
    const isActive = user?.is_active === 1;

    const canViewKegiatan = (item: Kegiatan): boolean => {
        if (!user) return false;

        if (item.audiens === 'umum') return true;

        if (item.audiens === 'pengurus') {
            return allowedRoles.includes(user.role) && isActive;
        }

        if (item.audiens === 'anggota') {
            return user?.role !== 'Guest' && isActive;
        }

        return false;
    };

    const filteredKegiatan = kegiatan.filter((item) => canViewKegiatan(item));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kegiatan Terbaru" />
            <div className="flex h-full flex-1 flex-col space-y-6 p-4 md:p-6">
                <HeadingSmall title="Informasi" description="Kegiatan yang akan datang!!!" />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredKegiatan.length > 0 ? (
                        filteredKegiatan.map((item) => (
                            <div key={item.id} className="group bg-card relative rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
                                <div className="flex flex-col space-y-1.5 pb-4">
                                    <h3 className="text-lg leading-none font-semibold tracking-tight">{item.name}</h3>
                                    <p className="text-muted-foreground line-clamp-2 text-sm">{item.description || 'Tidak ada deskripsi tersedia'}</p>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2 text-sm">
                                        <Calendar className="text-muted-foreground h-4 w-4" />
                                        <span className="text-foreground">{formatDate(item.date)}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm">
                                        <Clock className="text-muted-foreground h-4 w-4" />
                                        <span className="text-foreground">{item.time}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm">
                                        <MapPin className="text-muted-foreground h-4 w-4" />
                                        <span className="text-foreground truncate">{item.location}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-sm">
                                        <Users className="text-muted-foreground h-4 w-4" />
                                        <span className="text-foreground truncate">{capitalizeFirstLetter(item.audiens)}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="animate-in fade-in-50 col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                            <div className="bg-muted mx-auto flex h-20 w-20 items-center justify-center rounded-full">
                                <CalendarDays className="text-muted-foreground h-10 w-10" />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold">Belum Ada Kegiatan</h3>
                            <p className="text-muted-foreground mt-2 mb-4 max-w-sm text-sm">
                                Kegiatan terbaru akan segera hadir. Pantau terus halaman ini untuk mendapatkan informasi terbaru.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
