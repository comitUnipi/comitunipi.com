<template>
  <div class="bg-transparent absolute top-0 left-0 z-40 w-full flex items-center">
    <div class="container mx-auto">
      <div class="flex items-center justify-between relative">
        <div class="px-4 w-60 max-w-full">
          <a href="/" class="navbar-logo w-full block py-5">
            <img src="/images/logo_white.png" alt="logo" class="w-[200px]" />
          </a>
        </div>
        <div class="flex px-4 justify-between items-center w-full">
          <div>
            <ButtonNavbarMobile @toggleMobileMenu="toggleMobileMenu" />
            <nav
              class="absolute py-5 lg:py-0 lg:px-4 xl:px-6 bg-white lg:bg-transparent shadow-lg rounded-lg max-w-[250px] w-full lg:max-w-full lg:w-full right-4 top-full hidden lg:block lg:static lg:shadow-none">
              <ul class="blcok lg:flex">
                <li class="relative group">
                  <a href="/visi-dan-misi"
                    class="ud-menu-scroll text-base text-dark lg:text-white lg:group-hover:opacity-70 lg:group-hover:text-white group-hover:text-primary py-2 lg:py-6 lg:inline-flex lg:px-0 flex mx-8 lg:mr-0">Visi
                    dan Misi</a>
                </li>
                <li class="relative group">
                  <button @click="toggleDropdown"
                    class="ud-menu-scroll text-base text-dark lg:text-white lg:group-hover:opacity-70 lg:group-hover:text-white group-hover:text-primary py-2 lg:py-6 lg:inline-flex lg:px-0 flex mx-8 lg:mr-0">
                    Kepengurusan
                    <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div v-if="isDropdownOpen" class="absolute left-8 w-60 bg-white py-2 shadow-lg rounded-md">
                    <a href="/kepengurusan/ketua-dan-wakil-ketua-umum" class="block px-4 py-2 text-sm hover:text-white hover:bg-blue-500 rounded-md">
                      Ketua & Wakil Ketua Umum
                    </a>
                    <a href="/kepengurusan/sekretaris" class="block px-4 py-2 text-sm hover:text-white hover:bg-blue-500 rounded-md">
                      Sekretaris
                    </a>
                    <a href="/kepengurusan/bendahara" class="block px-4 py-2 text-sm hover:text-white hover:bg-blue-500 rounded-md">
                      Bendahara
                    </a>
                    <a href="/kepengurusan/sdm" class="block px-4 py-2 text-sm hover:text-white hover:bg-blue-500 rounded-md">
                      SDM
                    </a>
                    <a href="/kepengurusan/humas-internal" class="block px-4 py-2 text-sm hover:text-white hover:bg-blue-500 rounded-md">
                      Humas Internal
                    </a>
                    <a href="/kepengurusan/humas-eksternal" class="block px-4 py-2 text-sm hover:text-white hover:bg-blue-500 rounded-md">
                      Humas Eksternal
                    </a>
                    <a href="/kepengurusan/koordinator" class="block px-4 py-2 text-sm hover:text-white hover:bg-blue-500 rounded-md">
                      Koordinator
                    </a>
                    <a href="/kepengurusan/prasarana" class="block px-4 py-2 text-sm hover:text-white hover:bg-blue-500 rounded-md">
                      Prasarana
                    </a>
                    <a href="/kepengurusan/kominfo" class="block px-4 py-2 text-sm hover:text-white hover:bg-blue-500 rounded-md">
                      Kominfo
                    </a>
                    <a href="/kepengurusan/staf-desain" class="block px-4 py-2 text-sm hover:text-white hover:bg-blue-500 rounded-md">
                      Staff Desain
                    </a>
                    <a href="/kepengurusan/staf-programming" class="block px-4 py-2 text-sm hover:text-white hover:bg-blue-500 rounded-md">
                      Staff Programming
                    </a>
                    <a href="/kepengurusan/staf-comp-and-network" class="block px-4 py-2 text-sm hover:text-white hover:bg-blue-500 rounded-md">
                      Staff Comp & Network
                    </a>
                    <a href="/kepengurusan/staf-microsoft-office" class="block px-4 py-2 text-sm hover:text-white hover:bg-blue-500 rounded-md">
                      Staff Microsoft Office
                    </a>
                  </div>
                </li>
                <li class="relative group">
                  <a href="mentor-kami"
                    class="ud-menu-scroll text-base text-dark lg:text-white lg:group-hover:opacity-70 lg:group-hover:text-white group-hover:text-primary py-2 lg:py-6 lg:inline-flex lg:px-0 flex mx-8 lg:mr-0">Mentor Kami</a>
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
        <!-- Mobile Menu -->
        <div v-if="isMobileMenuOpen" class="lg:hidden w-64 rounded-md bg-white absolute top-32 right-0 shadow-lg z-50">
          <ul class="flex flex-col py-4">
            <li class="py-2 px-4">
              <a href="/visi-dan-misi" class="text-base text-dark hover:underline">Visi dan Misi</a>
            </li>
            <li class="py-2 px-4">
              <button @click="toggleDropdown" class="text-base text-dark flex items-center w-full text-left">
                Kepengurusan
                <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <!-- Dropdown Content -->
              <div v-if="isDropdownOpen" class="pl-6 py-2">
                <a href="/kepengurusan/ketua-dan-wakil-ketua-umum" class="block text-sm py-2 hover:underline rounded-md">
                  Ketua & Wakil Ketua Umum
                </a>
                <a href="/kepengurusan/sekretaris" class="block text-sm py-2 hover:underline">
                  Sekretaris
                </a>
                <a href="/kepengurusan/bendahara" class="block text-sm py-2 hover:underline">
                  Bendahara
                </a>
                <a href="/kepengurusan/sdm" class="block text-sm py-2 hover:underline">
                  SDM
                </a>
                <a href="/kepengurusan/humas-internal" class="block text-sm py-2 hover:underline">
                  Humas Internal
                </a>
                <a href="/kepengurusan/humas-eksternal" class="block text-sm py-2 hover:underline">
                  Humas Eksternal
                </a>
                <a href="/kepengurusan/koordinator" class="block text-sm py-2 hover:underline">
                  Koordinator
                </a>
                <a href="/kepengurusan/prasarana" class="block text-sm py-2 hover:underline">
                  Prasarana
                </a>
                <a href="/kepengurusan/kominfo" class="block text-sm py-2 hover:underline">
                  Kominfo
                </a>
                <a href="/kepengurusan/staf-desain" class="block text-sm py-2 hover:underline">
                  Staff Design
                </a>
                <a href="/kepengurusan/staf-programming" class="block text-sm py-2 hover:underline">
                  Staff Programming
                </a>
                <a href="/kepengurusan/staf-comp-and-network" class="block text-sm py-2 hover:underline">
                  Staff Comp & Network
                </a>
                <a href="/kepengurusan/staf-microsoft-office" class="block text-sm py-2 hover:underline">
                  Staff Microsoft Office
                </a>
              </div>
            </li>
            <li class="py-2 px-4">
              <a href="/mentor-kami" class="text-base text-dark hover:underline">Mentor Kami</a>
            </li>
            <li class="py-2 px-4">
              <a href="#kegiatan" class="text-base text-dark hover:underline">Kegiatan</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDropdownOpen: false,
      isMobileMenuOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
  }
}
</script>

<script setup>
import ButtonNavbarMobile from '@/components/ui/ButtonNavbarMobile.vue';
defineProps({
  user: Object
});
</script>
