<template>
  <div class="w-full sm:w-1/2 lg:w-1/3 px-4">
    <div class="mb-10 flex flex-col items-center">
      <div class="relative rounded-full z-10 mx-auto mb-6">
        <img :src="pengurus.img" alt="image" class="w-[280px] h-[280px] object-cover rounded-full" />
      </div>
      <div class="text-center">
        <h4 class="font-medium text-3xl text-dark mb-2">{{ pengurus.nama }}</h4>
        <p class="font-medium text-lg text-gray-700 mb-5">{{ pengurus.job }}</p>
        <div class="flex items-center justify-center">
          <!-- Optional icons -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  pengurus: Object,
});
</script>
