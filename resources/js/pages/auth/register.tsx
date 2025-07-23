import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthLayout from '@/layouts/auth-layout';
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
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Pendaftaran COMIT" description="Isi form ini sesuai dengan data diri, untuk daftar COMIT.">
            <Head title="Pendaftaran Anggota" />
            <form className="mt-2 flex flex-col gap-6" onSubmit={submit}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Nama Lengkap"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="npm">NPM</Label>
                        <Input
                            id="npm"
                            type="text"
                            required
                            tabIndex={1}
                            autoComplete="npm"
                            value={data.npm}
                            onChange={(e) => setData('npm', e.target.value)}
                            disabled={processing}
                            placeholder="NPM"
                        />
                        <InputError message={errors.npm} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
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
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Konfirmasi password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Konfirmasi password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                        <Select value={data.jenis_kelamin} onValueChange={(val) => setData('jenis_kelamin', val)}>
                            <SelectTrigger id="jenis_kelamin" disabled={processing}>
                                <SelectValue placeholder="Pilih Jenis Kelamin" />
                            </SelectTrigger>
                            <SelectContent>
                                {JENIS_KELAMIN_OPTIONS.map((value) => (
                                    <SelectItem key={value} value={value}>
                                        {value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.jenis_kelamin} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="jurusan">Jurusan</Label>
                        <Select value={data.jurusan} onValueChange={(val) => setData('jurusan', val)}>
                            <SelectTrigger id="jurusan" disabled={processing}>
                                <SelectValue placeholder="Pilih Jurusan" />
                            </SelectTrigger>
                            <SelectContent>
                                {JURUSAN_OPTIONS.map((value) => (
                                    <SelectItem key={value} value={value}>
                                        {value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.jurusan} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="minat_keahlian">Minat Keahlian</Label>
                        <Select value={data.minat_keahlian} onValueChange={(val) => setData('minat_keahlian', val)}>
                            <SelectTrigger id="minat_keahlian" disabled={processing}>
                                <SelectValue placeholder="Pilih Minat Keahlian" />
                            </SelectTrigger>
                            <SelectContent>
                                {MINAT_KEAHLIAN_OPTIONS.map((value) => (
                                    <SelectItem key={value} value={value}>
                                        {value}
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
                        required
                        value={data.alasan}
                        onChange={(e) => setData('alasan', e.target.value)}
                        disabled={processing}
                        placeholder="Jelaskan alasan kamu mengikuti kegiatan ini"
                        className="border-input bg-background ring-offset-background focus-visible:ring-ring placeholder:text-muted-foreground flex w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                    />
                    <InputError message={errors.alasan} />
                </div>
                <Button type="submit" className="mt-2 w-full bg-blue-500 hover:bg-blue-600 dark:text-white" tabIndex={5} disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Daftar Sekarang
                </Button>
                <div className="text-muted-foreground text-center text-sm">
                    Kamu sudah daftar COMIT?{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        Masuk
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}
