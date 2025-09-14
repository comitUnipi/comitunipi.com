import Heading from '@/components/heading';
import ToastNotification from '@/components/toast-notification';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useToastFlash from '@/hooks/use-toast-flash';
import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

interface Props {
  whatsappLink: string;
  flash?: {
    success?: string;
    error?: string;
  };
}

export default function Pages({ whatsappLink, flash }: Props) {
  const { showToast, toastMessage, toastType } = useToastFlash(flash);

  const [link, setLink] = useState<string>(whatsappLink || '');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.post(
      route('link.group-whatsapp.update'),
      { whatsapp_link: link },
      {
        preserveScroll: true,
      },
    );
  };

  return (
    <AppLayout
      breadcrumbs={[
        {
          title: 'Group WhatsApp',
          href: '/fitur-khusus/group-whatsapp',
        },
      ]}
    >
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
