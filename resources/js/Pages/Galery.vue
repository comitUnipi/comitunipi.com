<template>

  <Loading v-if="isLoading" />

  <Head title="Galeri COMIT">
    <link rel="icon" href="/images/logo_black.png" />
    <meta name="description"
      content="Jelajahi galeri COMIT yang menampilkan berbagai momen berharga, kegiatan, dan acara yang telah kami selenggarakan. Temukan berbagai aktivitas yang memperkaya komunitas teknologi informasi kami.">
  </Head>

  <Main :user="props.user">
    <Heading img="https://comit-unipi.vercel.app/_next/image?url=%2Farduino.png&w=1920&q=75" />
    <Galery />
  </Main>

</template>

<script setup>
import Main from '@/Layouts/Main.vue';
import Loading from '@/components/Loading.vue';
import Galery from '@/components/Galery.vue';
import Heading from '@/components/ui/Heading.vue';

import { Head } from '@inertiajs/vue3';
import { useLoading } from '@/hooks/useLoading';
const { isLoading } = useLoading();

const props = defineProps({
  user: Object,
});
</script>
