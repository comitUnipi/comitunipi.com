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

<script>
export default {
  data() {
    return {
      mentors: [
        {
          id: 1,
          nama: "Idham Mubarok",
          img: "/images/mentor/mentor_program_1.png",
          job: "Mentor Programming",
          sosmed: [
            {
              id: 1,
              icon: "/images/icons/linkedin.png",
              link: "https://www.linkedin.com/in/idham-mubarok-71543b171/",
            },
            {
              id: 2,
              icon: "/images/icons/instagram.png",
              link: "https://www.instagram.com/idham_mubarok/",
            },
            {
              id: 3,
              icon: "/images/icons/facebook.png",
              link: "https://web.facebook.com/idam.mubarok",
            },
          ],
        },
        {
          id: 1,
          nama: "Eko Aulian Saputra",
          img: "/images/mentor/mentor_program_2.jpeg",
          job: "Mentor Programming",
          sosmed: [
            {
              id: 1,
              icon: "/images/icons/linkedin.png",
              link: "https://www.linkedin.com/in/eko-aulian-saputra-629400187/",
            },
          ],
        },
        {
          id: 3,
          nama: "Hidayatulloh",
          img: "/images/mentor/mentor_design_1.jpeg",
          job: "Mentor Design Grafis",
          sosmed: [
            {
              id: 1,
              icon: "/images/icons/instagram.png",
              link: "https://www.instagram.com/mashidayat96?igsh=aXhka3B3bjUzNWRl",
            },
          ],
        },
        {
          id: 4,
          nama: "Aditya Anwary",
          img: "/images/mentor/mentor_design_2.jpeg",
          job: "Mentor Design Grafis",
          sosmed: [
            {
              id: 1,
              icon: "/images/icons/linkedin.png",
              link: "https://www.linkedin.com/in/aditya-anwary-graphic-designer-a6486b1b2/",
            },
            {
              id: 2,
              icon: "/images/icons/instagram.png",
              link: "https://www.instagram.com/adnr_id/",
            },
            {
              id: 3,
              icon: "/images/icons/tiktok.png",
              link: "https://www.tiktok.com/@adnrgrafisidea",
            },
          ],
        },
        {
          id: 5,
          nama: "Vikri Fahruroji",
          img: "/images/mentor/mentor_design_3.jpeg",
          job: "Mentor Design Grafis",
          sosmed: [
            {
              id: 1,
              icon: "/images/icons/linkedin.png",
              link: "https://www.linkedin.com/in/vikri-fahruroji-49b703275/",
            },
            {
              id: 2,
              icon: "/images/icons/instagram.png",
              link: "https://www.instagram.com/fahrurojivikri/",
            },
          ],
        },
        {
          id: 6,
          nama: "Duta Kusuma Dewa",
          img: "/images/mentor/mentor_comp_and_network_1.jpeg",
          job: "Mentor Comp & Network",
          sosmed: [
            {
              id: 1,
              icon: "/images/icons/instagram.png",
              link: "https://www.instagram.com/captdeekey/",
            },
          ],
        },
        {
          id: 7,
          nama: "Romi Aji S",
          img: "/images/mentor/mentor_comp_and_network_2.jpeg",
          job: "Mentor Comp & Network",
          sosmed: [
            {
              id: 1,
              icon: "/images/icons/instagram.png",
              link: "https://www.instagram.com/romiaji14_/",
            },
          ],
        },
        {
          id: 8,
          nama: "M Hussein Hamid",
          img: "/images/mentor/mentor_comp_and_network_3.jpeg",
          job: "Mentor Comp & Network",
          sosmed: [
            {
              id: 1,
              icon: "/images/icons/linkedin.png",
              link: "https://www.linkedin.com/in/muhammad-hussein-hamid-026381253/",
            },
            {
              id: 2,
              icon: "/images/icons/instagram.png",
              link: "https://www.instagram.com/xen56.co_/",
            },
          ],
        },
        {
          id: 8,
          nama: "Ahmad iif Muhili, S.Kom",
          img: "/images/mentor/mentor_comp_and_network_4.jpg",
          job: "Mentor Comp & Network",
          sosmed: [
            {
              id: 1,
              icon: "/images/icons/instagram.png",
              link: "https://www.instagram.com/aifmuhili",
            },
          ],
        },
        {
          id: 9,
          nama: "Risna Ayu Lestari",
          img: "/images/mentor/mentor_ms_office_1.jpeg",
          job: "Mentor Microsoft Office",
          sosmed: [
            {
              id: 1,
              icon: "/images/icons/instagram.png",
              link: "https://www.instagram.com/yumitayo_",
            },
          ],
        },
        {
          id: 10,
          nama: "Yumita Aprina",
          img: "/images/mentor/mentor_ms_office_2.jpeg",
          job: "Mentor Microsoft Office",
          sosmed: [
            {
              id: 1,
              icon: "/images/icons/instagram.png",
              link: "https://www.instagram.com/yumitayo_",
            },
          ],
        },
      ]
    };
  }
}
</script>
