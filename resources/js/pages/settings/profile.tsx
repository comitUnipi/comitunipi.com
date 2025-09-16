import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  JENIS_KELAMIN_OPTIONS,
  JURUSAN_OPTIONS,
  MINAT_KEAHLIAN_OPTIONS,
} from '@/constants/form-options';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type ProfileForm = {
  name: string;
  email: string;
  jenis_kelamin: string;
  no_wa: string;
  jurusan: string;
  minat_keahlian: string;
  alasan: string;
};

export default function Profile({
  mustVerifyEmail,
  status,
}: {
  mustVerifyEmail: boolean;
  status?: string;
}) {
  const { auth } = usePage<SharedData>().props;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm<Required<ProfileForm>>({
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
    <AppLayout
      breadcrumbs={[
        {
          title: 'Pengaturan profile',
          href: '/settings/profile',
        },
      ]}
    >
      <Head title="Pengaturan profile" />
      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            title="Informasi Profile"
            description="Perbarui informasi profile kamu secara detail"
          />
          <form
            onSubmit={submit}
            className="space-y-6"
          >
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                className="mt-1 block w-full"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                autoComplete="name"
                placeholder="Nama Lengkap"
              />
              <InputError
                className="mt-2"
                message={errors.name}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="mt-1 block w-full"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                autoComplete="username"
                placeholder="Email address"
              />
              <InputError
                className="mt-2"
                message={errors.email}
              />
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
                  <div className="mt-2 text-sm font-medium text-green-600">
                    A new verification link has been sent to your email address.
                  </div>
                )}
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
              <Select
                value={data.jenis_kelamin}
                onValueChange={(val) => setData('jenis_kelamin', val)}
              >
                <SelectTrigger
                  id="jenis_kelamin"
                  disabled={processing}
                >
                  <SelectValue placeholder="Pilih Jenis Kelamin" />
                </SelectTrigger>
                <SelectContent>
                  {JENIS_KELAMIN_OPTIONS.map((value) => (
                    <SelectItem
                      key={value}
                      value={value}
                    >
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputError message={errors.jenis_kelamin} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="no_wa">No. WhatsApp</Label>
              <Input
                id="no_wa"
                type="tel"
                value={data.no_wa}
                onChange={(e) => setData('no_wa', e.target.value)}
                disabled={processing}
                placeholder="08xxxxxxxxxx"
              />
              <InputError message={errors.no_wa} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="jurusan">Jurusan</Label>
              <Select
                value={data.jurusan}
                onValueChange={(val) => setData('jurusan', val)}
              >
                <SelectTrigger
                  id="jurusan"
                  disabled={processing}
                >
                  <SelectValue placeholder="Pilih Jurusan" />
                </SelectTrigger>
                <SelectContent>
                  {JURUSAN_OPTIONS.map((value) => (
                    <SelectItem
                      key={value}
                      value={value}
                    >
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputError message={errors.jurusan} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="minat_keahlian">Minat Keahlian</Label>
              <Select
                value={data.minat_keahlian}
                onValueChange={(val) => setData('minat_keahlian', val)}
              >
                <SelectTrigger
                  id="minat_keahlian"
                  disabled={processing}
                >
                  <SelectValue placeholder="Pilih Minat Keahlian" />
                </SelectTrigger>
                <SelectContent>
                  {MINAT_KEAHLIAN_OPTIONS.map((value) => (
                    <SelectItem
                      key={value}
                      value={value}
                    >
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputError message={errors.minat_keahlian} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="alasan">Alasan Mengikuti</Label>
              <Textarea
                id="alasan"
                value={data.alasan}
                onChange={(e) => setData('alasan', e.target.value)}
                disabled={processing}
                placeholder="Jelaskan alasan kamu mengikuti kegiatan ini"
                className="border-input bg-background ring-offset-background focus-visible:ring-ring placeholder:text-muted-foreground flex w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              />
              <InputError message={errors.alasan} />
            </div>
            <div className="flex items-center gap-4">
              <Button disabled={processing}>Simpan</Button>
              <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
              >
                <p className="text-sm text-neutral-600">Telah Tersimpan</p>
              </Transition>
            </div>
          </form>
        </div>
        <DeleteUser />
      </SettingsLayout>
    </AppLayout>
  );
}
