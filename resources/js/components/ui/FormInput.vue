<template>
  <div>
    <label :for="id" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
    <input :type="type" :name="name" :id="id" :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600
    focus:border-primary-600 block w-full p-2.5" :required="required" />
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  label: String,
  type: {
    type: String,
    default: "text"
  },
  name: String,
  modelValue: [String, Number],
  required: {
    type: Boolean,
    default: false
  },
  error: String
});
</script>
