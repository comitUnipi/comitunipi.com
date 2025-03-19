<template>
  <section class="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
    <div class="container mx-auto">
      <div class="flex flex-wrap mx-4">
        <div class="w-full px-4">
          <div class="text-center mx-auto mb-[60px] max-w-[620px]">
            <span class="font-semibold text-lg text-primary mb-2 block">
              Mentor
            </span>
            <h2 id="text-heading" class="font-bold text-5xl  md:text-[42px] mb-4">
              Perkenalkan Mentor Kami
            </h2>
            <p class="text-lg sm:text-xl leading-relaxed sm:leading-relaxed text-gray-700">
              Kami mempunyai beberapa mentor yang sudah berpengalaman di bidangnya masing-masing.
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap justify-center mx-4">
        <div v-for="mentor in mentors" :key="mentor.id" class="w-full sm:w-1/2 lg:w-1/4 px-4">
          <div class="mb-10 wow fadeInUp">
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
      </div>
    </div>
  </section>
</template>

<script setup>
import { mentors } from '@/data/mentors';
</script>
