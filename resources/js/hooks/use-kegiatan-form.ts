import { Kegiatan } from '@/types';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function useKegiatanForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Kegiatan | null>(null);

  const form = useForm({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    audiens: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editing) {
      form.put(route('kegiatan.update', editing.id), {
        onSuccess: () => {
          setIsOpen(false);
          setEditing(null);
          form.reset();
        },
      });
    } else {
      form.post(route('kegiatan.store'), {
        onSuccess: () => {
          setIsOpen(false);
          form.reset();
        },
      });
    }
  };

  const handleEdit = (kegiatanItem: Kegiatan) => {
    setEditing(kegiatanItem);
    form.setData({
      name: kegiatanItem.name,
      description: kegiatanItem.description,
      date: kegiatanItem.date,
      time: kegiatanItem.time,
      location: kegiatanItem.location,
      audiens: kegiatanItem.audiens,
    });
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
