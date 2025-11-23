import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Calendar, MessageSquare, Tag } from 'lucide-react';

interface KritikSaran {
  id: number;
  kategori: string;
  pesan: string;
  created_at: string;
}

interface Props {
  kritik_saran: KritikSaran;
}

export default function ShowKritikSaran({ kritik_saran }: Props) {
  const categoryColor = (category: string) => {
    switch (category) {
      case 'Pelatihan Akademik':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Kepengurusan':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <AppLayout
      breadcrumbs={[
        {
          title: 'Kritik dan Saran',
          href: route('kritik-saran.index'),
        },
        {
          title: 'Detail',
          href: '#',
        },
      ]}
    >
      <Head title={`Detail Kritik dan Saran #${kritik_saran.id}`} />
      <div className="from-background to-muted/20 flex h-full flex-1 flex-col gap-4 rounded-xl bg-gradient-to-br p-3 sm:gap-6 sm:p-4 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Heading
            title="Detail Kritik dan Saran"
            description="Informasi lengkap mengenai kritik dan saran dari pengguna."
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-card rounded-xl border p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-lg">
                  <Tag className="size-6" />
                </div>
                <div>
                  <h3 className="text-muted-foreground font-medium">
                    Kategori
                  </h3>
                  <p>
                    <span
                      className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-semibold ${categoryColor(
                        kritik_saran.kategori,
                      )}`}
                    >
                      {kritik_saran.kategori}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-xl border p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-lg">
                  <Calendar className="size-6" />
                </div>
                <div>
                  <h3 className="text-muted-foreground font-medium">
                    Tanggal Kirim
                  </h3>
                  <p className="text-foreground mt-1 text-sm">
                    {new Date(kritik_saran.created_at).toLocaleDateString(
                      'id-ID',
                      {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      },
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-6 lg:col-span-2">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-lg">
                <MessageSquare className="size-6" />
              </div>
              <div>
                <h3 className="text-muted-foreground font-medium">Pesan</h3>
                <p className="text-foreground mt-1 leading-relaxed">
                  {kritik_saran.pesan}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
