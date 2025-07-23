import KegiatanCard from '@/components/core-card-kegiatan';
import Heading from '@/components/core-heading';
import SubHeading from '@/components/core-sub-heading';
import { kegiatan } from '@/constants/kegiatan';
import { Head } from '@inertiajs/react';
import MainLayout from './Layout';

export default function MentorKami() {
  return (
    <>
      <Head title="Kegiatan Kami" />
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
