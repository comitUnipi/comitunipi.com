<template>
  <section class="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
    <div class="w-full px-4">
      <SubHeading subtitle="Dokumentasi" title="Galeri Kegiatan Kami"
        description="Kami mempunyai banyak kegiatan yang telah dilaksanakan." />
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
        <GaleryCard v-for="(item, index) in galeri" :key="index" :item="item" @click="openModal(item.src)" />
      </div>
      <GaleryModal v-if="isModalOpen" :selectedImage="selectedImage" :isModalOpen="isModalOpen"
        :closeModal="closeModal" />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { galeri } from '@/data/galeri';
import SubHeading from './ui/SubHeading.vue';
import GaleryCard from './ui/GaleriCard.vue';
import GaleryModal from './ui/GaleriModal.vue';

const isModalOpen = ref(false);
const selectedImage = ref('');

const openModal = (imageSrc) => {
  selectedImage.value = imageSrc;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedImage.value = '';
};
</script>
