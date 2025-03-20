<template>
  <li class="relative group">
    <a :href="href"
      class="text-base md:text-sm xl:text-base lg:text-white lg:group-hover:opacity-70 lg:group-hover:text-white py-2 lg:py-6 lg:inline-flex lg:px-0 flex mx-8 lg:mr-0">
      <slot></slot>
    </a>
  </li>
</template>

<script setup>
defineProps({
  href: String
});
</script>
