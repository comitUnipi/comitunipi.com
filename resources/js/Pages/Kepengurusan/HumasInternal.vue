<template>

  <Head title="Humas Internal - Kepengurusan" />
  <Main>
    <BannerKepengurusan title="Humas Internal Comit" />
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
import BannerKepengurusan from '@/components/BannerKepengurusan.vue';
import Main from '@/Layouts/Main.vue';
</script>

<script>
export default {
  data() {
    return {
      kepengurusan: [
        {
          id: 1,
          img: "/images/kepengurusan-2024-2025/humas-internal-1.jpg",
          nama: "Harits Al Gibran",
          job: "Humas Internal",
        },
        {
          id: 2,
          img: "/images/kepengurusan-2024-2025/humas-internal-2.jpg",
          nama: "Ririn Risqi Sulistya",
          job: "Humas Internal",
        },
        {
          id: 3,
          img: "/images/kepengurusan-2024-2025/humas-internal-3.jpg",
          nama: "Amelia Aulia Pradita",
          job: "Humas Internal",
        },
        {
          id: 4,
          img: "/images/kepengurusan-2024-2025/humas-internal-4.jpg",
          nama: "Syafira Khairunnisa",
          job: "Humas Internal",
        },
      ]
    };
  }
}
</script>
