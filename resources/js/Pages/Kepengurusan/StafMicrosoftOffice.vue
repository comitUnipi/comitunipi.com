<template>

  <Loading v-if="isLoading" />

  <Head title="Staff Microsoft Office - Kepengurusan" />
  <Main :user="props.user">
    <Heading img="https://comit-unipi.vercel.app/_next/image?url=%2Farduino.png&w=1920&q=75" />
    <section class="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
      <div class="container mx-auto">
        <KepengurusanHeading jobdesk="Staff Microsoft Office Kami" />
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
          img: "/images/kepengurusan-2024-2025/ms-office-1.jpg",
          nama: "Dinda Angraini",
          job: "Staff Microsoft Office",
        },
        {
          id: 2,
          img: "/images/kepengurusan-2024-2025/ms-office-2.jpg",
          nama: "Nabila Zahira",
          job: "Staff Microsoft Office",
        },
        {
          id: 3,
          img: "/images/kepengurusan-2024-2025/ms-office-3.jpg",
          nama: "Bunga Dwi",
          job: "Staff Microsoft Office",
        },
        {
          id: 4,
          img: "/images/kepengurusan-2024-2025/ms-office-4.jpg",
          nama: "Amelia Pramesti",
          job: "Staff Microsoft Office",
        },
      ]
    };
  }
}
</script>
