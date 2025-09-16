import { User } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function useCalonAnggotaForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);

  const form = useForm({
    name: '',
    email: '',
    npm: '',
    password: '',
    password_confirmation: '',
    role: '',
    position: '',
    jenis_kelamin: '',
    no_wa: '',
    jurusan: '',
    minat_keahlian: '',
    alasan: '',
    is_active: false as boolean,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editing) {
      router.put(
        route('users.update', editing.id),
        {
          role: form.data.role,
          position: form.data.position,
          is_active: form.data.is_active,
          redirect_to: 'calon-anggota.index',
        },
        {
          onSuccess: () => {
            setIsOpen(false);
            setEditing(null);
            form.reset();
          },
          preserveState: true,
        },
      );
    }
  };

  const handleEdit = (user: User) => {
    setEditing(user);
    form.setData((previousData) => ({
      ...previousData,
      role: user.role,
      position: user.position,
      is_active: user.is_active,
    }));
    setIsOpen(true);
  };

  return {
    isOpen,
    setIsOpen,
    editing,
    handleSubmit,
    handleEdit,
    ...form,
  };
}
