<template>
  <div class="bg-transparent absolute top-0 left-0 z-40 w-full flex items-center">
    <div class="container mx-auto">
      <div class="flex mx-4 items-center justify-between relative">
        <div class="px-4 w-60 max-w-full">
          <a href="/" class="navbar-logo w-full block py-5">
            <img src="/images/logo_white.png" alt="logo" class="w-[200px]" />
          </a>
        </div>
        <div class="flex px-4 justify-between items-center w-full">
          <div>
            <ButtonNavbarMobile />
            <nav
              class="absolute py-5 lg:py-0 lg:px-4 xl:px-6 bg-white lg:bg-transparent shadow-lg rounded-lg max-w-[250px] w-full lg:max-w-full lg:w-full right-4 top-full hidden lg:block lg:static lg:shadow-none">
              <ul class="blcok lg:flex">
                <li class="relative group">
                  <a href="#home"
                    class="ud-menu-scroll text-base text-dark lg:text-white lg:group-hover:opacity-70 lg:group-hover:text-white group-hover:text-primary py-2 lg:py-6 lg:inline-flex lg:px-0 flex mx-8 lg:mr-0">Beranda</a>
                </li>
                <li class="relative group">
                  <a href="#tentang-kami"
                    class="ud-menu-scroll text-base text-dark lg:text-white lg:group-hover:opacity-70 lg:group-hover:text-white group-hover:text-primary py-2 lg:py-6 lg:inline-flex lg:px-0 flex mx-8 lg:mr-0">Visi
                    dan Misi</a>
                </li>
                <li class="relative group">
                  <a href="#tentang-kami"
                    class="ud-menu-scroll text-base text-dark lg:text-white lg:group-hover:opacity-70 lg:group-hover:text-white group-hover:text-primary py-2 lg:py-6 lg:inline-flex lg:px-0 flex mx-8 lg:mr-0">Kepengurusan</a>
                </li>
                <li class="relative group">
                  <a href="#tentang-kami"
                    class="ud-menu-scroll text-base text-dark lg:text-white lg:group-hover:opacity-70 lg:group-hover:text-white group-hover:text-primary py-2 lg:py-6 lg:inline-flex lg:px-0 flex mx-8 lg:mr-0">Mentor</a>
                </li>
                <li class="relative group">
                  <a href="#tentang-kami"
                    class="ud-menu-scroll text-base text-dark lg:text-white lg:group-hover:opacity-70 lg:group-hover:text-white group-hover:text-primary py-2 lg:py-6 lg:inline-flex lg:px-0 flex mx-8 lg:mr-0">Kegiatan</a>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <div v-if="user" class="sm:flex justify-end hidden pr-16 lg:pr-0">
              <a href="/dashboard"
                class="text-base font-medium text-white bg-blue-500 bg-opacity-80 rounded-lg py-3 px-6 hover:bg-opacity-100 hover:text-dark signUpBtn duration-300 ease-in-out">Dashboard</a>
            </div>
            <div v-else class="sm:flex justify-end hidden pr-16 lg:pr-0">
              <a href="/dashboard/login"
                class=" text-base font-medium text-white hover:opacity-70 py-3 px-7 loginBtn">Masuk</a>
              <a href="/pendaftaran-anggota"
                class="text-base font-medium text-white bg-blue-500 bg-opacity-80 rounded-lg py-3 px-6 hover:bg-opacity-100 hover:text-dark signUpBtn duration-300 ease-in-out">Daftar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ButtonNavbarMobile from '@/components/ui/ButtonNavbarMobile.vue';
defineProps({
  user: Object
});
</script>
