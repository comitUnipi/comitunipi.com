import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Profile settings',
    href: '/settings/profile',
  },
];

type ProfileForm = {
  name: string;
  email: string;
  jenis_kelamin: string;
  no_wa: string;
  jurusan: string;
  minat_keahlian: string;
  alasan: string;
};

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
  const { auth } = usePage<SharedData>().props;

  const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
    name: auth.user.name,
    email: auth.user.email,
    jenis_kelamin: auth.user.jenis_kelamin,
    no_wa: auth.user.no_wa,
    jurusan: auth.user.jurusan,
    minat_keahlian: auth.user.minat_keahlian,
    alasan: auth.user.alasan,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route('profile.update'), {
      preserveScroll: true,
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Profile settings" />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall title="Profile information" description="Update your name and email address" />

          <form onSubmit={submit} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>

              <Input
                id="name"
                className="mt-1 block w-full"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                required
                autoComplete="name"
                placeholder="Full name"
              />

              <InputError className="mt-2" message={errors.name} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>

              <Input
                id="email"
                type="email"
                className="mt-1 block w-full"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                required
                autoComplete="username"
                placeholder="Email address"
              />

              <InputError className="mt-2" message={errors.email} />
            </div>

            {mustVerifyEmail && auth.user.email_verified_at === null && (
              <div>
                <p className="text-muted-foreground -mt-4 text-sm">
                  Your email address is unverified.{' '}
                  <Link
                    href={route('verification.send')}
                    method="post"
                    as="button"
                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                  >
                    Click here to resend the verification email.
                  </Link>
                </p>

                {status === 'verification-link-sent' && (
                  <div className="mt-2 text-sm font-medium text-green-600">A new verification link has been sent to your email address.</div>
                )}
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
              <select
                id="jenis_kelamin"
                value={data.jenis_kelamin}
                onChange={(e) => setData('jenis_kelamin', e.target.value)}
                required
                className="border-input bg-background ring-offset-background focus-visible:ring-ring placeholder:text-muted-foreground flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <option value="">Pilih jenis kelamin</option>
                <option value="Laki-Laki">Laki-Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
              <InputError message={errors.jenis_kelamin} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="no_wa">No. WhatsApp</Label>
              <Input
                id="no_wa"
                type="tel"
                required
                value={data.no_wa}
                onChange={(e) => setData('no_wa', e.target.value)}
                disabled={processing}
                placeholder="08xxxxxxxxxx"
              />
              <InputError message={errors.no_wa} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="jurusan">Jurusan</Label>
              <select
                id="jurusan"
                value={data.jurusan}
                onChange={(e) => setData('jurusan', e.target.value)}
                disabled={processing}
                required
                className="border-input bg-background ring-offset-background focus-visible:ring-ring placeholder:text-muted-foreground flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <option value="">Pilih jurusan</option>
                <option value="Sistem Informasi">Sistem Informasi</option>
                <option value="Teknologi Informasi">Teknologi Informasi</option>
                <option value="Software Enginner">Software Enginner</option>
                <option value="Akutansi">Akutansi</option>
                <option value="Manajemen">Manajemen</option>
              </select>
              <InputError message={errors.jurusan} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="minat_keahlian">Minat Keahlian</Label>
              <select
                id="minat_keahlian"
                value={data.minat_keahlian}
                onChange={(e) => setData('minat_keahlian', e.target.value)}
                disabled={processing}
                required
                className="border-input bg-background ring-offset-background focus-visible:ring-ring placeholder:text-muted-foreground flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <option value="">Pilih minat keahlian</option>
                <option value="Programming">Programming</option>
                <option value="Design Grafis">Design Grafis</option>
                <option value="Microsoft Office">Microsoft Office</option>
              </select>
              <InputError message={errors.minat_keahlian} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="alasan">Alasan Mengikuti</Label>
              <textarea
                id="alasan"
                required
                value={data.alasan}
                onChange={(e) => setData('alasan', e.target.value)}
                disabled={processing}
                placeholder="Jelaskan alasan kamu mengikuti kegiatan ini"
                className="border-input bg-background ring-offset-background focus-visible:ring-ring placeholder:text-muted-foreground flex w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              />
              <InputError message={errors.alasan} />
            </div>

            <div className="flex items-center gap-4">
              <Button disabled={processing}>Save</Button>

              <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
              >
                <p className="text-sm text-neutral-600">Saved</p>
              </Transition>
            </div>
          </form>
        </div>

        <DeleteUser />
      </SettingsLayout>
    </AppLayout>
  );
}
