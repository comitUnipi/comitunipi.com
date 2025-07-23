import KepengurusanCard from '@/components/core-card-kepengurusan';
import Heading from '@/components/core-heading';
import KepengurusanHeading from '@/components/core-heading-kepengurusan';
import { kepengurusan } from '@/constants/kepengurusan/staff-design-grafis';
import MainLayout from '@/layouts/main-layout';
import { Head } from '@inertiajs/react';

export default function StaffDesignGrafis() {
  return (
    <>
      <Head title="Staff Design Grafis Kami Periode 2024-2025">
        <meta name="robots" content="index, follow" />
        <meta property="canonical" content="https://comitunipi.com/kepengurusan/staff-design-grafis" />
        <meta name="description" content="Kenali staff design grafis COMIT periode 2024-2025" />

        <meta property="og:title" content="Staff Design Grafis Kami Periode 2024-2025 - COMIT" />
        <meta property="og:description" content="Kenali staff design grafis COMIT periode 2024-2025" />
        <meta property="og:image" content="https://comitunipi.com/images/banner.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://comitunipi.com/kepengurusan/staff-design-grafis" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="COMIT" />
        <meta property="og:locale" content="id_ID" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Staff Design Grafis Kami Periode 2024-2025 - COMIT',
            url: 'https://comitunipi.com/kepengurusan/staff-design-grafis',
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: kepengurusan.map((pengurus, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Person',
                  name: pengurus.nama,
                  jobTitle: pengurus.job,
                  image: `https://comitunipi.com${pengurus.img}`,
                  memberOf: {
                    '@type': 'Organization',
                    name: 'COMIT',
                    url: 'https://comitunipi.com/',
                  },
                },
              })),
            },
            sameAs: ['https://www.instagram.com/comit.ipem/', 'https://www.tiktok.com/@comit_unipi', 'https://github.com/comitUnipi'],
          })}
        </script>
      </Head>
      <MainLayout>
        <Heading img="/images/100101.png" />
        <section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20">
          <div className="container mx-auto">
            <KepengurusanHeading jobdesk="Staff Design Grafis Kami" />
            <div className="mx-4 flex flex-wrap justify-center gap-20">
              {kepengurusan.map((pengurus) => (
                <KepengurusanCard key={pengurus.id} pengurus={pengurus} />
              ))}
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
