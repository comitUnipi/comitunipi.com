import GaleriCard from '@/components/core-card-galeri';
import Heading from '@/components/core-heading';
import GaleriModal from '@/components/core-modal-galeri';
import SubHeading from '@/components/core-sub-heading';
import { galeri } from '@/constants/galeri';
import MainLayout from '@/layouts/main-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

type GaleriItem = {
  src: string;
  alt: string;
};

export default function Pages() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };

  return (
    <>
      <Head title="Galeri Dokumentasi Kegiatan Kami">
        <meta
          name="robots"
          content="index, follow"
        />
        <meta
          rel="canonical"
          content="https://comitunipi.com/galeri-kami"
        />
        <meta
          name="description"
          content="Lihat berbagai dokumentasi kegiatan dan momen berharga bersama Community of Information Technology (COMIT), dari pelatihan, workshop, perlombaan hingga kegiatan sosial."
        />

        <meta
          property="og:title"
          content="Galeri Dokumentasi Kegiatan Kami - COMIT UNIPI"
        />
        <meta
          property="og:description"
          content="Lihat berbagai dokumentasi kegiatan dan momen berharga bersama Community of Information Technology (COMIT), dari pelatihan, workshop, perlombaan hingga kegiatan sosial."
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
          content="https://comitunipi.com/galeri-kami"
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
            '@type': 'Organization',
            name: 'COMIT UNIPI',
            url: 'https://comitunipi.com/galeri-kami',
            logo: 'https://comitunipi.com/logo_black.png',
            email: 'comit.unipi@gmail.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Jl. Raya Serang Km. 10 Bitung',
              addressLocality: 'Tangerang',
              addressRegion: 'Banten',
              addressCountry: 'ID',
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
        <Heading img="/images/100112.png" />
        <section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20">
          <div className="w-full px-4">
            <SubHeading
              subtitle="Dokumentasi"
              title="Galeri Kegiatan Kami"
              description="Dokumentasi perjalanan dan momen berharga bersama Community of Information Technology (COMIT)."
            />
            <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {galeri.map((item: GaleriItem, index: number) => (
                <GaleriCard
                  key={index}
                  item={item}
                  openModal={() => openModal(item.src)}
                />
              ))}
            </div>
            <GaleriModal
              isModalOpen={isModalOpen}
              selectedImage={selectedImage}
              closeModal={closeModal}
            />
          </div>
        </section>
      </MainLayout>
    </>
  );
}
