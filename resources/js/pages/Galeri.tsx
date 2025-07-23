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

export default function Galeri() {
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
      <Head title="Mentor Kami" />
      <MainLayout>
        <Heading img="/images/100112.png" />
        <section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20">
          <div className="w-full px-4">
            <SubHeading subtitle="Dokumentasi" title="Galeri Kegiatan Kami" description="Kami mempunyai banyak kegiatan yang telah dilaksanakan." />
            <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {galeri.map((item: GaleriItem, index: number) => (
                <GaleriCard key={index} item={item} openModal={() => openModal(item.src)} />
              ))}
            </div>
            <GaleriModal isModalOpen={isModalOpen} selectedImage={selectedImage} closeModal={closeModal} />
          </div>
        </section>
      </MainLayout>
    </>
  );
}
