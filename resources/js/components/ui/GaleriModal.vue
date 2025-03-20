<template>
  <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center"
    @click.self="closeModal">
    <div class="relative w-full h-full flex justify-center items-center">
      <img :src="selectedImage" alt="Full Size Image" class="w-full h-full object-contain" />
      <button @click="closeModal" class="absolute top-4 right-4">
        <img src="/images/icons/cancel.png" alt="cancel" class="w-10 h-10 p-2 bg-white rounded-full" />
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isModalOpen: Boolean,
  selectedImage: String,
  closeModal: Function,
});
</script>
