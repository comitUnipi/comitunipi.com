<template>

  <Loading v-if="isLoading" />

  <Head title="Kegiatan" />
  <Main :user="props.user">
    <BannerKegiatan />
    <div class="container mx-auto py-20 px-5">
      <div class="w-full">
        <div class="text-center mx-auto mb-[60px] max-w-[620px]">
          <h2 id="text-heading" class="font-bold text-4xl  md:text-[42px] mb-4">
            Kegiatan Kami
          </h2>
          <p class="text-lg sm:text-xl leading-relaxed sm:leading-relaxed text-gray-700">
            Kami dengan bangga mempersembahkan berbagai kegiatan dan acara yang telah kami selenggarakan. Setiap acara
            dirancang untuk memberikan pengalaman yang berkesan dan penuh makna.
          </p>
        </div>
      </div>
      <article>
        <div class="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
          <img src="https://comit-unipi.vercel.app/_next/image?url=%2Fdata_analyst.png&w=1920&q=75" alt="kegiatan"
            class="w-full md:w-1/2 h-auto md:rounded-md shadow-md">
          <div class="md:max-w-3xl">
            <h2 class="text-2xl font-bold mb-4">Workshop Data Analyst</h2>
            <p class="text-md text-justify text-gray-700 mb-4">Dalam Workshop Data Analyst yang telah kami
              laksanakan, peserta memperoleh keterampilan penting dalam menganalisis dan menginterpretasikan data.</p>
          </div>
        </div>
      </article>
      <article>
        <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img src="https://comit-unipi.vercel.app/_next/image?url=%2Farduino.png&w=1920&q=75" alt="kegiatan"
            class="w-full md:w-1/2 h-auto md:rounded-md shadow-md">
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
import { Head } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import Main from '@/Layouts/Main.vue';
import Loading from '@/components/Loading.vue';
import BannerKegiatan from '@/components/BannerKegiatan.vue';
const props = defineProps({
  user: Object,
});
const isLoading = ref(true);
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});
</script>
