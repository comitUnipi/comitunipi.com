import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ArrowBigDown, ArrowBigUp, Calendar, Camera, Dock, LayoutGrid, QrCode, User, Users } from 'lucide-react';
import AppLogo from './app-logo';

type Role = 'Super Admin' | 'Admin' | 'Finance' | 'User' | 'Guest' | 'LimitedAccess';

interface UserType {
    id: number;
    name: string;
    email: string;
    role: Role;
    is_active: boolean;
    [key: string]: unknown;
}

interface PageProps {
    auth: {
        user: UserType | null;
    };
    [key: string]: unknown;
}

export function AppSidebar() {
    const { auth } = usePage<PageProps>().props;
    const user =
        auth?.user ??
        ({
            role: 'Guest',
            is_active: false,
        } as UserType);

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Kegiatan Mendatang',
            href: '/kegiatan/terbaru',
            icon: Calendar,
        },
        {
            title: 'Buat Absensi',
            href: '/qr-code/create',
            icon: QrCode,
        },
        {
            title: 'Scan Absensi',
            href: '/qr-code/scan',
            icon: Camera,
        },
    ];

    const masterNavItems: NavItem[] = [
        {
            title: 'Data Anggota',
            href: '/users',
            icon: Users,
        },
        {
            title: 'Data Kegiatan',
            href: '/kegiatan',
            icon: Calendar,
        },
        {
            title: 'Data Uang KAS',
            href: '/kas',
            icon: Dock,
        },
        {
            title: 'Data Pemasukan',
            href: '/pemasukan',
            icon: ArrowBigDown,
        },
        {
            title: 'Data Pengeluaran',
            href: '/pengeluaran',
            icon: ArrowBigUp,
        },
    ];

    const laporanNavItems: NavItem[] = [
        {
            title: 'Laporan Keuangan',
            href: '/laporan',
            icon: Dock,
        },
    ];

    const settingNavItems: NavItem[] = [
        {
            title: 'Profile',
            href: '/settings/profile',
            icon: User,
        },
    ];

    const roleAccessMap: Record<Role, { master?: boolean; laporan?: boolean; setting?: boolean }> = {
        'Super Admin': {
            master: true,
            laporan: true,
            setting: true,
        },
        Admin: {
            master: true,
            laporan: true,
            setting: true,
        },
        Finance: {
            master: true,
            laporan: true,
            setting: true,
        },
        User: {
            setting: true,
        },
        Guest: {
            setting: true,
        },
        LimitedAccess: {
            setting: true,
        },
    };

    const normalizedRole: Role = ['Finance', 'Admin', 'Super Admin'].includes(user.role) && !user.is_active ? 'LimitedAccess' : user.role;

    const access = roleAccessMap[normalizedRole] || {};

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain label="Fitur Utama" items={mainNavItems} />
                {access.master && <NavMain label="Data Master" items={masterNavItems} />}
                {access.laporan && <NavMain label="Laporan" items={laporanNavItems} />}
                {access.setting && <NavMain label="Pengaturan" items={settingNavItems} />}
            </SidebarContent>
        </Sidebar>
    );
}
