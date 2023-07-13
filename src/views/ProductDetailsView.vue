<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12 md:col-span-4">
            <ProductItem :product="state.productDetails" v-show="!state.loader" />
            <ProductItemLoader v-show="state.loader" />
        </div>
        <div class="col-span-12 md:col-span-8">
            <div v-show="!state.loader">
                <p class="text-gray-600 text-sm pr-4 mb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. A magni modi sequi aliquid. Quos iste voluptatem laudantium quia, at ad et facilis, odio, ab accusamus delectus quae repellendus vel a!
                </p>
                <ProductIncrement class="mb-4" />
                <button class="btn-primary">
                    <RouterLink to="/checkout">Add to cart</RouterLink>                
                </button>
            </div>
            <div v-show="state.loader">
                <div class="animate-pulse">
                    <div class="rounded bg-slate-200 h-20 mb-2"></div>
                    <span class="flex flex-col gap-y-2 px-2">
                        <span class="w-32 h-4 bg-slate-200 rounded"></span>
                        <span class="w-32 h-4 bg-slate-200 rounded"></span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import ProductItem from "@/components/ProductItemComponent.vue";
import ProductItemLoader from "@/components/ProductItemLoaderComponent.vue";
import ProductIncrement from "@/components/ProductIncrementComponent.vue";
import { product } from '@/http';
import type { ProductResponse } from '@/models';
import { reactive } from 'vue';
import { SimulationDelay } from "@/configs";

type StateModel = {
    productDetails: ProductResponse | null,
    loader: boolean
}

const route = useRoute()
const productId = route.params.id.toString()
const state = reactive<StateModel>({
    productDetails: null,
    loader: true
})

const loadProductDetails = () => {
    state.loader = true
    product().details(productId)
        .then(response => state.productDetails = response)
        .finally(() => state.loader = false)
}

setTimeout(loadProductDetails, SimulationDelay);

</script>
