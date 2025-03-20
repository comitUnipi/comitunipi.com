<template>

  <Loading v-if="isLoading" />

  <Head title="Ketua dan Wakil Ketua Umum COMIT">
    <link rel="icon" href="/images/logo_black.png" />
    <meta name="description" content="Kepengurusan COMIT 2024-2025 (Sahitya Arsa).">
  </Head>

  <Main :user="props.user">
    <Heading img="/images/100101.png" />
    <section class="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
      <div class="container mx-auto">
        <KepengurusanHeading jobdesk="Ketua & Wakil Ketua Umum Kami" />
        <div class="flex flex-wrap gap-20 justify-center mx-4">
          <KepengurusanCard v-for="pengurus in kepengurusan" :key="pengurus.id" :pengurus="pengurus" />
        </div>
      </div>
    </section>
  </Main>
</template>

<script setup>
import Main from '@/Layouts/Main.vue';
import Loading from '@/components/Loading.vue';
import Heading from '@/components/ui/Heading.vue';
import KepengurusanCard from '@/components/ui/KepengurusanCard.vue';
import KepengurusanHeading from '@/components/ui/KepengurusanHeading.vue';

import { Head } from '@inertiajs/vue3';
import { useLoading } from '@/hooks/useLoading';
import { kepengurusan } from '@/data/kepengurusan/ketua-dan-wakil-ketua-umum.js';

const { isLoading } = useLoading();

const props = defineProps({
  user: Object,
});
</script>
