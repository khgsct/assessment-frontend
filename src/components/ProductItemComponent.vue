<template>
    <div class="shadow-gray-300 shadow transition duration-200 hover:-translate-y-2">
        <img class="object-cover w-96 h-48 mb-2 border border-[#f8f8f8]" src="../assets/product-image.webp" alt="product image">
        <span class="flex flex-col px-2">
            <span class="text-[#31241E]">100.50 THB</span>
            <span class="text-[#737373] font-light">Product name</span>
        </span>
    </div>
</template>

<script setup lang="ts">
defineProps({
    product: {
        required: true
    }
})
</script>
