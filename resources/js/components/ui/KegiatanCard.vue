<template>
  <article>
    <div class="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
      <img :src="img" alt="kegiatan" class="w-full md:w-1/2 h-auto rounded-md shadow-md" />
      <div class="md:max-w-3xl">
        <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
        <p class="text-md text-justify text-gray-700 mb-4">{{ description }}</p>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  img: String,
  title: String,
  description: String,
});
</script>
