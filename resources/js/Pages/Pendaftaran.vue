<template>

  <Loading v-if="isLoading" />

  <Head title="Pendaftaran Anggota COMIT">
    <link rel="icon" href="/images/logo_black.png" />
    <meta name="description"
      content="Daftar menjadi anggota COMIT (Community of Information Technology) dan bergabung dalam organisasi yang berkomitmen untuk membangun masa depan teknologi informasi. Dapatkan berbagai peluang dan kontribusi positif dalam bidang IT.">
  </Head>

  <section class="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:pb-24">
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Pendaftaran Anggota
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="register">
            <FormInput id="email" label="Email" type="email" name="email" v-model="form.email" :required="true"
              :error="errors.email" />
            <FormInput id="npm" label="NPM" name="npm" v-model="form.npm" :required="true" :error="errors.npm" />
            <FormInput id="name" label="Nama Lengkap" name="name" v-model="form.name" :required="true"
              :error="errors.name" />
            <FormRadioGroup label="Jenis Kelamin" name="jenis_kelamin" v-model="form.jenis_kelamin" :options="[
              { label: 'Laki-Laki', value: 'Laki-Laki' },
              { label: 'Perempuan', value: 'Perempuan' }
            ]" :error="errors.jenis_kelamin" />
            <FormInput id="whatsapp" label="Nomor Whatsapp" name="whatsapp" v-model="form.no_wa" :required="true"
              :error="errors.no_wa" />
            <FormRadioGroup label="Jurusan" name="jurusan" v-model="form.jurusan" :options="[
              { label: 'Akuntansi', value: 'Akuntansi' },
              { label: 'Manajemen', value: 'Manajemen' },
              { label: 'Sistem Informasi', value: 'Sistem Informasi' },
              { label: 'Teknologi Informasi', value: 'Teknologi Informasi' },
              { label: 'Software Engineering', value: 'Software Engineering' }
            ]" :error="errors.jurusan" />
            <FormRadioGroup label="Minat Keahlian" name="minat_keahlian" v-model="form.minat_keahlian" :options="[
              { label: 'Design Grafis', value: 'Design Grafis' },
              { label: 'Programming', value: 'Programming' },
              { label: 'Microsoft Office', value: 'Microsoft Office' },
              { label: 'Computer & Networking', value: 'Computer & Networking' }
            ]" :error="errors.minat_keahlian" />
            <FormInput id="alasan" label="Alasan Masuk COMIT" name="alasan" v-model="form.alasan" type="textarea"
              :required="true" :error="errors.alasan" />
            <button type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Daftar</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Loading from '@/components/Loading.vue';

import { ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import { useLoading } from '@/hooks/useLoading';
import FormInput from '@/components/ui/FormInput.vue';
import FormRadioGroup from '@/components/ui/FormRadioGroup.vue';

const { isLoading } = useLoading();

const form = ref({
  name: '',
  email: '',
  npm: '',
  jenis_kelamin: '',
  no_wa: '',
  jurusan: '',
  minat_keahlian: '',
  alasan: '',
});

const errors = ref({
  jenis_kelamin: '',
  jurusan: '',
  minat_keahlian: '',
});

const validateForm = () => {
  let valid = true;

  errors.value = {
    jenis_kelamin: '',
    jurusan: '',
    minat_keahlian: '',
  };

  if (!form.value.jenis_kelamin) {
    errors.value.jenis_kelamin = 'Jenis kelamin harus diisi.';
    valid = false;
  }

  if (!form.value.jurusan) {
    errors.value.jurusan = 'Jurusan harus diisi.';
    valid = false;
  }

  if (!form.value.minat_keahlian) {
    errors.value.minat_keahlian = 'Minat Keahlian harus diisi.';
    valid = false;
  }

  return valid;
};

const register = async () => {
  if (!validateForm()) {
    return;
  }
  try {
    const response = await axios.post('/pendaftaran', form.value);
    alert(response.data.message);
    window.location.href = '/';
  } catch (error) {
    if (error.response) {
      alert('Error: ' + error.response.data.message);
    } else {
      alert('Terjadi kesalahan. Coba lagi nanti.');
    }
  }
};
</script>
