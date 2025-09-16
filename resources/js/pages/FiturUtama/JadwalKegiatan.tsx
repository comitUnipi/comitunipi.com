import Heading from '@/components/heading';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { capitalizeFirstLetter } from '@/lib/capitalize-first-letter';
import { formatDate } from '@/lib/format-date';
import { Kegiatan } from '@/types';
import { Head } from '@inertiajs/react';
import { Calendar, CalendarDays, Clock, MapPin, Users } from 'lucide-react';

interface Props {
  kegiatan: Kegiatan[];
}

export default function Pages({ kegiatan }: Props) {
  return (
    <AppLayout
      breadcrumbs={[
        {
          title: 'Jadwal Kegiatan',
          href: '/fitur-utama/jadwal-kegiatan',
        },
      ]}
    >
      <Head title="Jadwal Kegiatan" />
      <div className="flex h-full flex-1 flex-col space-y-6 p-4 md:p-6">
        <Heading
          title="Informasi"
          description="Kegiatan yang akan datang!!!"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="max-w-md space-y-6">
            {kegiatan.length > 0 ? (
              kegiatan.map((item) => (
                <Card
                  key={item.id}
                  className="group transition-shadow hover:shadow-md"
                >
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription className="text-justify">
                      {item.description || 'Tidak ada deskripsi tersedia'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-muted-foreground grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="text-muted-foreground h-4 w-4" />
                      <span>{formatDate(item.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="text-muted-foreground h-4 w-4" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="text-muted-foreground h-4 w-4" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="text-muted-foreground h-4 w-4" />
                      <span className="truncate">
                        {capitalizeFirstLetter(item.audiens)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="animate-in fade-in-50 col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div className="bg-muted mx-auto flex h-20 w-20 items-center justify-center rounded-full">
                  <CalendarDays className="text-muted-foreground h-10 w-10" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">
                  Belum Ada Kegiatan
                </h3>
                <p className="text-muted-foreground mt-2 mb-4 max-w-sm text-sm">
                  Kegiatan terbaru akan segera hadir. Pantau terus halaman ini
                  untuk mendapatkan informasi terbaru.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
