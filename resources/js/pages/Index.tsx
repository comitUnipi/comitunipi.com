import MentorCard from '@/components/core-card-mentor';
import Heading from '@/components/core-heading';
import SubHeading from '@/components/core-sub-heading';
import { mentors } from '@/constants/mentor';
import { useAnimatedCounter } from '@/hooks/use-animated-counter';
import MainLayout from '@/layouts/main-layout';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
  const { props } = usePage();
  const userCount = props.userCount || 0;

  return (
    <>
      <Head title="Community of Information Technology">
        <meta name="robots" content="index, follow" />
        <meta rel="canonical" content="https://comitunipi.com/" />
        <meta
          name="description"
          content="Bergabung dengan COMIT UNIPI, salah satu organisasi mahasiswa di Universitas Insan Pembangunan Indonesia (UNIPI) yang bergerak di bidang teknologi informasi."
        />
        <meta property="og:title" content="Community of Information Technology - COMIT UNIPI" />
        <meta
          property="og:description"
          content="Bergabung dengan COMIT, salah satu organisasi mahasiswa di Universitas Insan Pembangunan Indonesia (UNIPI) yang bergerak di bidang teknologi informasi."
        />
        <meta property="og:image" content="https://comitunipi.com/images/banner.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://comitunipi.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="COMIT UNIPI" />
        <meta property="og:locale" content="id_ID" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Community of Information Technology - COMIT UNIPI',
            url: 'https://comitunipi.com/',
            logo: 'https://comitunipi.com/logo_black.png',
            email: 'comit.unipi@gmail.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Jl. Raya Serang Km. 10 Bitung',
              addressLocality: 'Tangerang',
              addressRegion: 'Banten',
              addressCountry: 'ID',
            },
            sameAs: ['https://www.instagram.com/comit.ipem/', 'https://www.tiktok.com/@comit_unipi', 'https://github.com/comitUnipi'],
          })}
        </script>
      </Head>
      <MainLayout>
        <Heading img="/images/100102.png" />
        <section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20 dark:bg-white">
          <div className="container mx-auto">
            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <div className="mx-auto mb-[60px]">
                  <span className="text-primary mb-2 block text-center text-lg font-semibold">Visi dan Misi</span>
                  <h2 id="text-heading" className="mb-4 text-center text-4xl font-bold text-black md:text-[42px]">
                    Tentang Kami
                  </h2>
                  <div className="flex justify-center">
                    <p className="max-w-6xl text-justify leading-relaxed text-gray-700 sm:text-lg sm:leading-relaxed">
                      Sebagai mahasiswa yang sadar akan panggilan ilmu pengetahuan dan perkembangan teknologi serta mengupayakan penerapan etika Ilmu
                      Pengetahuan dan Tri Dharma Perguruan Tinggi. Menyadari akan tanggung jawab itu maka kami mahasiswa Kampus Insan Pembangunan
                      berkewajiban membina diri agar menjadi bangsa yang memiliki kemampuan akademik dan profesi, sehingga dapat menerapkan ilmu
                      pengetahuan dan mengembangkan teknologi. Oleh karena itu kami menghimpun diri dalam suatu wadah Organisasi dibidang Teknologi,
                      dengan nama “ Community of Information Technology “ pada tanggal 14 Februari 2010.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-10">
                    <div className="hidden md:block">
                      <img className="w-[600px] rounded-md" src="/images/100104.png" alt="content" />
                    </div>
                    <div className="max-w-[500px]">
                      <div>
                        <h3 className="mb-4 text-2xl font-bold text-black">Visi Kami</h3>
                        <ol className="relative border-s border-gray-200 text-lg text-gray-700">
                          <li className="ms-4 mb-3">
                            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200"></div>
                            <p className="text-justify text-gray-700">Melaksanakan berbagai kegiatan yang bermanfaat dan yang bernilai positif.</p>
                          </li>
                          <li className="ms-4 mb-3">
                            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200"></div>
                            <p className="text-justify text-gray-700">Menjalin kerjasama dengan berbagai pihak dalam bidang teknologi informasi.</p>
                          </li>
                        </ol>
                      </div>
                      <div className="mt-4">
                        <h3 className="mb-4 text-2xl font-bold text-black">Misi Kami</h3>
                        <ol className="relative border-s border-gray-200 text-lg text-gray-700">
                          <li className="ms-4 mb-3">
                            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200"></div>
                            <p className="text-justify text-gray-700">Menghasilkan anggota COMIT yang handal dalam dunia informasi.</p>
                          </li>
                          <li className="ms-4 mb-3">
                            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200"></div>
                            <p className="text-justify text-gray-700">Memajukan dan mengembangkan almamater.</p>
                          </li>
                          <li className="ms-4 mb-3">
                            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200"></div>
                            <p className="text-justify text-gray-700">
                              Menjadikan organisasi COMIT, sebagai organisasi yang unggul baik secara akademis maupun non akademis.
                            </p>
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-blue-600 pt-20 pb-8 lg:pt-[120px] lg:pb-[70px]">
          <div className="container mx-auto">
            <div className="mx-4 flex flex-wrap">
              <div className="w-full px-4">
                <div className="mb-12 max-w-[620px] lg:mb-20">
                  <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-[42px]">Apa yang Kami Tawarkan?</h2>
                  <p className="text-lg leading-relaxed text-gray-100 sm:text-xl sm:leading-relaxed">
                    Kami Mempunyai Beberapa Akademik yang Bisa Membantu Anda dalam Belajar tentang Teknologi
                  </p>
                </div>
              </div>
            </div>
            <div className="mx-4 flex flex-wrap">
              <div className="w-full px-4 md:w-1/2 lg:w-1/4">
                <div className="mb-12 flex h-20 items-center justify-center rounded-md bg-white">
                  <h4 className="text-center text-xl font-bold dark:text-black">Desain Grafis</h4>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2 lg:w-1/4">
                <div className="mb-12 flex h-20 items-center justify-center rounded-md bg-white">
                  <h4 className="text-center text-xl font-bold dark:text-black">Programming</h4>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2 lg:w-1/4">
                <div className="mb-12 flex h-20 items-center justify-center rounded-md bg-white">
                  <h4 className="text-center text-xl font-bold dark:text-black">Comp and Network</h4>
                </div>
              </div>
              <div className="w-full px-4 md:w-1/2 lg:w-1/4">
                <div className="mb-12 flex h-20 items-center justify-center rounded-md bg-white">
                  <h4 className="text-center text-xl font-bold dark:text-black">Microsoft Office</h4>
                </div>
              </div>
            </div>
            <div className="container mx-auto flex flex-col items-center justify-between px-6 py-12 text-center text-white md:flex-row md:text-left">
              <div>
                <h2 className="text-3xl font-bold">Gabung dengan Organisasi Kami</h2>
                <p className="mt-2 text-blue-200">Temukan rekan, mentor, dan teman baru di sini.</p>
              </div>
              <div className="mt-8 flex items-center gap-4 md:mt-0">
                <div className="text-6xl font-bold">{useAnimatedCounter(userCount, 2000)}+</div>
                <span className="text-xl font-medium">Anggota</span>
              </div>
            </div>
          </div>
        </section>
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
