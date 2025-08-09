import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ArrowBigDown, ArrowBigUp, Calendar, Camera, Dock, LayoutGrid, MailIcon, QrCode, TabletSmartphone, User, Users, Users2 } from 'lucide-react';
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
      title: 'Jadwal Kegiatan',
      href: '/fitur-utama/jadwal-kegiatan',
      icon: Calendar,
    },
    {
      title: 'Scan Absensi',
      href: '/fitur-utama/scan-absensi',
      icon: Camera,
    },
    {
      title: 'Form Izin',
      href: '/fitur-utama/form-izin',
      icon: MailIcon,
    },
  ];

  const fiturNavItems: NavItem[] = [
    {
      title: 'Buat Absensi',
      href: '/fitur-khusus/buat-absensi',
      icon: QrCode,
    },
    {
      title: 'Badan Pengurus Harian',
      href: '/fitur-khusus/badan-pengurus-harian',
      icon: Users,
    },
    {
      title: 'Calon Anggota',
      href: '/fitur-khusus/calon-anggota',
      icon: Users,
    },
    {
      title: 'Link Group WA',
      href: '/fitur-khusus/group-whatsapp',
      icon: TabletSmartphone,
    },
  ];

  const masterNavItems: NavItem[] = [
    {
      title: 'Data Anggota',
      href: '/data-master/data-anggota',
      icon: Users,
    },
    {
      title: 'Data Absensi',
      href: '/data-master/data-absensi',
      icon: Users2,
    },
    {
      title: 'Data Kegiatan',
      href: '/data-master/data-kegiatan',
      icon: Calendar,
    },
    {
      title: 'Data Uang KAS',
      href: '/data-master/data-kas',
      icon: Dock,
    },
    {
      title: 'Data Pemasukan',
      href: '/data-master/data-pemasukan',
      icon: ArrowBigDown,
    },
    {
      title: 'Data Pengeluaran',
      href: '/data-master/data-pengeluaran',
      icon: ArrowBigUp,
    },
  ];

  const laporanNavItems: NavItem[] = [
    {
      title: 'Laporan Keuangan',
      href: '/laporan/keuangan',
      icon: Dock,
    },
    {
      title: 'Laporan Absensi',
      href: '/laporan/absensi',
      icon: Users2,
    },
  ];

  const settingNavItems: NavItem[] = [
    {
      title: 'Profile',
      href: '/settings/profile',
      icon: User,
    },
  ];

  const roleAccessMap: Record<
    Role,
    {
      master?: boolean;
      special?: boolean;
      laporan?: boolean;
      setting?: boolean;
    }
  > = {
    'Super Admin': {
      master: true,
      special: true,
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
        {access.special && <NavMain label="Fitur Khusus" items={fiturNavItems} />}
        {access.master && <NavMain label="Data Master" items={masterNavItems} />}
        {access.laporan && <NavMain label="Laporan" items={laporanNavItems} />}
        {access.setting && <NavMain label="Pengaturan" items={settingNavItems} />}
      </SidebarContent>
    </Sidebar>
  );
}
