<template>

  <Loading v-if="isLoading" />

  <Head title="Koordinator - Kepengurusan" />
  <Main :user="props.user">
    <Heading img="https://comit-unipi.vercel.app/_next/image?url=%2Farduino.png&w=1920&q=75" />
    <section class="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
      <div class="container mx-auto">
        <KepengurusanHeading jobdesk="Koordinator Kami" />
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
import KepengurusanCard from '@/components/ui/KepengurusanCard.vue';
import KepengurusanHeading from '@/components/ui/KepengurusanHeading.vue';
import Heading from '@/components/ui/Heading.vue';
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
          img: "/images/kepengurusan-2024-2025/koor-sdm.jpg",
          nama: "Arif Rhamadan",
          job: "Koordinator SDM",
        },
        {
          id: 2,
          img: "/images/kepengurusan-2024-2025/koor-humas.jpg",
          nama: "Rio Pratama",
          job: "Koordinator Humas",
        },
        {
          id: 3,
          img: "/images/kepengurusan-2024-2025/koor-prasarana.jpg",
          nama: "Alfian Akmal Fauzan",
          job: "Koordinator Prasarana",
        },
        {
          id: 4,
          img: "/images/kepengurusan-2024-2025/koor-kominfo.jpg",
          nama: "Rilla Destiani",
          job: "Koordinator Kominfo",
        },
        {
          id: 5,
          img: "/images/kepengurusan-2024-2025/koor-akademik.jpg",
          nama: "M. Mupid Ahmadiawan",
          job: "Koordinator Akademik",
        },
      ]
    };
  }
}
</script>
