import { router, useForm } from '@inertiajs/react';

export default function useQrForm() {
  const form = useForm({
    kegiatan_id: '',
    start_time: '',
    end_time: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.post(route('qr.store'), {
      preserveScroll: true,
      onSuccess: () => {
        form.reset();
        router.visit(route('qr.create'), {
          preserveScroll: true,
          preserveState: true,
        });
      },
    });
  };

  return {
    ...form,
    handleSubmit,
  };
}
