<template>
  <section class="pt-20 lg:pt-[120px] pb-10 lg:pb-20">
      <div class="container mx-auto">
        <div class="flex flex-wrap mx-4">
          <div class="w-full px-4">
            <div class="text-center mx-auto mb-[60px] max-w-[620px]">
              <span class="font-semibold text-lg text-primary mb-2 block">
                Mentor
              </span>
              <h2
              id="text-heading"
                class="font-bold text-3xl sm:text-4xl md:text-[42px] text-dark mb-4">
                Perkenalkan Mentor Kami
              </h2>
              <p
                class="text-lg sm:text-xl leading-relaxed sm:leading-relaxed text-body-color">
              Kami mempunyai beberapa mentor yang sudah berpengalaman di bidangnya masing-masing.
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap justify-center mx-4">
          <div v-for="mentor in mentors" :key="mentor.id" class="w-full sm:w-1/2 lg:w-1/4 px-4">
            <div class="mb-10 wow fadeInUp" data-wow-delay=".1s">
              <div
                class="relative w-[170px] h-170px] rounded-full z-10 mx-auto mb-6">
                <img
                  src="https://png.pngtree.com/png-vector/20240601/ourmid/pngtree-casual-man-flat-design-avatar-profile-picture-vector-png-image_12593008.png"
                  alt="image"
                  class="w-full rounded-full"
                />
              </div>
              <div class="text-center">
                <h4 class="font-medium text-lg text-dark mb-2">
                  {{ mentor.nama }}
                </h4>
                <p class="font-medium text-sm text-body-color mb-5">
                  {{ mentor.job }}
                </p>
                <div class="flex items-center justify-center">
                 <!-- icon -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  data() {
    return {
      mentors: [
      {
        id: 1,
        nama: "Adveen Desuza",
        job: "Programmer",
      },
      {
        id: 2,
        nama: "Adveen Desuza",
        job: "Design Grafis",
      },
      {
        id: 3,
        nama: "Adveen Desuza",
        job: "Comp & Network",
      },
      {
        id: 2,
        nama: "Adveen Desuza",
        job: "Microsoft",
      },
      ]
    };
  }
}
</script>
