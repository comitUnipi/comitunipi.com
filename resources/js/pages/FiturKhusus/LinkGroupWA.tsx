import Heading from '@/components/heading';
import ToastNotification from '@/components/toast-notification';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { FormEvent, useEffect, useState } from 'react';

interface Props {
  whatsappLink: string;
  flash?: {
    success?: string;
    error?: string;
  };
}

interface FormErrors {
  [key: string]: string | undefined;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Group WhatsApp',
    href: '/fitur-khusus/group-whatsapp',
  },
];

export default function GroupWA({ whatsappLink, flash }: Props) {
  const [link, setLink] = useState<string>(whatsappLink || '');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (flash?.success || flash?.error) {
      setToastMessage(flash.success || flash.error || '');
      setToastType(flash.success ? 'success' : 'error');
      setShowToast(true);
    }
  }, [flash]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.post(
      route('link.group-whatsapp.update'),
      { whatsapp_link: link },
      {
        preserveScroll: true,
        onSuccess: () => {
          setErrors({});
          setToastMessage(flash?.success || 'Link berhasil diperbarui.');
          setToastType('success');
          setShowToast(true);
        },
        onError: (err: FormErrors) => {
          setErrors(err);
          setToastMessage(err?.whatsapp_link || 'Terjadi kesalahan saat memperbarui link.');
          setToastType('error');
          setShowToast(true);
        },
      },
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Link Group WhatsApp" />
      <div className="flex">
        <div className="from-background to-muted/20 flex w-full max-w-md flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">
          <ToastNotification message={toastMessage} type={toastType} visible={showToast} />
          <Heading
            title="Group WhatsApp"
            description="Form untuk mengelola link group WhatsApp calon anggota COMIT yang ada di pendaftaran anggota."
          />
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp_link">Link Grup WhatsApp</Label>
              <Input id="whatsapp_link" name="whatsapp_link" type="url" value={link} onChange={(e) => setLink(e.target.value)} />
              {errors.whatsapp_link && <p className="text-sm text-red-600">{errors.whatsapp_link}</p>}
            </div>
            <Button className="w-full" type="submit">
              Simpan
            </Button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
