<template>
  <div class="relative overflow-hidden rounded-lg shadow-lg cursor-pointer" @click="openModal">
    <img :src="item.src" :alt="item.alt"
      class="w-full h-full object-cover transition-transform transform hover:scale-110" />
  </div>
</template>

<script setup>
defineProps({
  item: Object,
  openModal: Function,
});
</script>
