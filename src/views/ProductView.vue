<template>
    <div>
        <div class="mb-2">
            <h2 class="title">Products</h2>
        </div>
        <div class="grid grid-cols-12 gap-3 gap-y-10">
            <div class="col-span-6 lg:col-span-4 cursor-pointer" v-bind:key="product" v-for="product in Array(5)">
                <ProductItem :product="product" v-on:click="routeToProductDetails('880c4758-7685-4ecc-a027-c7cf173011bf')" />
            </div>
            <div class="col-span-6 lg:col-span-4 animate-pulse" v-bind:key="product"  v-for="product in Array(4)">
                <div class="rounded bg-slate-200 min-w-96 h-48 mb-2"></div>
                <span class="flex flex-col gap-2 px-2">
                    <span class="h-4 bg-slate-200 rounded"></span>
                    <span class="h-4 bg-slate-200 rounded"></span>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ProductItem from "@/components/ProductItemComponent.vue";
import { user } from "@/auth";
import { useRouter } from 'vue-router';

const router = useRouter()
const isLoggedIn = computed(() => user.isAuthenticated)

const routeToProductDetails = (productId: string) => {
    if (!isLoggedIn.value) {
        router.push({path:'/auth'})
        return
    }
    router.push({name: 'product-details', params: {id: productId}})
}

</script>
