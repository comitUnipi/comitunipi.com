import Heading from '@/components/core-heading';
import MainLayout from '@/layouts/main-layout';
import { Head } from '@inertiajs/react';

export default function Pages() {
  return (
    <>
      <Head title="Pengenalan Visi dan Misi">
        <meta
          name="robots"
          content="index, follow"
        />
        <meta
          rel="canonical"
          content="https://comitunipi.com/visi-dan-misi"
        />
        <meta
          name="description"
          content="Pelajari visi dan misi COMIT, salah satu organisasi mahasiswa di Universitas Insan Pembangunan Indonesia yang berkomitmen dalam pengembangan teknologi informasi dan peningkatan kualitas akademik."
        />

        <meta
          property="og:title"
          content="Pengenalan Visi dan Misi - COMIT UNIPI"
        />
        <meta
          property="og:description"
          content="Pelajari visi dan misi COMIT, salah satu organisasi mahasiswa di Universitas Insan Pembangunan Indonesia yang berkomitmen dalam pengembangan teknologi informasi dan peningkatan kualitas akademik."
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
          content="https://comitunipi.com/visi-dan-misi"
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
            name: 'Pengenalan Visi dan Misi - COMIT UNIPI',
            url: 'https://comitunipi.com/visi-dan-misi',
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
        <Heading img="/images/100107.png" />
        <section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20 dark:bg-white">
          <div className="container mx-auto">
            <div className="flex flex-wrap">
              <div className="w-full px-4">
                <div className="mx-auto mb-[60px]">
                  <span className="text-primary mb-2 block text-center text-lg font-semibold">
                    Visi dan Misi
                  </span>
                  <h2
                    id="text-heading"
                    className="mb-4 text-center text-4xl font-bold text-black md:text-[42px]"
                  >
                    Tentang Kami
                  </h2>
                  <div className="flex justify-center">
                    <p className="max-w-6xl text-justify leading-relaxed text-gray-700 sm:text-lg sm:leading-relaxed">
                      Sebagai mahasiswa yang sadar akan panggilan ilmu
                      pengetahuan dan perkembangan teknologi serta mengupayakan
                      penerapan etika Ilmu Pengetahuan dan Tri Dharma Perguruan
                      Tinggi. Menyadari akan tanggung jawab itu maka kami
                      mahasiswa Kampus Insan Pembangunan berkewajiban membina
                      diri agar menjadi bangsa yang memiliki kemampuan akademik
                      dan profesi, sehingga dapat menerapkan ilmu pengetahuan
                      dan mengembangkan teknologi. Oleh karena itu kami
                      menghimpun diri dalam suatu wadah Organisasi dibidang
                      Teknologi, dengan nama “ Community of Information
                      Technology “ pada tanggal 14 Februari 2010.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-10">
                    <div className="hidden md:block">
                      <img
                        className="w-[600px] rounded-md"
                        src="/images/100104.png"
                        alt="content"
                      />
                    </div>
                    <div className="max-w-[500px]">
                      <div>
                        <h3 className="mb-4 text-2xl font-bold text-black">
                          Visi Kami
                        </h3>
                        <ol className="relative border-s border-gray-200 text-lg text-gray-700">
                          <li className="ms-4 mb-3">
                            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200"></div>
                            <p className="text-justify text-gray-700">
                              Melaksanakan berbagai kegiatan yang bermanfaat dan
                              yang bernilai positif.
                            </p>
                          </li>
                          <li className="ms-4 mb-3">
                            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200"></div>
                            <p className="text-justify text-gray-700">
                              Menjalin kerjasama dengan berbagai pihak dalam
                              bidang teknologi informasi.
                            </p>
                          </li>
                        </ol>
                      </div>
                      <div className="mt-4">
                        <h3 className="mb-4 text-2xl font-bold text-black">
                          Misi Kami
                        </h3>
                        <ol className="relative border-s border-gray-200 text-lg text-gray-700">
                          <li className="ms-4 mb-3">
                            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200"></div>
                            <p className="text-justify text-gray-700">
                              Menghasilkan anggota COMIT yang handal dalam dunia
                              informasi.
                            </p>
                          </li>
                          <li className="ms-4 mb-3">
                            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200"></div>
                            <p className="text-justify text-gray-700">
                              Memajukan dan mengembangkan almamater.
                            </p>
                          </li>
                          <li className="ms-4 mb-3">
                            <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200"></div>
                            <p className="text-justify text-gray-700">
                              Menjadikan organisasi COMIT, sebagai organisasi
                              yang unggul baik secara akademis maupun non
                              akademis.
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
      </MainLayout>
    </>
  );
}
