<template>

  <Loading v-if="isLoading" />

  <Head title="Visi dan Misi COMIT">
    <link rel="icon" href="/images/logo_black.png" />
    <meta name="description"
      content="Temukan visi dan misi COMIT (Community of Information Technology), yang mencerminkan komitmen kami untuk mencapai tujuan jangka panjang dan memberikan dampak positif dibidang teknologi informasi.">
  </Head>

  <Main :user="props.user">
    <Heading img="https://comit-unipi.vercel.app/_next/image?url=%2Farduino.png&w=1920&q=75" />
    <About />
  </Main>
</template>

<script setup>
import Main from '@/Layouts/Main.vue';
import About from '@/components/About.vue';
import Loading from '@/components/Loading.vue';
import Heading from '@/components/ui/Heading.vue';

import { Head } from '@inertiajs/vue3';
import { useLoading } from '@/hooks/useLoading';
const { isLoading } = useLoading();

const props = defineProps({
  user: Object,
});
</script>
