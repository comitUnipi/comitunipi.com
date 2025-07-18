import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User } from '@/types';

interface Props {
    data: User;
    editingUser: boolean;
    processing: boolean;
    setData: <K extends keyof User>(key: K, value: User[K]) => void;
    handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function FormAnggota({ editingUser, handleSubmit, data, setData, processing }: Props) {
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
                                <SelectItem value="Guest">Guest</SelectItem>
                                <SelectItem value="User">User</SelectItem>
                                <SelectItem value="Finance">Finance</SelectItem>
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="Super Admin">Super Admin</SelectItem>
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
                                <SelectItem value="Calon Anggota">Calon Anggota</SelectItem>
                                <SelectItem value="Anggota">Anggota</SelectItem>
                                <SelectItem value="Ketua Umum">Ketua Umum</SelectItem>
                                <SelectItem value="Wakil Ketua">Wakil Ketua</SelectItem>
                                <SelectItem value="Bendahara">Bendahara</SelectItem>
                                <SelectItem value="Sekretaris">Sekretaris</SelectItem>
                                <SelectItem value="Koordinator Akadamik">Koordinator Akadamik</SelectItem>
                                <SelectItem value="Koordinator SDM">Koordinator SDM</SelectItem>
                                <SelectItem value="Koordinator Kominfo">Koordinator Kominfo</SelectItem>
                                <SelectItem value="Koordinator Humas">Koordinator Humas</SelectItem>
                                <SelectItem value="Koordinator Prasarana">Koordinator Prasarana</SelectItem>
                                <SelectItem value="Humas Internal">Humas Internal</SelectItem>
                                <SelectItem value="Humas Eksternal">Humas Eksternal</SelectItem>
                                <SelectItem value="Prasarana">Prasarana</SelectItem>
                                <SelectItem value="SDM">SDM</SelectItem>
                                <SelectItem value="Kominfo">Kominfo</SelectItem>
                                <SelectItem value="Staff Programming">Staff Programming</SelectItem>
                                <SelectItem value="Staff Design Grafis">Staff Design Grafis</SelectItem>
                                <SelectItem value="Staff Comp dan Network">Staff Comp dan Network</SelectItem>
                                <SelectItem value="Staff Microsoft Office">Staff Microsoft Office</SelectItem>
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
                                <SelectItem value="1">Aktif</SelectItem>
                                <SelectItem value="0">Nonaktif</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="nama">Nama Lengkap</Label>
                        <Input placeholder="Nama Lengkap" value={data.name} onChange={(e) => setData('name', e.target.value)} type="text" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="npm">NPM</Label>
                        <Input placeholder="NPM" value={data.npm} onChange={(e) => setData('npm', e.target.value)} type="text" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input placeholder="Email" value={data.email} onChange={(e) => setData('email', e.target.value)} type="email" required />
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
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="minat_keahlian">Minat Keahlian</Label>
                        <Select value={data.minat_keahlian} onValueChange={(val) => setData('minat_keahlian', val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih Minat Keahlian" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Programming">Programming</SelectItem>
                                <SelectItem value="Design Grafis">Design Grafis</SelectItem>
                                <SelectItem value="Computer & Networking">Computer & Networking</SelectItem>
                                <SelectItem value="Microsoft Office">Microsoft Office</SelectItem>
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
                                <SelectItem value="Teknologi Informasi">Teknologi Informasi</SelectItem>
                                <SelectItem value="Sistem Informasi">Sistem Informasi</SelectItem>
                                <SelectItem value="Software Enginner">Software Enginner</SelectItem>
                                <SelectItem value="Akutansi">Akutansi</SelectItem>
                                <SelectItem value="Manajemen">Manajemen</SelectItem>
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
                                <SelectItem value="Guest">Guest</SelectItem>
                                <SelectItem value="User">User</SelectItem>
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="Super Admin">Super Admin</SelectItem>
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
                                <SelectItem value="1">Aktif</SelectItem>
                                <SelectItem value="0">Tidak Aktif</SelectItem>
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
                                <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                                <SelectItem value="Perempuan">Perempuan</SelectItem>
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
                    </div>
                </div>
            )}
            <Button type="submit" disabled={processing} className="bg-primary hover:bg-primary/90 w-full text-white shadow-lg">
                {editingUser ? 'Ubah Data Anggota' : 'Tambah Anggota'}
            </Button>
        </form>
    );
}
