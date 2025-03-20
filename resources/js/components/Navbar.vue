<template>
  <div class="bg-transparent absolute top-0 left-0 z-40 w-full flex items-center">
    <div class="container mx-auto">
      <div class="flex items-center justify-between relative">
        <NavbarLogo />
        <div class="sm:flex md:px-4 justify-between items-center w-full">
          <NavbarButtonMobile @toggleMobileMenu="toggleMobileMenu" />
          <nav
            class="absolute py-5 lg:py-0 lg:px-4 xl:px-6 bg-white lg:bg-transparent shadow-lg rounded-lg max-w-[250px] w-full lg:max-w-full lg:w-full right-4 top-full hidden lg:block lg:static lg:shadow-none">
            <ul class="blcok lg:flex">
              <NavbarMenuItem href="/visi-dan-misi">Visi dan Misi</NavbarMenuItem>
              <NavbarDropdown>
                <template #default>Kepengurusan</template>
                <template #dropdown>
                  <a v-for="item in kepengurusan" :key="item.href" :href="item.href"
                    class="block px-4 py-2 text-sm hover:text-white hover:bg-blue-500 rounded-md">{{ item.label }}</a>
                </template>
              </NavbarDropdown>
              <NavbarMenuItem href="/mentor-kami">Mentor Kami</NavbarMenuItem>
              <NavbarMenuItem href="/kegiatan-kami">Kegiatan</NavbarMenuItem>
              <NavbarMenuItem href="/galeri-kami">Galeri</NavbarMenuItem>
            </ul>
          </nav>
        </div>
        <NavbarAuthLink :user="user" />
      </div>
    </div>
    <NavbarMobileMenu :isMobileMenuOpen="isMobileMenuOpen">
      <NavbarMenuItem href="/visi-dan-misi">Visi dan Misi</NavbarMenuItem>
      <NavbarDropdownMobile>
        <template #default>Kepengurusan</template>
        <template #dropdown>
          <a v-for="item in kepengurusan" :key="item.href" :href="item.href"
            class="block text-sm py-2 hover:underline rounded-md">{{ item.label }}</a>
        </template>
      </NavbarDropdownMobile>
      <NavbarMenuItem href="/mentor-kami">Mentor Kami</NavbarMenuItem>
      <NavbarMenuItem href="/kegiatan-kami">Kegiatan</NavbarMenuItem>
      <NavbarMenuItem href="/galeri-kami">Galeri</NavbarMenuItem>
    </NavbarMobileMenu>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { kepengurusan } from '@/data/link-kepengurusan';

import NavbarLogo from './ui/NavbarLogo.vue';
import NavbarMenuItem from './ui/NavbarMenuItem.vue';
import NavbarDropdown from './ui/NavbarDropdown.vue';
import NavbarAuthLink from './ui/NavbarAuthLink.vue';
import NavbarMobileMenu from './ui/NavbarMobileMenu.vue';
import NavbarButtonMobile from '@/components/ui/NavbarButtonMobile.vue';
import NavbarDropdownMobile from './ui/NavbarDropdownMobile.vue';

defineProps({
  user: Object
});

const isMobileMenuOpen = ref(false);

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}
</script>
