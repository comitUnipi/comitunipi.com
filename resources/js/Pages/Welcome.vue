<template>

  <Loading v-if="isLoading" />

  <Head title="COMIT">
    <link rel="icon" href="/images/logo_black.png" />
    <meta name="description"
      content="Selamat datang di website COMIT. COMIT (Community of Information Technology) adalah sebuah departement dari kampus universitas insan pembangunan (UNIPI) yang bergerak di bidang teknologi informasi dan komunikasi.">
  </Head>

  <Main :user="props.user">
    <div class="">
      <Heading img="/images/100101.png" />
      <About />
      <Discover />
      <Mentor />
    </div>
  </Main>

</template>

<script setup>
import Main from '@/Layouts/Main.vue';
import About from '@/components/About.vue';
import Mentor from '@/components/Mentor.vue';
import Loading from '@/components/Loading.vue';
import Heading from '@/components/ui/Heading.vue';
import Discover from '@/components/Discover.vue';

import { Head } from '@inertiajs/vue3';
import { useLoading } from '@/hooks/useLoading';
const { isLoading } = useLoading();

const props = defineProps({
  user: Object,
});
</script>
