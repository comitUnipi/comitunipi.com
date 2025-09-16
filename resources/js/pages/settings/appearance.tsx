import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Pengaturan tampilan',
    href: '/settings/appearance',
  },
];

export default function Appearance() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Pengaturan tampilan" />
      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title="Pengaturan tampilan"
            description="Perbarui pengaturan tampilan akun kamu"
          />
          <AppearanceTabs />
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
