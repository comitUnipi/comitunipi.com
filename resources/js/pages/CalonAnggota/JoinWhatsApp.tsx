import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';

export default function JoinWhatsApp() {
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
                <a href="https://chat.whatsapp.com/YOUR_GROUP_LINK" target="_blank" rel="noopener noreferrer">
                  <svg className="mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" />
                  </svg>
                  Gabung Grup WhatsApp
                  <div className="absolute inset-0 -top-2 -left-2 w-8 skew-x-12 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 group-hover:animate-pulse" />
                </a>
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
