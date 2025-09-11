import { Kas } from '@/types';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function useKasForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Kas | null>(null);

  const form = useForm({
    user_id: 0,
    amount: 0,
    date: '',
    type: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editing) {
      form.put(route('kas.update', editing.id), {
        onSuccess: () => {
          setIsOpen(false);
          setEditing(null);
          form.reset();
        },
      });
    } else {
      form.post(route('kas.store'), {
        onSuccess: () => {
          setIsOpen(false);
          form.reset();
        },
      });
    }
  };

  const handleEdit = (kasItem: Kas) => {
    setEditing(kasItem);
    form.setData((previousData) => ({
      ...previousData,
      amount: kasItem.amount,
      date: kasItem.date,
      type: kasItem.type,
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
