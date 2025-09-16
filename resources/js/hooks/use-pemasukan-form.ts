import { Pemasukan } from '@/types';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function usePemasukanForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingPemasukan, setEditingPemasukan] = useState<Pemasukan | null>(
    null,
  );

  const form = useForm({
    amount: 0,
    date: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPemasukan) {
      form.put(route('pemasukan.update', editingPemasukan.id), {
        onSuccess: () => {
          setIsOpen(false);
          setEditingPemasukan(null);
          form.reset();
        },
      });
    } else {
      form.post(route('pemasukan.store'), {
        onSuccess: () => {
          setIsOpen(false);
          form.reset();
        },
      });
    }
  };

  const handleEdit = (item: Pemasukan) => {
    setEditingPemasukan(item);
    form.setData({
      amount: item.amount,
      date: item.date,
      description: item.description,
    });
    setIsOpen(true);
  };

  return {
    isOpen,
    setIsOpen,
    editingPemasukan,
    handleSubmit,
    handleEdit,
    ...form,
  };
}
