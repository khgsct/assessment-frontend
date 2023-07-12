<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from "@/components/HeaderComponent.vue";
import Footer from "@/components/FooterComponent.vue";
</script>

<template>
<div class="flex flex-col h-screen">
  <header class="bg-[#F6F6F6] sticky top-0">
    <nav class="container mx-auto px-4 py-[15px]">
      <Header />
    </nav>
  </header>
  <main class="container mx-auto px-4 py-6 mb-auto">
    <div class="grid grid-cols-12 gap-2 w-full">
      <div class="col-span-12 md:col-span-4">
        <!-- <span class="text-black font-light md:text-[30px] lg:text-[40px] leading-none">Welcome<br class="hidden md:inline" /> Back</span> -->
      </div>
      <div class="col-span-12 md:col-span-8">
        <RouterView />
      </div>
    </div>
  </main>
  <footer class="container mx-auto px-4">
    <Footer />
  </footer>
</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
* {
    font-family: 'Roboto', sans-serif;
}
</style>
