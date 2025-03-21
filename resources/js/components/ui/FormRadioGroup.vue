<template>
  <div>
    <label class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
    <div v-for="(option, index) in options" :key="index" class="flex items-center mb-4">
      <input :id="'radio-' + index" type="radio" :value="option.value" :name="name"
        :checked="modelValue === option.value" @change="$emit('update:modelValue', option.value)"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
      <label :for="'radio-' + index" class="ms-2 text-sm font-medium text-gray-900">{{ option.label }}</label>
    </div>
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  name: String,
  modelValue: [String, Number],
  options: Array,
  error: String
});
</script>
