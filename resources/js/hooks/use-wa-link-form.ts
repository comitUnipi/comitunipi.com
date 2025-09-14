import { router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

export default function useWaLinkForm(whatsappLink: string) {
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

  return {
    link,
    setLink,
    handleSubmit,
  };
}
