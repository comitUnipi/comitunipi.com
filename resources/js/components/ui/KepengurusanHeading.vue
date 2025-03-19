<template>
  <div class="container mx-auto px-2 text-center mb-[100px] max-w-[620px]">
    <span class="font-semibold text-lg text-primary mb-2 block">
      Perkenalkan
    </span>
    <h2 id="text-heading" class="font-bold text-5xl  md:text-[60px] mb-4">
      {{ jobdesk }}
    </h2>
    <p class="text-md sm:text-xl leading-relaxed sm:leading-relaxed text-gray-700">
      Kepengurusan COMIT 2024-2025 <br> (Sahitya Arsa).
    </p>
  </div>
</template>

<script setup>
defineProps({
  jobdesk: {
    type: String,
    required: true
  }
});
</script>
