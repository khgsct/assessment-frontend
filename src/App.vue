<template>
<div class="flex flex-col h-screen">
  <header class="bg-[#F6F6F6] sticky top-0">
    <nav class="container mx-auto px-4 py-[15px]">
      <Header />
    </nav>
  </header>
  <main class="container px-4 py-6 mx-auto mb-auto">
    <div class="grid w-full grid-cols-12 gap-2">
      <div class="col-span-12 md:col-span-4">
        <!-- <span class="text-black font-light md:text-[30px] lg:text-[40px] leading-none">Welcome<br class="hidden md:inline" /> Back</span> -->
      </div>
      <div class="col-span-12 md:col-span-8">
        <RouterView />
      </div>
    </div>
  </main>
  <footer class="container px-4 mx-auto">
    <Footer />
  </footer>
</div>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import Header from "@/components/common/HeaderComponent.vue";
import Footer from "@/components/common/FooterComponent.vue";
import { computed, watch } from 'vue';
import { user } from './auth';

const router = useRouter()
const isLoggedIn = computed(() => user.isAuthenticated)

const navigateToProperView = (isAuthenticated: boolean) => {
  if (isAuthenticated == false)
    router.push({path:'/auth'})
}

// watch(isLoggedIn, (curr) => { 
//   console.log(curr)
//   navigateToProperView(curr)
// })

// navigateToProperView(isLoggedIn.value)

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
* {
    font-family: 'Roboto', sans-serif;
}
</style>
