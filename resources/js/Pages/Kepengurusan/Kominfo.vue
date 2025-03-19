<template>

  <Loading v-if="isLoading" />

  <Head title="Kominfo - Kepengurusan" />
  <Main :user="props.user">
    <Heading img="https://comit-unipi.vercel.app/_next/image?url=%2Farduino.png&w=1920&q=75" />
    <section class="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
      <div class="container mx-auto">
        <KepengurusanHeading jobdesk="Kominfo Kami" />
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
const { isLoading } = useLoading();

const props = defineProps({
  user: Object,
});
</script>

<script>
export default {
  data() {
    return {
      kepengurusan: [
        {
          id: 1,
          img: "/images/kepengurusan-2024-2025/kominfo-1.jpg",
          nama: "Siti Salwa Salsabila",
          job: "Kominfo",
        },
        {
          id: 2,
          img: "/images/kepengurusan-2024-2025/kominfo-2.jpg",
          nama: "Nur Rokhman",
          job: "Kominfo",
        },
        {
          id: 3,
          img: "/images/kepengurusan-2024-2025/kominfo-3.jpg",
          nama: "Indah Febriyani",
          job: "Kominfo",
        },
        {
          id: 4,
          img: "/images/kepengurusan-2024-2025/kominfo-4.jpg",
          nama: "Nisa Risqiyani",
          job: "Kominfo",
        },
      ]
    };
  }
}
</script>
