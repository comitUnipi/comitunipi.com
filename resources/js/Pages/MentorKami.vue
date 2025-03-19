<template>

  <Loading v-if="isLoading" />

  <Head title="Mentor Kami" />
  <Main :user="props.user">
    <Heading img="https://comit-unipi.vercel.app/_next/image?url=%2Fbanner.png&w=1920&q=75"/>
    <Mentor />
  </Main>
</template>

<script setup>
import { Head } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import Main from '@/Layouts/Main.vue';
import Mentor from '@/components/Mentor.vue';
import Loading from '@/components/Loading.vue';
import Heading from '@/components/ui/Heading.vue';
const props = defineProps({
  user: Object,
});
const isLoading = ref(true);
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});
</script>
