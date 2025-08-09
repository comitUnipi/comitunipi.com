import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';

export default function Pages({ whatsappLink }: { whatsappLink: string }) {
  return (
    <>
      <Head title="Gabung Grup WhatsApp" />
      <div className="relative min-h-screen overflow-hidden bg-white">
        <Card className="border-border mx-auto w-full max-w-2xl rounded-md border shadow-md md:my-4">
          <div className="-mt-8 h-[300px] w-full overflow-hidden rounded-t-md">
            <img src="/images/100114.png" alt="Banner Pendaftaran COMIT" className="block h-full w-full object-cover" />
          </div>
          <CardHeader className="pb-4 text-center">
            <div className="relative mx-auto mb-6 w-fit">
              <div className="mx-auto flex h-28 w-28 transform items-center justify-center bg-transparent transition-transform duration-300 hover:scale-110">
                <img src="/logo_black.png" alt="LOGO COMIT" />
              </div>
              <div className="absolute top-1/2 left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform animate-ping rounded-full border-4 border-blue-300 opacity-30" />
              <div
                className="absolute top-1/2 left-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 transform animate-ping rounded-full border-2 border-blue-200 opacity-20"
                style={{ animationDelay: '0.5s' }}
              />
            </div>
            <CardTitle className="bg-blue-500 bg-clip-text text-3xl font-bold text-transparent">Pendaftaran Berhasil!</CardTitle>
            <CardDescription className="mt-4 text-base leading-relaxed text-slate-600">
              Selamat! Anda telah berhasil mendaftar. Bergabunglah dengan organisasi
              <Badge variant="secondary" className="mx-1 bg-blue-100 text-blue-500 hover:bg-blue-200">
                COMIT
              </Badge>
              di WhatsApp untuk mendapatkan info terbaru.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 text-center">
              <Button
                asChild
                size="lg"
                className="group relative w-full transform overflow-hidden rounded-xl border-0 bg-gradient-to-r from-green-500 to-green-600 py-6 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-green-700 hover:shadow-xl"
              >
                {whatsappLink ? (
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    Gabung Grup WhatsApp
                  </a>
                ) : (
                  <p className="text-sm text-red-500">Link WhatsApp belum tersedia.</p>
                )}
              </Button>
              <Card className="border-blue-200 bg-blue-50/50">
                <CardContent className="p-4">
                  <p className="text-center text-sm text-slate-600">
                    Dengan bergabung, Anda akan mendapatkan notifikasi event, workshop, dan informasi penting lainnya.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
