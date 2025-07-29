import { Head } from '@inertiajs/react';

export default function JoinWhatsApp() {
  return (
    <>
      <Head title="Gabung Grup WhatsApp" />
      <div className="mx-auto mt-16 max-w-xl text-center">
        <h1 className="mb-4 text-2xl font-bold">🎉 Pendaftaran Berhasil</h1>
        <p className="mb-6 text-gray-600">Terima kasih telah mendaftar! Sekarang, silakan bergabung ke grup WhatsApp COMIT.</p>
        <a
          href="https://chat.whatsapp.com/YOUR_GROUP_LINK"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-md bg-green-500 px-6 py-3 text-white transition hover:bg-green-600"
        >
          Gabung Grup WhatsApp
        </a>
      </div>
    </>
  );
}
