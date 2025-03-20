<template>
  <article>
    <KegiatanCard v-for="item in kegiatan" :img="item.img" :title="item.title" :description="item.description" />
  </article>
</template>

<script setup>
import KegiatanCard from './ui/KegiatanCard.vue';
</script>

<script>
export default {
  data() {
    return {
      kegiatan: [
        {
          img: '/images/100103.png',
          title: 'Workshop Data Analyst',
          description: 'Dalam Workshop Data Analyst yang telah kami laksanakan, peserta memperoleh keterampilan penting dalam menganalisis dan menginterpretasikan data.',
        },
        {
          img: '/images/100101.png',
          title: 'Workshop Arduino',
          description: 'Workshop Arduino yang telah kami selenggarakan memberikan pengalaman langsung kepada peserta dalam dunia elektronik dan pemrograman. Peserta belajar menggunakan platform Arduino untuk merancang dan mengembangkan project tentang lampu pintar.',
        },
      ],
    };
  },
};
</script>
