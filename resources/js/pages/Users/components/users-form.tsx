import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from '@/types';
import {
    JENIS_KELAMIN_OPTIONS,
    JURUSAN_OPTIONS,
    MINAT_KEAHLIAN_OPTIONS,
    POSITION_OPTIONS,
    ROLE_OPTIONS,
    STATUS_OPTIONS,
} from '../constants/form-option';

interface Props {
    data: User;
    errors: Partial<
        Record<
            | 'name'
            | 'npm'
            | 'email'
            | 'jenis_kelamin'
            | 'no_wa'
            | 'jurusan'
            | 'minat_keahlian'
            | 'role'
            | 'position'
            | 'is_active'
            | 'alasan'
            | 'password'
            | 'password_confirmation',
            string
        >
    >;
    editingUser: boolean;
    processing: boolean;
    setData: <K extends keyof User>(key: K, value: User[K]) => void;
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function FormAnggota({ editingUser, handleSubmit, data, setData, errors, processing }: Props) {
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {editingUser ? (
                <div className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Select value={data.role} onValueChange={(val) => setData('role', val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih Role" />
                            </SelectTrigger>
                            <SelectContent>
                                {ROLE_OPTIONS.map((role) => (
                                    <SelectItem key={role} value={role}>
                                        {role}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="position">Position</Label>
                        <Select value={data.position} onValueChange={(val) => setData('position', val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih Position" />
                            </SelectTrigger>
                            <SelectContent>
                                {POSITION_OPTIONS.map((role) => (
                                    <SelectItem key={role} value={role}>
                                        {role}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="is_active">Status</Label>
                        <Select value={data.is_active ? '1' : '0'} onValueChange={(val) => setData('is_active', val === '1')}>
                            <SelectTrigger>
                                <SelectValue placeholder="Status Aktif" />
                            </SelectTrigger>
                            <SelectContent>
                                {STATUS_OPTIONS.map(({ value, label }) => (
                                    <SelectItem key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="nama">Nama Lengkap</Label>
                        <Input placeholder="Nama Lengkap" value={data.name} onChange={(e) => setData('name', e.target.value)} type="text" required />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="npm">NPM</Label>
                        <Input placeholder="NPM" value={data.npm} onChange={(e) => setData('npm', e.target.value)} type="text" required />
                        <InputError message={errors.npm} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input placeholder="Email" value={data.email} onChange={(e) => setData('email', e.target.value)} type="email" required />
                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password as string}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Konfirmasi password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation as string}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                        />
                        <InputError message={errors.confirm_password} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="no_wa">Nomor Whatsapp</Label>
                        <Input
                            placeholder="088*********"
                            value={data.no_wa}
                            onChange={(e) => setData('no_wa', e.target.value)}
                            type="text"
                            required
                        />
                        <InputError message={errors.no_wa} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="minat_keahlian">Minat Keahlian</Label>
                        <Select value={data.minat_keahlian} onValueChange={(val) => setData('minat_keahlian', val)}>
                            <SelectTrigger>
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
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="jurusan">Jurusan</Label>
                        <Select value={data.jurusan} onValueChange={(val) => setData('jurusan', val)}>
                            <SelectTrigger>
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
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Select value={data.role} onValueChange={(val) => setData('role', val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih Role" />
                            </SelectTrigger>
                            <SelectContent>
                                {ROLE_OPTIONS.map((value) => (
                                    <SelectItem key={value} value={value}>
                                        {value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="is_active">Status</Label>
                        <Select value={data.is_active ? '1' : '0'} onValueChange={(val) => setData('is_active', val === '1')}>
                            <SelectTrigger>
                                <SelectValue placeholder="Status Aktif" />
                            </SelectTrigger>
                            <SelectContent>
                                {STATUS_OPTIONS.map(({ value, label }) => (
                                    <SelectItem key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                        <Select value={data.jenis_kelamin} onValueChange={(val) => setData('jenis_kelamin', val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Jenis Kelamin" />
                            </SelectTrigger>
                            <SelectContent>
                                {JENIS_KELAMIN_OPTIONS.map((value) => (
                                    <SelectItem key={value} value={value}>
                                        {value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="col-span-1 grid gap-2 sm:col-span-2">
                        <Label htmlFor="alasan">Alasan Mengikuti</Label>
                        <textarea
                            id="alasan"
                            required
                            value={data.alasan}
                            onChange={(e) => setData('alasan', e.target.value)}
                            disabled={processing}
                            placeholder="Jelaskan alasan kamu mengikuti kegiatan ini"
                            className="border-input bg-background ring-offset-background focus-visible:ring-ring placeholder:text-muted-foreground flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                        />
                        <InputError message={errors.alasan} className="mt-2" />
                    </div>
                </div>
            )}
            <Button type="submit" disabled={processing} className="bg-primary hover:bg-primary/90 w-full text-white shadow-lg">
                {editingUser ? 'Ubah Data Anggota' : 'Tambah Anggota'}
            </Button>
        </form>
    );
}
