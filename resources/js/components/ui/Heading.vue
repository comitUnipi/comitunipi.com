<template>
  <div class="relative z-0 w-full bg-black py-48 px-5">
    <div class="relative z-10 text-center text-white mx-auto max-w-xl">
      <h1 id="text" class="text-5xl lg:text-7xl mb-4 font-bold italic">
        Community of Information Technology
      </h1>
      <p class="mb-3 text-lg">Semangat Comit, Salam Teknologi!!</p>
      <a href="/pendaftaran-anggota"
        class="mt-3 inline-block rounded-lg text-lg px-8 py-3 bg-blue-600 text-white">Gabung
        Sekarang</a>
    </div>
    <img :src="img" alt="background" class="w-full h-full absolute inset-0 object-cover opacity-50">
  </div>
</template>

<script setup>
defineProps({
  img: String,
});
</script>
