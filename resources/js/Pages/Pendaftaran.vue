<template>

  <Loading v-if="isLoading" />

  <Head title="Pendaftaran Anggota Baru" />

  <div class="h-screen flex justify-center items-center">
    <form class="p-5 space-y-4" @submit.prevent="register">
      <div class="flex justify-center">
        <img class="w-[200px]" src="/images/logo_black.png" alt="">
      </div>
      <h2 class="text-4xl">Pendaftaran Anggota Baru</h2>
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
      <button class="w-full bg-blue-600 p-2 rounded-md text-sm text-white" type="submit">Daftar</button>
    </form>
  </div>
</template>

<script setup>
import { Head } from "@inertiajs/vue3"
import { ref, onMounted } from 'vue';
import Loading from '@/components/Loading.vue';
const isLoading = ref(true);
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});
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
