import { Pengeluaran } from '@/types';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function usePengeluaranForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingPengeluaran, setEditingPengeluaran] =
    useState<Pengeluaran | null>(null);

  const form = useForm({
    amount: 0,
    date: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPengeluaran) {
      form.put(route('pengeluaran.update', editingPengeluaran.id), {
        onSuccess: () => {
          setIsOpen(false);
          setEditingPengeluaran(null);
          form.reset();
        },
      });
    } else {
      form.post(route('pengeluaran.store'), {
        onSuccess: () => {
          setIsOpen(false);
          form.reset();
        },
      });
    }
  };

  const handleEdit = (item: Pengeluaran) => {
    setEditingPengeluaran(item);
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
    editingPengeluaran,
    handleSubmit,
    handleEdit,
    ...form,
  };
}
