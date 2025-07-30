import KegiatanCard from '@/components/core-card-kegiatan';
import Heading from '@/components/core-heading';
import SubHeading from '@/components/core-sub-heading';
import { kegiatan } from '@/constants/kegiatan';
import MainLayout from '@/layouts/main-layout';
import { Head } from '@inertiajs/react';

export default function Kegiatan() {
  return (
    <>
      <Head title="Berbagai Kegiatan Kami">
        <meta name="robots" content="index, follow" />
        <meta rel="canonical" content="https://comitunipi.com/kegiatan-kami" />
        <meta
          name="description"
          content="Ikuti berbagai kegiatan pelatihan IT, Workshop, dan kegiatan Perlombaan bersama COMIT untuk meningkatkan keterampilanmu di bidang teknologi informasi."
        />

        <meta property="og:title" content="Berbagai Kegiatan Kami - COMIT UNIPI" />
        <meta
          property="og:description"
          content="Ikuti berbagai kegiatan pelatihan IT, Workshop, dan kegiatan Perlombaan bersama COMIT untuk meningkatkan keterampilanmu di bidang teknologi informasi."
        />
        <meta property="og:image" content="https://comitunipi.com/images/banner.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://comitunipi.com/kegiatan-kami" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="COMIT UNIPI" />
        <meta property="og:locale" content="id_ID" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Berbagai Kegiatan Kami - COMIT UNIPI',
            url: 'https://comitunipi.com/kegiatan-kami',
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: kegiatan.map((event, index) => {
                const now = new Date();
                const eventDate = new Date(event.date);
                const eventStatus = eventDate < now ? 'EventHappened' : 'EventScheduled';
                const defaultLocation = {
                  '@type': 'Place',
                  name: 'Universitas Insan Pembangunan Indonesia',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Jl. Raya Serang Km. 10 Bitung',
                    addressLocality: 'Tangerang',
                    addressRegion: 'Banten',
                    addressCountry: 'ID',
                  },
                };
                return {
                  '@type': 'ListItem',
                  position: index + 1,
                  item: {
                    '@type': 'Event',
                    name: event.title,
                    description: event.description,
                    image: `https://comitunipi.com${event.img}`,
                    startDate: `${event.date}`,
                    eventStatus: `https://schema.org/${eventStatus}`,
                    location: defaultLocation,
                    organizer: {
                      '@type': 'Organization',
                      name: 'COMIT UNIPI',
                      url: 'https://comitunipi.com',
                    },
                  },
                };
              }),
            },
            sameAs: ['https://www.instagram.com/comit.ipem/', 'https://www.tiktok.com/@comit_unipi', 'https://github.com/comitUnipi'],
          })}
        </script>
      </Head>
      <MainLayout>
        <Heading img="/images/100104.png" />
        <div className="container mx-auto px-5 py-20">
          <SubHeading
            subtitle="Event"
            title="Kegiatan Kami"
            description="Kami dengan bangga mempersembahkan berbagai kegiatan dan acara yang telah kami selenggarakan. Setiap acara
            dirancang untuk memberikan pengalaman yang berkesan dan penuh makna."
          />
          <article>
            {kegiatan.map((item, index) => (
              <KegiatanCard key={index} img={item.img} title={item.title} description={item.description} />
            ))}
          </article>
        </div>
      </MainLayout>
    </>
  );
}
