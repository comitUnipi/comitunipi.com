<template>

    <Head title="Welcome" />

    <nav class="bg-blue-600 text-white p-4 fixed w-full z-10">
        <div class="flex items-center justify-between">
            <div class="text-xl font-bold">
                <a href="/" class="text-white">COMIT</a>
            </div>
            <ul :class="{ 'hidden md:flex': true, 'space-x-6': true }">
                <li><a href="/" class="hover:scale-125">Beranda</a></li>
                <li><a href="/about" class="hover:text-yellow-400">Tentang Kami</a></li>
                <li><a href="/services" class="hover:text-yellow-400">Kegiatan</a></li>
                <li><a href="/kepengurusan" class="hover:text-yellow-400">Kepengurusan</a></li>
            </ul>
            <ul class="hidden md:flex bg-white rounded-lg px-4 py-2 text-black text-sm">
                <li>
                    <a v-if="props.user" href="/dashboard">Dashboard</a>
                    <a v-else href="/dashboard/login">Login</a>
                </li>
            </ul>

            <button @click="isMenuOpen = !isMenuOpen" class="md:hidden flex flex-col space-y-2">
                <span class="block w-6 h-1 bg-white"></span>
                <span class="block w-6 h-1 bg-white"></span>
                <span class="block w-6 h-1 bg-white"></span>
            </button>
        </div>

        <div v-if="isMenuOpen" class="md:hidden bg-blue-600 text-white py-4 z-50 transition-all duration-300">
            <ul class="space-y-4">
                <li><a href="/" class="hover:text-yellow-400">Beranda</a></li>
                <li><a href="/tentang-kami" class="hover:text-yellow-400">Tentang Kami</a></li>
                <li><a href="/kegiatan" class="hover:text-yellow-400">Kegiatan</a></li>
                <li><a href="/kepengurusan" class="hover:text-yellow-400">Struktur</a></li>
            </ul>
            <ul class="mt-3 flex justify-start gap-x-4">
                <li class="border-2 rounded-lg px-4 py-2 text-white text-xs text-center">
                    <a v-if="props.user" href="/dashboard">Dashboard</a>
                    <a v-else href="/dashboard/login">Login</a>
                </li>
                <li class="border-2 rounded-lg px-4 py-2 text-white text-xs text-center">
                    <a href="/dashboard">Daftar Sekarang</a>
                </li>
            </ul>
        </div>
    </nav>

    <div class="">
        <!-- CONTENT -->
        <div class="relative z-0 w-full bg-black py-48 px-5">
            <div class="relative z-10 text-center text-white mx-auto max-w-xl">
                <h1 class="text-4xl md:text-5xl lg:text-7xl mb-4 font-bold italic">
                    Community of Information Technology
                </h1>
                <a href="/daftar"
                    class="inline-block rounded-lg text-lg px-4 lg:px-8 py-1.5 lg:py-3 bg-blue-600 text-white">Gabung
                    Sekarang</a>
            </div>
            <img src="https://comit-unipi.vercel.app/_next/image?url=%2Fbanner.png&w=1920&q=75"
                class="w-full h-full absolute inset-0 object-cover opacity-50">
        </div>
    </div>
</template>

<script setup>
import { Head } from '@inertiajs/vue3';
import { ref } from 'vue';

const props = defineProps({
    user: Object,
});

const isMenuOpen = ref(false);
</script>