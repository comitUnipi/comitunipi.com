import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatRupiah } from '@/lib/format-rupiah';
import { parseRupiah } from '@/lib/parse-rupiah';
import { Kas, User } from '@/types';
import { useState } from 'react';

interface Props {
  data: Kas;
  users: User[];
  editingKAS: boolean;
  processing: boolean;
  setData: <K extends keyof Kas>(key: K, value: Kas[K]) => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function FormKas({ data, setData, editingKAS, handleSubmit, processing, users }: Props) {
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {editingKAS ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="amount" className="text-sm font-medium">
                Jumlah
              </Label>
              <Input
                id="amount"
                type="text"
                placeholder="Jumlah Uang"
                value={formatRupiah(data.amount || 0)}
                onChange={(e) => {
                  const numericValue = parseRupiah(e.target.value);
                  setData('amount', numericValue);
                }}
                required
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date" className="text-sm font-medium">
                Tanggal
              </Label>
              <Input id="date" type="date" value={data.date} onChange={(e) => setData('date', e.target.value)} required className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type" className="text-sm font-medium">
                KAS Untuk
              </Label>
              <Select value={data.type} onValueChange={(val) => setData('type', val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Untuk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pengurus">Pengurus</SelectItem>
                  <SelectItem value="Anggota">Anggota</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" disabled={processing} className="w-full">
            {editingKAS ? 'Ubah Data Uang KAS' : 'Tambah Data'}
          </Button>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="user_id" className="text-sm font-medium">
                Pilih Anggota
              </Label>
              <Input placeholder="Cari anggota dan kemudian pilih..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full" />
              <Select value={data.user_id?.toString()} onValueChange={(val) => setData('user_id', parseInt(val))}>
                <SelectTrigger id="user_id" className="w-full">
                  <SelectValue placeholder="Pilih Anggota" />
                </SelectTrigger>
                <SelectContent>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) =>
                      user.id !== undefined ? (
                        <SelectItem key={user.id} value={user.id.toString()}>
                          {user.name}
                        </SelectItem>
                      ) : null,
                    )
                  ) : (
                    <div className="text-muted-foreground p-2 text-sm">Anggota tidak ditemukan</div>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount" className="text-sm font-medium">
                Jumlah
              </Label>
              <Input
                id="amount"
                type="text"
                placeholder="Jumlah Uang"
                value={formatRupiah(data.amount || 0)}
                onChange={(e) => {
                  const numericValue = parseRupiah(e.target.value);
                  setData('amount', numericValue);
                }}
                required
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date" className="text-sm font-medium">
                Tanggal
              </Label>
              <Input id="date" type="date" value={data.date} onChange={(e) => setData('date', e.target.value)} required className="w-full" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type" className="text-sm font-medium">
                KAS Untuk
              </Label>
              <Select value={data.type} onValueChange={(val) => setData('type', val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih Untuk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pengurus">Pengurus</SelectItem>
                  <SelectItem value="Anggota">Anggota</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit" disabled={processing} className="w-full">
            {editingKAS ? 'Ubah Data Uang KAS' : 'Tambah Data'}
          </Button>
        </>
      )}
    </form>
  );
}
