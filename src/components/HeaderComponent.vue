<template>
    <div class="flex justify-between">
        <div class="inline-flex items-center">
            <Icon class="text-[40px] text-red-500 pr-2 pb-[10px]" icon="clarity:shopping-bag-solid" />
            <strong class="text-[30px] font-light uppercase leading-none">Shopping online</strong>
        </div>
        <div class="space-y-2 cursor-pointer md:hidden" v-on:click="toggleMenu()">
            <div class="w-8 h-0.5 bg-gray-600"></div>
            <div class="w-8 h-0.5 bg-gray-600"></div>
            <div class="w-8 h-0.5 bg-gray-600"></div>
        </div>
        <div class="hidden md:flex">
            <Menu />
        </div>
    </div>
    <div class="hidden md:hidden" id="mobile-menu">
        <Menu />
    </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import Menu from "./MenuComponent.vue";

const toggleMenu = () => {
    const mobileMenu = document.getElementById('mobile-menu')
    if (mobileMenu?.classList.contains('hidden'))
        mobileMenu?.classList.remove('hidden')
    else
        mobileMenu?.classList.add('hidden')
}
</script>
