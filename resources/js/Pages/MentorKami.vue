<template>

  <Loading v-if="isLoading" />

  <Head title="Mentor COMIT">
    <link rel="icon" href="/images/logo_black.png" />
    <meta name="description"
      content="Kami mempunyai beberapa mentor yang sudah berpengalaman di bidangnya masing-masing.">
  </Head>

  <Main :user="props.user">
    <Heading img="https://comit-unipi.vercel.app/_next/image?url=%2Fbanner.png&w=1920&q=75" />
    <Mentor />
  </Main>
</template>

<script setup>
import Main from '@/Layouts/Main.vue';
import Mentor from '@/components/Mentor.vue';
import Loading from '@/components/Loading.vue';
import Heading from '@/components/ui/Heading.vue';

import { Head } from '@inertiajs/vue3';
import { useLoading } from '@/hooks/useLoading';
const { isLoading } = useLoading();

const props = defineProps({
  user: Object,
});
</script>
