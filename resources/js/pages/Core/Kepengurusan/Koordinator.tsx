import KepengurusanCard from '@/components/core-card-kepengurusan';
import Heading from '@/components/core-heading';
import KepengurusanHeading from '@/components/core-heading-kepengurusan';
import { kepengurusan } from '@/constants/kepengurusan/koordinator';
import MainLayout from '@/layouts/main-layout';
import { Head } from '@inertiajs/react';

export default function Koordinator() {
  return (
    <>
      <Head title="Koordinator Kami Periode 2024-2025">
        <meta
          name="robots"
          content="index, follow"
        />
        <meta
          rel="canonical"
          content="https://comitunipi.com/kepengurusan/koordinator"
        />
        <meta
          name="description"
          content="Kenali koordinator COMIT periode 2024-2025"
        />

        <meta
          property="og:title"
          content="Koordinator Kami Periode 2024-2025 - COMIT UNIPI"
        />
        <meta
          property="og:description"
          content="Kenali koordinator COMIT periode 2024-2025"
        />
        <meta
          property="og:image"
          content="https://comitunipi.com/images/banner.png"
        />
        <meta
          property="og:image:width"
          content="1200"
        />
        <meta
          property="og:image:height"
          content="630"
        />
        <meta
          property="og:url"
          content="https://comitunipi.com/kepengurusan/koordinator"
        />
        <meta
          property="og:type"
          content="website"
        />
        <meta
          property="og:site_name"
          content="COMIT UNIPI"
        />
        <meta
          property="og:locale"
          content="id_ID"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Koordinator Kami Periode 2024-2025 - COMIT UNIPI',
            url: 'https://comitunipi.com/kepengurusan/koordinator',
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
                    name: 'COMIT UNIPI',
                    url: 'https://comitunipi.com/',
                  },
                },
              })),
            },
            sameAs: [
              'https://www.instagram.com/comit.ipem/',
              'https://www.tiktok.com/@comit_unipi',
              'https://github.com/comitUnipi',
            ],
          })}
        </script>
      </Head>
      <MainLayout>
        <Heading img="/images/100101.png" />
        <section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20">
          <div className="container mx-auto">
            <KepengurusanHeading jobdesk="Koordinator Kami" />
            <div className="mx-4 flex flex-wrap justify-center gap-20">
              {kepengurusan.map((pengurus) => (
                <KepengurusanCard
                  key={pengurus.id}
                  pengurus={pengurus}
                />
              ))}
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
