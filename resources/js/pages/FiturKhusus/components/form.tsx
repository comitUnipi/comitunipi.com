import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { POSITION_OPTIONS, ROLE_OPTIONS, STATUS_OPTIONS } from '@/constants/form-options';
import { User } from '@/types';

interface Props {
  data: User;
  editingUser: boolean;
  processing: boolean;
  setData: <K extends keyof User>(key: K, value: User[K]) => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function Form({ handleSubmit, data, setData, processing }: Props) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <Button type="submit" disabled={processing} className="bg-primary hover:bg-primary/90 w-full text-white shadow-lg dark:text-black">
        Ubah Data
      </Button>
    </form>
  );
}
