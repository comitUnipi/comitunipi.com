<template>
  <article>
    <KegiatanCard v-for="item in kegiatan" :img="item.img" :title="item.title" :description="item.description" />
  </article>
</template>

<script setup>
import KegiatanCard from './ui/KegiatanCard.vue';
import { kegiatan } from '@/data/kegiatan';
</script>
