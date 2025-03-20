<template>
  <button @click="toggleMenu"
    class="block absolute right-4 top-1/2 -translate-y-1/2 lg:hidden focus:ring-2 ring-primary px-3 py-[6px] rounded-lg">
    <span class="relative w-[30px] h-[2px] my-[6px] block bg-white"></span>
    <span class="relative w-[30px] h-[2px] my-[6px] block bg-white"></span>
    <span class="relative w-[30px] h-[2px] my-[6px] block bg-white"></span>
  </button>
</template>

<script setup>
const emit = defineEmits();

const toggleMenu = () => {
  emit("toggleMobileMenu");
};
</script>
