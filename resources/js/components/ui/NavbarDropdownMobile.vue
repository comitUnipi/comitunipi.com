<template>
  <li class="py-2 px-8">
    <button @click="toggleDropdown" class="text-base flex items-center w-full text-left">
      <slot></slot>
      <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div v-if="isDropdownOpen" class="pl-6 py-2">
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
