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
      <Kegiatan />
    </div>
  </Main>
</template>

<script setup>
import Main from '@/Layouts/Main.vue';
import Loading from '@/components/Loading.vue';
import Heading from '@/components/ui/Heading.vue';
import Kegiatan from '@/components/KegiatanDetail.vue';
import SubHeading from '@/components/ui/SubHeading.vue';

import { Head } from '@inertiajs/vue3';
import { useLoading } from '@/hooks/useLoading';
const { isLoading } = useLoading();

const props = defineProps({
  user: Object,
});
</script>
