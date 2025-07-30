import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { JENIS_KELAMIN_OPTIONS, JURUSAN_OPTIONS, MINAT_KEAHLIAN_OPTIONS } from '../Users/constants/form-option';

type RegisterForm = {
  name: string;
  npm: string;
  email: string;
  password: string;
  password_confirmation: string;
  jenis_kelamin: string;
  no_wa: string;
  jurusan: string;
  minat_keahlian: string;
  alasan: string;
};

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
    name: '',
    npm: '',
    email: '',
    password: '',
    password_confirmation: '',
    jenis_kelamin: '',
    no_wa: '',
    jurusan: '',
    minat_keahlian: '',
    alasan: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('anggota.store'), {
      onSuccess: () => {
        window.location.href = route('anggota.whatsapp');
      },
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <>
      <Head title="Pendaftaran Anggota" />
      <div className="relative min-h-screen overflow-hidden bg-white">
        <Card className="border-border mx-auto w-full max-w-4xl rounded-md border shadow-md md:my-4">
          <div className="-mt-8 h-[300px] w-full overflow-hidden rounded-t-md">
            <img src="/images/100114.png" alt="Banner Pendaftaran COMIT" className="block h-full w-full object-cover" />
          </div>
          <CardContent>
            <div className="mb-4 flex flex-col items-center justify-center gap-2">
              <div className="relative mx-auto mb-6 w-fit">
                <div className="mx-auto flex h-28 w-28 transform items-center justify-center bg-transparent transition-transform duration-300 hover:scale-110">
                  <img src="/logo_black.png" alt="LOGO COMIT" />
                </div>
                <div className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform animate-ping rounded-full border-4 border-blue-300 opacity-30" />
                <div
                  className="absolute top-1/2 left-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 transform animate-ping rounded-full border-2 border-blue-200 opacity-20"
                  style={{ animationDelay: '0.5s' }}
                />
              </div>
              <CardTitle className="text-primary mt-0 mb-6 text-center text-lg font-bold md:text-2xl">Formulir Pendaftaran Anggota Baru</CardTitle>
            </div>
            <form className="flex flex-col gap-6" onSubmit={submit}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Nama Lengkap"
                    required
                    disabled={processing}
                  />
                  <InputError message={errors.name} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="npm">NPM</Label>
                  <Input
                    id="npm"
                    value={data.npm}
                    onChange={(e) => setData('npm', e.target.value)}
                    placeholder="NPM"
                    required
                    disabled={processing}
                  />
                  <InputError message={errors.npm} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="email@example.com"
                    required
                    disabled={processing}
                  />
                  <InputError message={errors.email} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="no_wa">No WhatsApp</Label>
                  <Input
                    id="no_wa"
                    value={data.no_wa}
                    onChange={(e) => setData('no_wa', e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    required
                    disabled={processing}
                  />
                  <InputError message={errors.no_wa} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                  <Select value={data.jenis_kelamin} onValueChange={(value) => setData('jenis_kelamin', value)}>
                    <SelectTrigger id="jenis_kelamin" disabled={processing}>
                      <SelectValue placeholder="Pilih Jenis Kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      {JENIS_KELAMIN_OPTIONS.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <InputError message={errors.jenis_kelamin} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="jurusan">Jurusan</Label>
                  <Select value={data.jurusan} onValueChange={(value) => setData('jurusan', value)}>
                    <SelectTrigger id="jurusan" disabled={processing}>
                      <SelectValue placeholder="Pilih Jurusan" />
                    </SelectTrigger>
                    <SelectContent>
                      {JURUSAN_OPTIONS.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <InputError message={errors.jurusan} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="minat_keahlian">Minat Keahlian</Label>
                  <Select value={data.minat_keahlian} onValueChange={(value) => setData('minat_keahlian', value)}>
                    <SelectTrigger id="minat_keahlian" disabled={processing}>
                      <SelectValue placeholder="Pilih Minat Keahlian" />
                    </SelectTrigger>
                    <SelectContent>
                      {MINAT_KEAHLIAN_OPTIONS.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <InputError message={errors.minat_keahlian} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="alasan">Alasan Mengikuti</Label>
                <textarea
                  id="alasan"
                  value={data.alasan}
                  onChange={(e) => setData('alasan', e.target.value)}
                  placeholder="Kenapa kamu ingin bergabung dengan COMIT?"
                  className="border-input bg-background ring-offset-background focus-visible:ring-ring placeholder:text-muted-foreground flex w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  required
                  disabled={processing}
                />
                <InputError message={errors.alasan} />
              </div>
              <Button
                type="submit"
                className="mt-4 w-full rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                disabled={processing}
              >
                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Daftar Sekarang
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
