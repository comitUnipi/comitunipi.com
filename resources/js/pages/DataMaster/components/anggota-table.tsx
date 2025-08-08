import { Button } from '@/components/ui/button';
import { User } from '@/types';
import { Link } from '@inertiajs/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';

type CurrentUser = {
  role: string;
};

interface Props {
  users: {
    data: User[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
  };
  user: CurrentUser;
  handleEdit: (user: User) => void;
  setConfirmDeleteId: (id: number) => void;
}

export default function TableAnggota({ users, user, handleEdit, setConfirmDeleteId }: Props) {
  return (
    <div className="rounded-md border">
      <div className="relative hidden w-full overflow-x-auto lg:block">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&_tr]:border-b">
            <tr className="hover:bg-muted/50 border-b transition-colors">
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">No</th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">Nama Lengkap</th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">NPM</th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">Jurusan</th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">Minat Keahlian</th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">Status</th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">Posisi</th>
              <th className="text-muted-foreground h-12 px-4 text-left font-medium">Role</th>
              <th className="text-muted-foreground h-12 px-4 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {users.data.map((data, index) => (
              <tr key={data.id} className="hover:bg-muted/50 border-b transition-colors">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{data.name}</td>
                <td className="p-4">{data.npm}</td>
                <td className="p-4">{data.jurusan}</td>
                <td className="p-4">{data.minat_keahlian}</td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${
                      data.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {data.is_active ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td className="p-4">{data.position}</td>
                <td className="p-4">{data.role}</td>
                <td className="space-x-2 p-4 text-center">
                  <Link
                    href={route('users.show', data.id)}
                    className="hover:text-primary inline-flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  {user.role === 'Super Admin' && (
                    <>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(data)} className="hover:text-primary cursor-pointer">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setConfirmDeleteId(data.id!)}
                        className="hover:text-destructive cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {users.data.length === 0 && (
              <tr>
                <td colSpan={9} className="text-muted-foreground p-4 text-center">
                  Tidak ada data anggota.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="lg:hidden">
        {users.data.map((data) => (
          <div key={data.id} className="space-y-3 border-b p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold">{data.name}</h3>
                <p className="text-muted-foreground text-sm">{data.npm}</p>
              </div>
              <div className="flex space-x-2">
                <Link
                  href={route('users.show', data.id)}
                  className="hover:text-primary inline-flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors"
                >
                  <Eye className="h-4 w-4" />
                </Link>
                {user.role === 'Super Admin' && (
                  <>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(data)} className="hover:text-primary h-8 w-8 cursor-pointer">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setConfirmDeleteId(data.id!)}
                      className="hover:text-destructive h-8 w-8 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Jurusan:</span>
                <p className="font-medium">{data.jurusan}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Minat:</span>
                <p className="font-medium">{data.minat_keahlian}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Posisi:</span>
                <p className="font-medium">{data.position}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Role:</span>
                <p className="font-medium">{data.role}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Status:</span>
              <span
                className={`rounded-full px-2 py-1 text-xs font-semibold ${
                  data.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {data.is_active ? 'Aktif' : 'Nonaktif'}
              </span>
            </div>
          </div>
        ))}
        {users.data.length === 0 && <div className="text-muted-foreground p-6 text-center">Tidak ada data anggota.</div>}
      </div>
    </div>
  );
}
