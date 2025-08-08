import MentorCard from '@/components/core-card-mentor';
import Heading from '@/components/core-heading';
import SubHeading from '@/components/core-sub-heading';
import { mentors } from '@/constants/mentor';
import MainLayout from '@/layouts/main-layout';
import { Head } from '@inertiajs/react';

export default function Pages() {
  return (
    <>
      <Head title="Pengenalan Mentor Berpengalaman Kami">
        <meta name="robots" content="index, follow" />
        <meta rel="canonical" content="https://comitunipi.com/mentor-kami" />
        <meta
          name="description"
          content="Temukan mentor-mentor berpengalaman dari COMIT yang siap membimbing kamu di bidang IT dan pengembangan diri."
        />

        <meta property="og:title" content="Pengenalan Mentor Berpengalaman Kami - COMIT" />
        <meta
          property="og:description"
          content="Temukan mentor-mentor berpengalaman dari COMIT yang siap membimbing kamu di bidang IT dan pengembangan diri."
        />
        <meta property="og:image" content="https://comitunipi.com/images/banner.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://comitunipi.com/mentor-kami" />
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="COMIT UNIPI" />
        <meta property="og:locale" content="id_ID" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Pengenalan Mentor Berpengalaman Kami - COMIT UNIPI',
            url: 'https://comitunipi.com/mentor-kami',
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: mentors.map((mentor, index) => {
                return {
                  '@type': 'ListItem',
                  position: index + 1,
                  item: {
                    '@type': 'Person',
                    name: mentor.nama,
                    jobTitle: mentor.job,
                    image: `https://comitunipi.com${mentor.img}`,
                    sameAs: mentor.sosmed.map((social) => social.link),
                  },
                };
              }),
            },
            sameAs: ['https://www.instagram.com/comit.ipem/', 'https://www.tiktok.com/@comit_unipi', 'https://github.com/comitUnipi'],
          })}
        </script>
      </Head>
      <MainLayout>
        <Heading img="/images/100111.png" />
        <section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20 dark:bg-white">
          <div className="container mx-auto">
            <SubHeading
              subtitle="Mentor"
              title="Perkenalkan Mentor Kami"
              description="Kami mempunyai beberapa mentor yang sudah berpengalaman di bidangnya masing-masing."
            />
            <div className="mx-4 flex flex-wrap justify-center">
              {mentors.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
}
