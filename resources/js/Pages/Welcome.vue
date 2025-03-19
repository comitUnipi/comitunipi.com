<template>

  <Loading v-if="isLoading" />

  <Head title="Selamat Datang" />
  <Main :user="props.user">
    <div class="">
      <Heading img="https://comit-unipi.vercel.app/_next/image?url=%2Fbanner.png&w=1920&q=75" />
      <About />
      <Discover />
      <Mentor />
    </div>
  </Main>

</template>

<script setup>
import { Head } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import Main from '@/Layouts/Main.vue';
import About from '@/components/About.vue';
import Mentor from '@/components/Mentor.vue';
import Loading from '@/components/Loading.vue';
import Discover from '@/components/Discover.vue';
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
