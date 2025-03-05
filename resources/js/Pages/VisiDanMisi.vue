<template>

  <Head title="Visi dan Misi" />
  <Main :user="props.user">
    <div class="">
      <div class="relative z-0 w-full bg-black py-48 px-5">
        <div class="relative z-10 text-center text-white mx-auto max-w-xl">
          <h1 id="text" class="text-4xl md:text-5xl lg:text-7xl mb-4 font-bold italic">
            Community of Information Technology
          </h1>
          <p class="mb-3 text-lg">Semangat Comit, Salam Teknologi!!</p>
          <a href="/pendaftaran-anggota"
            class="mt-3 inline-block rounded-lg text-lg px-4 lg:px-8 py-1.5 lg:py-3 bg-blue-600 text-white">Gabung
            Sekarang</a>
        </div>
        <img src="https://comit-unipi.vercel.app/_next/image?url=%2Fbanner.png&w=1920&q=75"
          class="w-full h-full absolute inset-0 object-cover opacity-50">
      </div>
    </div>
    <About />
  </Main>
</template>

<script setup>
import About from '@/components/About.vue';
import Main from '@/Layouts/Main.vue';
import { Head } from '@inertiajs/vue3';
const props = defineProps({
  user: Object,
});
</script>
