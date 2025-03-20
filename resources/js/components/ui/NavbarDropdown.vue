<template>
  <li class="relative group">
    <button @click="toggleDropdown"
      class="text-base md:text-sm xl:text-base text-dark lg:text-white lg:group-hover:opacity-70 lg:group-hover:text-white group-hover:text-primary py-2 lg:py-6 lg:inline-flex lg:px-0 flex mx-8 lg:mr-0">
      <slot></slot>
      <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div v-if="isDropdownOpen" class="absolute left-8 w-60 bg-white py-2 shadow-lg rounded-md">
      <slot name="dropdown"></slot>
    </div>
  </li>
</template>

<script setup>
import { ref } from 'vue';

const isDropdownOpen = ref(false);

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}
</script>
