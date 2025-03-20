<template>
  <div class="w-full sm:w-1/2 lg:w-1/4 px-4">
    <div class="mb-10">
      <div class="relative w-[170px] h-[170px] rounded-full z-10 mx-auto mb-6">
        <img :src="mentor.img" alt="image" class="w-full rounded-full" />
      </div>
      <div class="text-center">
        <h4 class="font-medium text-xl text-dark mb-2">
          {{ mentor.nama }}
        </h4>
        <p class="font-medium text-sm text-gray-700 mb-5">
          {{ mentor.job }}
        </p>
        <div class="flex items-center justify-center">
          <div v-for="sosmed in mentor.sosmed" :key="sosmed.id" class="mr-3">
            <a :href="sosmed.link" target="_blank">
              <img :src="sosmed.icon" alt="icon" class="w-6 h-6 hover:scale-110" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  mentor: {
    type: Object,
    required: true
  }
});
</script>
