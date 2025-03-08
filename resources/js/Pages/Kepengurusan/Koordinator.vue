<template>

  <Loading v-if="isLoading" />

  <Head title="Koordinator - Kepengurusan" />
  <Main :user="props.user">
    <BannerKepengurusan title="Koordinator Comit" />
    <section class="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
      <div class="container mx-auto">
        <div class="flex flex-wrap gap-20 justify-center mx-4">
          <div v-for="pengurus in kepengurusan" :key="pengurus.id" class="w-full sm:w-1/2 lg:w-1/3 px-4">
            <div class="mb-10 flex flex-col items-center">
              <div class="relative rounded-full z-10 mx-auto mb-6">
                <img :src="pengurus.img" alt="image" class="w-[280px] h-[280px] object-cover rounded-full" />
              </div>
              <div class="text-center">
                <h4 class="font-medium text-2xl text-dark mb-2">
                  {{ pengurus.nama }}
                </h4>
                <p class="font-medium text-md text-body-color mb-5">
                  {{ pengurus.job }}
                </p>
                <div class="flex items-center justify-center">
                  <!-- icon -->
                </div>
              </div>
            </div>
          </div>
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
import BannerKepengurusan from '@/components/BannerKepengurusan.vue';
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
