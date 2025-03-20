<template>
  <section class="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
    <div class="container mx-auto">
      <SubHeading subtitle="Mentor" title="Perkenalkan Mentor Kami"
        description="Kami mempunyai beberapa mentor yang sudah berpengalaman di bidangnya masing-masing." />
      <div class="flex flex-wrap justify-center mx-4">
        <MentorCard v-for="mentor in mentors" :key="mentor.id" :mentor="mentor" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { mentors } from '@/data/mentors';
import SubHeading from './ui/SubHeading.vue';
import MentorCard from './ui/MentorCard.vue';
</script>
