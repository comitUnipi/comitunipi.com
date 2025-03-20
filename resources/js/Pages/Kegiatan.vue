<template>

  <Loading v-if="isLoading" />

  <Head title="Kegiatan COMIT">
    <link rel="icon" href="/images/logo_black.png" />
    <meta name="description"
      content="Jelajahi berbagai kegiatan yang diselenggarakan oleh COMIT, dengan dukungan mentor berpengalaman di bidang teknologi informasi. Bergabunglah untuk mengembangkan keterampilan dan memperluas jaringan di dunia IT.">
  </Head>

  <Main :user="props.user">
    <Heading img="/images/100104.png" />
    <div class="container mx-auto py-20 px-5">
      <SubHeading title="Kegiatan Kami" description="Kami dengan bangga mempersembahkan berbagai kegiatan dan acara yang telah kami selenggarakan. Setiap acara
            dirancang untuk memberikan pengalaman yang berkesan dan penuh makna." />
      <article>
        <div class="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
          <img src="/images/100103.png" alt="kegiatan" class="w-full md:w-1/2 h-auto md:rounded-md shadow-md">
          <div class="md:max-w-3xl">
            <h2 class="text-2xl font-bold mb-4">Workshop Data Analyst</h2>
            <p class="text-md text-justify text-gray-700 mb-4">Dalam Workshop Data Analyst yang telah kami
              laksanakan, peserta memperoleh keterampilan penting dalam menganalisis dan menginterpretasikan data.</p>
          </div>
        </div>
      </article>
      <article>
        <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img src="/images/100101.png" alt="kegiatan" class="w-full md:w-1/2 h-auto md:rounded-md shadow-md">
          <div class="md:max-w-3xl">
            <h2 class="text-2xl font-bold mb-4">Workshop Arduino</h2>
            <p class="text-md text-justify text-gray-700 mb-4">Workshop Arduino yang telah kami selenggarakan
              memberikan pengalaman langsung kepada peserta dalam dunia elektronik dan pemrograman. Peserta belajar
              menggunakan platform Arduino untuk merancang dan mengembangkan project tentang lampu pintar.</p>
          </div>
        </div>
      </article>
    </div>
  </Main>
</template>

<script setup>
import Main from '@/Layouts/Main.vue';
import Loading from '@/components/Loading.vue';
import Heading from '@/components/ui/Heading.vue';
import SubHeading from '@/components/ui/SubHeading.vue';

import { Head } from '@inertiajs/vue3';
import { useLoading } from '@/hooks/useLoading';
const { isLoading } = useLoading();

const props = defineProps({
  user: Object,
});
</script>
