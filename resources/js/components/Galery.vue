<template>
  <section class="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
    <div class="w-full px-4">
      <div class="text-center mx-auto mb-[60px] max-w-[620px]">
        <span class="text-center font-semibold text-lg text-primary mb-2 block">
          Dokumentasi
        </span>
        <h2 id="text-heading" class="font-bold text-4xl sm:text-4xl md:text-[42px] text-dark mb-4">
          Galeri Kegiatan Kami
        </h2>
        <p class="text-lg sm:text-xl leading-relaxed sm:leading-relaxed text-gray-700">
          Kami mempunyai banyak kegiatan yang telah dilaksanakan.
        </p>
      </div>

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

<script>
export default {
  data() {
    return {
      images: [
        {
          src: 'https://comit-unipi.vercel.app/_next/image?url=%2Fdata_analyst.png&w=1920&q=75',
          alt: 'event',
        },
        {
          src: 'https://comit-unipi.vercel.app/_next/image?url=%2Farduino.png&w=1920&q=75',
          alt: 'event',
        },
        {
          src: 'https://comit-unipi.vercel.app/_next/image?url=%2Fbanner.png&w=1920&q=75',
          alt: 'event',
        },
        {
          src: 'https://comit-unipi.vercel.app/_next/image?url=%2Fpelatihan.png&w=1920&q=75',
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
