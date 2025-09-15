import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function useIzinForm() {
  const { data, setData, post, processing } = useForm({
    tanggal_izin: '',
    alasan: '',
    status: 'izin',
  });

  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setData('tanggal_izin', today);
  }, [setData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    post(route('absensi.store'));
  };

  return {
    data,
    setData,
    post,
    processing,
    agreed,
    setAgreed,
    handleSubmit,
  };
}
