<template>
  <Navbar :user="props.user" />
  <main>
    <slot></slot>
  </main>
  <Footer />
</template>

<script setup>
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';
const props = defineProps({
  user: Object,
});
</script>
