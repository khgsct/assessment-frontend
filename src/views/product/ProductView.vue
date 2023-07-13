<template>
    <div>
        <div class="mb-2">
            <h2 class="title">Products</h2>
        </div>
        <div class="grid grid-cols-12 gap-3 gap-y-10">
            <div class="col-span-6 lg:col-span-4 cursor-pointer" v-bind:key="product.id" v-for="product in state.products">
                <ProductItem :product="product" v-on:click="routeToProductDetails(product.id)" />
            </div>
            <div class="col-span-6 lg:col-span-4" v-show="state.loader" v-bind:key="product" v-for="product in Array(4)">
                <ProductItemLoader />
            </div>
            <div class="col-span-12 text-center" v-if="!state.loader && state.products.length == 0">
                <span class="font-thin text-gray-500">Product out of stock</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import ProductItem from "@/components/product/ProductItemComponent.vue";
import ProductItemLoader from "@/components/product/ProductItemLoaderComponent.vue";
import { user } from "@/auth";
import { useRouter } from 'vue-router';
import { product } from "@/http";
import type { ProductResponse } from "@/models";
import { SimulationDelay } from "@/configs";

type StateModel = {
    products: ProductResponse[],
    loader: boolean
}

const router = useRouter()
const isLoggedIn = computed(() => user.isAuthenticated)
const state = reactive<StateModel>({
    products: [],
    loader: true
})

const loadProducts = () => {
    state.loader = true
    product().listing()
        .then((response: ProductResponse[]) => state.products = response)
        .finally(() => state.loader = false)
}

const routeToProductDetails = (productId: string) => {
    if (!isLoggedIn.value) {
        router.push({path:'/auth'})
        return
    }
    router.push({name: 'product-details', params: {id: productId}})
}

setTimeout(loadProducts, SimulationDelay)

</script>
