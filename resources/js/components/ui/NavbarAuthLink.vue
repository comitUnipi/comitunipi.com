<template>
  <div class="flex justify-end pr-20 lg:pr-0">
    <template v-if="user">
      <a href="/dashboard"
        class="text-sm md:text-base font-medium text-white bg-blue-500 bg-opacity-80 rounded-lg py-2 px-4 sm:py-3 sm:px-6 hover:bg-opacity-100 duration-300 ease-in-out">Dashboard</a>
    </template>
    <template v-else>
      <a href="/dashboard/login"
        class="text-sm md:text-base font-medium text-white hover:opacity-70 py-2 px-4 md:py-3 md:px-6">Masuk</a>
      <a href="/pendaftaran-anggota"
        class="text-sm md:text-base font-medium text-white bg-blue-500 bg-opacity-80 rounded-lg py-2 px-4 md:py-4 md:px-6 hover:bg-opacity-100 duration-300 ease-in-out">Daftar</a>
    </template>
  </div>
</template>

<script setup>
defineProps({
  user: Object
});
</script>
