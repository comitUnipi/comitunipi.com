import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function useDelete(routeName: string) {
  const form = useForm();
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const handleDelete = (id: number, onSuccessCallback?: () => void) => {
    form.delete(route(routeName, id), {
      onSuccess: () => {
        setConfirmDeleteId(null);
        if (onSuccessCallback) onSuccessCallback();
      },
    });
  };

  return {
    confirmDeleteId,
    setConfirmDeleteId,
    handleDelete,
  };
}
