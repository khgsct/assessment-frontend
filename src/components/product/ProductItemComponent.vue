<template>
    <div class="shadow-gray-300 shadow transition duration-200 hover:-translate-y-2">
        <img class="object-cover w-96 h-48 mb-2 border border-[#f8f8f8]" :src="getProductImage()" :alt="product?.name">
        <span class="flex flex-col px-2">
            <span class="text-[#31241E]">{{ product?.price }} THB</span>
            <span class="text-[#737373] font-light">{{ product?.name }}</span>
        </span>
    </div>
</template>

<script setup lang="ts">
import type { ProductResponse } from "@/models";
import type { PropType } from "vue";

const props = defineProps({
    product: {
        type: Object as PropType<ProductResponse | null>
    }
})

const getProductImage = () => {
    return props.product?.pictures.length ?
        'data:image/png;base64,' + props.product?.pictures[0].file.base64 : ''
}

</script>
