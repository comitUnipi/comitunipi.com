<template>

  <Loading v-if="isLoading" />

  <Head title="Staff Programming - Kepengurusan" />
  <Main :user="props.user">
    <Heading img="https://comit-unipi.vercel.app/_next/image?url=%2Farduino.png&w=1920&q=75" />
    <section class="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
      <div class="container mx-auto">
        <KepengurusanHeading jobdesk="Staff Programming Kami" />
        <div class="flex flex-wrap gap-20 justify-center mx-4">
          <KepengurusanCard v-for="pengurus in kepengurusan" :key="pengurus.id" :pengurus="pengurus" />
        </div>
      </div>
    </section>
  </Main>
</template>

<script setup>
import { Head } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import Main from '@/Layouts/Main.vue';
import Loading from '@/components/Loading.vue';
import Heading from '@/components/ui/Heading.vue';
import KepengurusanHeading from '@/components/ui/KepengurusanHeading.vue';
import KepengurusanCard from '@/components/ui/KepengurusanCard.vue';
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

<script>
export default {
  data() {
    return {
      kepengurusan: [
        {
          id: 1,
          img: "/images/kepengurusan-2024-2025/program-1.jpg",
          nama: "Crisvin",
          job: "Staff Programming",
        },
        {
          id: 2,
          img: "/images/kepengurusan-2024-2025/program-2.jpg",
          nama: "Ahmad Rohman",
          job: "Staff Programming",
        },
        {
          id: 3,
          img: "/images/kepengurusan-2024-2025/program-3.jpg",
          nama: "Muhammad Wildan",
          job: "Staff Programming",
        },
        {
          id: 4,
          img: "/images/kepengurusan-2024-2025/program-4.jpg",
          nama: "Erik Susanto",
          job: "Staff Programming",
        },
      ]
    };
  }
}
</script>
