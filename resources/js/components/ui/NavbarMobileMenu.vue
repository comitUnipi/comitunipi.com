<template>
  <div v-if="isMobileMenuOpen" class="lg:hidden w-72 rounded-md bg-white absolute top-32 right-2 shadow-lg z-50">
    <ul class="flex flex-col py-4">
      <slot></slot>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  isMobileMenuOpen: Boolean
});
</script>
