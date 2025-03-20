<template>
  <section class="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
    <div class="w-full px-4">
      <SubHeading subtitle="Dokumentasi" title="Galeri Kegiatan Kami"
        description="Kami mempunyai banyak kegiatan yang telah dilaksanakan." />

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20">
        <div v-for="(image, index) in images" :key="index"
          class="relative overflow-hidden rounded-lg shadow-lg cursor-pointer" @click="openModal(image.src)">
          <img :src="image.src" :alt="image.alt"
            class="w-full h-full object-cover transition-transform transform hover:scale-110" />
        </div>
      </div>

      <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center"
        @click.self="closeModal">
        <div class="relative w-full h-full flex justify-center items-center">
          <img :src="selectedImage" alt="Full Size Image" class="w-full h-full object-contain" />
          <button @click="closeModal" class="absolute top-4 right-4">
            <img src="/images/icons/cancel.png" alt="cancel" class="w-10 h-10 p-2 bg-white rounded-full" />
          </button>
        </div>
      </div>

    </div>
  </section>

</template>

<script setup>
import SubHeading from './ui/SubHeading.vue';
</script>

<script>
export default {
  data() {
    return {
      images: [
        {
          src: '/images/100101.png',
          alt: 'event',
        },
        {
          src: '/images/100102.png',
          alt: 'event',
        },
        {
          src: '/images/100103.png',
          alt: 'event',
        },
        {
          src: '/images/100104.png',
          alt: 'event',
        },
      ],
      isModalOpen: false,
      selectedImage: '',
    };
  },
  methods: {
    openModal(imageSrc) {
      this.selectedImage = imageSrc;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedImage = '';
    },
  },
};
</script>
