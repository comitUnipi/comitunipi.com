<template>

  <Head title="Ketua dan Wakil Ketua Umum - Kepengurusan" />
  <Main>
    <BannerKepengurusan title="Bendahara Comit" />
    <section class="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
      <div class="container mx-auto">
        <div class="flex flex-wrap gap-20 justify-center mx-4">
          <div v-for="mentor in mentors" :key="mentor.id" class="w-full sm:w-1/2 lg:w-1/4 px-4">
            <div class="mb-10 flex flex-col items-center">
              <div class="relative rounded-full z-10 mx-auto mb-6">
                <img :src="mentor.img" alt="image" class="w-[280px] h-[280px] object-cover rounded-full" />
              </div>
              <div class="text-center">
                <h4 class="font-medium text-2xl text-dark mb-2">
                  {{ mentor.nama }}
                </h4>
                <p class="font-medium text-md text-body-color mb-5">
                  {{ mentor.job }}
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
      mentors: [
        {
          id: 1,
          img: "/images/kepengurusan-2024-2025/bendahara-1.jpg",
          nama: "Latifah Alawiyah",
          job: "Bendahara 1",
        },
        {
          id: 2,
          img: "/images/kepengurusan-2024-2025/bendahara-2.jpg",
          nama: "Nurlia Efrianti Rambe",
          job: "Bendahara 2",
        },
      ]
    };
  }
}
</script>
