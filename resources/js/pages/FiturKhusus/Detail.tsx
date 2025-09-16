import Heading from '@/components/heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

interface Props {
  user: {
    id: number;
    name: string;
    email: string;
    npm: string;
    role: string;
    position: string | null;
    jurusan: string | null;
    minat_keahlian: string | null;
    is_active: boolean;
    jenis_kelamin: string;
    no_wa: string | null;
    alasan: string | null;
  };
  module: string;
}

const moduleTitleMap: Record<string, string> = {
  'badan-pengurus-harian': 'Badan Pengurus Harian',
  'calon-anggota': 'Calon Anggota',
};

export default function Pages({ user, module }: Props) {
  const moduleTitle = moduleTitleMap[module] || 'Detail';

  return (
    <AppLayout
      breadcrumbs={[
        { title: moduleTitle, href: `/fitur-khusus/${module}` },
        { title: 'Detail Anggota', href: '#' },
      ]}
    >
      <Head title={`Detail - ${user.name}`} />
      <div className="from-background to-muted/20 flex h-full flex-1 flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">
        <Heading
          title="Informasi Detail Anggota"
          description="Detail informasi anggota yang terdaftar"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input
              id="name"
              value={user.name}
              disabled
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={user.email}
              disabled
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="npm">NPM</Label>
            <Input
              id="npm"
              value={user.npm}
              disabled
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
            <Input
              id="jenis_kelamin"
              value={user.jenis_kelamin}
              disabled
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="no_wa">No. WhatsApp</Label>
            <Input
              id="no_wa"
              value={user.no_wa || '-'}
              disabled
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="jurusan">Jurusan</Label>
            <Input
              id="jurusan"
              value={user.jurusan || '-'}
              disabled
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="minat_keahlian">Minat Keahlian</Label>
            <Input
              id="minat_keahlian"
              value={user.minat_keahlian || '-'}
              disabled
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="position">Posisi</Label>
            <Input
              id="position"
              value={user.position || '-'}
              disabled
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={user.role}
              disabled
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Input
              id="status"
              value={user.is_active ? 'Aktif' : 'Nonaktif'}
              className={user.is_active ? 'text-green-600' : 'text-red-600'}
              disabled
            />
          </div>
        </div>
        <div className="mt-4 grid gap-2">
          <Label htmlFor="alasan">Alasan Mengikuti</Label>
          <Textarea
            id="alasan"
            value={user.alasan || '-'}
            disabled
            className="resize-none"
          />
        </div>
      </div>
    </AppLayout>
  );
}
