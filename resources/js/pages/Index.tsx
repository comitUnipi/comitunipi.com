import MentorCard from '@/components/core-card-mentor';
import Footer from '@/components/core-footer';
import Navbar from '@/components/core-navbar';
import SubHeading from '@/components/core-sub-heading';
import { mentors } from '@/constants/mentor';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Community of Information Technology" />
            <Navbar />
            <div className="relative z-0 w-full bg-black px-5 py-48">
                <div className="relative z-10 mx-auto max-w-xl text-center text-white">
                    <h1 id="text" className="mb-4 text-5xl font-bold italic lg:text-7xl">
                        Community of Information Technology
                    </h1>
                    <p className="mb-3 text-lg">Semangat Comit, Salam Teknologi!!</p>
                    <a href="/register" className="mt-3 inline-block rounded-lg bg-blue-600 px-8 py-3 text-lg text-white">
                        Gabung Sekarang
                    </a>
                </div>
                <img src="/images/100102.png" alt="background" className="absolute inset-0 h-full w-full object-cover opacity-50" />
            </div>

            <section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20">
                <div className="container mx-auto">
                    <div className="flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="mx-auto mb-[60px]">
                                <span className="text-primary mb-2 block text-center text-lg font-semibold">Visi dan Misi</span>
                                <h2 id="text-heading" className="text-dark mb-4 text-center text-4xl font-bold md:text-[42px]">
                                    Tentang Kami
                                </h2>
                                <div className="flex justify-center">
                                    <p className="max-w-6xl text-justify leading-relaxed text-gray-700 sm:text-lg sm:leading-relaxed">
                                        Sebagai mahasiswa yang sadar akan panggilan ilmu pengetahuan dan perkembangan teknologi serta mengupayakan
                                        penerapan etika Ilmu Pengetahuan dan Tri Dharma Perguruan Tinggi. Menyadari akan tanggung jawab itu maka kami
                                        mahasiswa Kampus Insan Pembangunan berkewajiban membina diri agar menjadi bangsa yang memiliki kemampuan
                                        akademik dan profesi, sehingga dapat menerapkan ilmu pengetahuan dan mengembangkan teknologi. Oleh karena itu
                                        kami menghimpun diri dalam suatu wadah Organisasi dibidang Teknologi, dengan nama “ Community of Information
                                        Technology “ pada tanggal 14 Februari 2010.
                                    </p>
                                </div>
                                <div className="mt-4 flex items-center justify-center gap-10">
                                    <div className="hidden md:block">
                                        <img className="w-[600px] rounded-md" src="/images/100104.png" alt="content" />
                                    </div>
                                    <div className="max-w-[500px]">
                                        <div>
                                            <h3 className="text-dark mb-4 text-2xl font-bold">Visi Kami</h3>
                                            <ol className="relative border-s border-gray-200 text-lg text-gray-700">
                                                <li className="ms-4 mb-3">
                                                    <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200"></div>
                                                    <p className="text-muted-foreground text-justify">
                                                        Melaksanakan berbagai kegiatan yang bermanfaat dan yang bernilai positif.
                                                    </p>
                                                </li>
                                                <li className="ms-4 mb-3">
                                                    <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200"></div>
                                                    <p className="text-muted-foreground text-justify">
                                                        Menjalin kerjasama dengan berbagai pihak dalam bidang teknologi informasi.
                                                    </p>
                                                </li>
                                            </ol>
                                        </div>
                                        <div className="mt-4">
                                            <h3 className="text-dark mb-4 text-2xl font-bold">Misi Kami</h3>
                                            <ol className="relative border-s border-gray-200 text-lg text-gray-700">
                                                <li className="ms-4 mb-3">
                                                    <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200"></div>
                                                    <p className="text-muted-foreground text-justify">
                                                        Menghasilkan anggota COMIT yang handal dalam dunia informasi.
                                                    </p>
                                                </li>
                                                <li className="ms-4 mb-3">
                                                    <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200"></div>
                                                    <p className="text-muted-foreground text-justify">Memajukan dan mengembangkan almamater.</p>
                                                </li>
                                                <li className="ms-4 mb-3">
                                                    <div className="absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200"></div>
                                                    <p className="text-muted-foreground text-justify">
                                                        Menjadikan organisasi COMIT, sebagai organisasi yang unggul baik secara akademis maupun non
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
                                <h4 className="text-center text-xl font-bold">Desain Grafis</h4>
                            </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2 lg:w-1/4">
                            <div className="mb-12 flex h-20 items-center justify-center rounded-md bg-white">
                                <h4 className="text-center text-xl font-bold">Programming</h4>
                            </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2 lg:w-1/4">
                            <div className="mb-12 flex h-20 items-center justify-center rounded-md bg-white">
                                <h4 className="text-center text-xl font-bold">Comp and Network</h4>
                            </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2 lg:w-1/4">
                            <div className="mb-12 flex h-20 items-center justify-center rounded-md bg-white">
                                <h4 className="text-center text-xl font-bold">Microsoft Office</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-20 pb-10 lg:pt-[120px] lg:pb-20">
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
            <Footer />
        </>
    );
}
