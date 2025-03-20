<template>
  <div class="w-full px-4">
    <div class="text-center mx-auto mb-[60px] max-w-[620px]">
      <span class="font-semibold text-lg text-primary mb-2 block">
        {{ subtitle }}
      </span>
      <h2 id="text-heading" class="font-bold text-5xl  md:text-[42px] mb-4">
        {{ title }}
      </h2>
      <p class="text-lg sm:text-xl leading-relaxed sm:leading-relaxed text-gray-700">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  subtitle: String,
  title: String,
  description: String,
});
</script>
