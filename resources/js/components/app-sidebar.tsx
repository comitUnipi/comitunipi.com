import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { ArrowBigDown, ArrowBigUp, Dock, LayoutGrid, User, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];

const masterNavItems: NavItem[] = [
    {
        title: 'Data Anggota',
        href: '/users',
        icon: Users,
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
        href: '/laporan/keuangan',
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

export function AppSidebar() {
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
                <NavMain label="Data Master" items={masterNavItems} />
                <NavMain label="Laporan" items={laporanNavItems} />
                <NavMain label="Setting" items={settingNavItems} />
            </SidebarContent>
        </Sidebar>
    );
}
