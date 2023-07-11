<template>
    <div>
        <RouterLink to="/products/1">
            <img class="object-cover w-96 h-48 mb-2 border border-black" src="../assets/product-image.webp" alt="product image">
            <div class="flex justify-between">
                <span class="flex flex-col">
                    <span class="text-[#31241E]">100.50 THB</span>
                    <span class="text-[#737373] font-light">Product name</span>
                </span>
            </div>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
defineProps({
    product: {
        required: true
    }
})
</script>
