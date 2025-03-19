<template>

  <Loading v-if="isLoading" />

  <Head title="Pendaftaran Anggota COMIT">
    <link rel="icon" href="/images/logo_black.png" />
    <meta name="description"
      content="Daftar menjadi anggota COMIT (Community of Information Technology) dan bergabung dalam organisasi yang berkomitmen untuk membangun masa depan teknologi informasi. Dapatkan berbagai peluang dan kontribusi positif dalam bidang IT.">
  </Head>

  <div class="relative z-0 w-full bg-black py-[150px] px-5">
    <img class="w-full h-[300px] object-cover opacity-50 absolute inset-0"
      src="https://comit-unipi.vercel.app/_next/image?url=%2Fpelatihan.png&w=1920&q=75" alt="">
  </div>
  <div class="relative md:-mt-24 container mx-auto bg-white rounded-md shadow-xl max-w-2xl">
    <div class="flex items-center justify-center pt-5">
      <img class="w-[200px] h-full" src="/images/logo_black.png" alt="">
    </div>
    <form class="p-5 space-y-4" @submit.prevent="register">
      <h2 class="text-3xl text-center font-semibold">Pendaftaran Anggota Baru</h2>
      <div class="flex flex-col">
        <label for="npm">NPM</label>
        <input class="rounded-md" type="text" v-model="form.npm" />
      </div>
      <div class="flex flex-col">
        <label for="name">Nama</label>
        <input class="rounded-md" type="text" v-model="form.name" required />
      </div>
      <div class="flex flex-col">
        <label for="email">Email</label>
        <input class="rounded-md" type="email" v-model="form.email" required />
      </div>
      <button class="w-full bg-blue-500 p-2 rounded-md text-sm text-white" type="submit">Daftar</button>
    </form>
  </div>
</template>

<script setup>
import Loading from '@/components/Loading.vue';

import { Head } from '@inertiajs/vue3';
import { useLoading } from '@/hooks/useLoading';
const { isLoading } = useLoading();
</script>

<script>

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        npm: '',
      },
    };
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('/pendaftaran', this.form);
        this.$toast.success('Pendaftaran berhasil! ' + response.data.message);
        window.location.href = '/';
      } catch (error) {
        if (error.response) {
          this.$toast.error('Error: ' + error.response.data.message);
        } else {
          this.$toast.error('Terjadi kesalahan. Coba lagi nanti. ');
        }
      }
    },
  },
};
</script>
