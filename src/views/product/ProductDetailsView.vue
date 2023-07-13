<template>
    {{ a }}
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12 md:col-span-4">
            <ProductItem :product="state.productDetails" v-show="!state.loader" />
            <ProductItemLoader v-show="state.loader" />
        </div>
        <div class="col-span-12 md:col-span-8">
            <div v-show="!state.loader" class="flex flex-col gap-y-4">
                <p class="pr-4 text-sm text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. A magni modi sequi aliquid. Quos iste voluptatem laudantium quia, at ad et facilis, odio, ab accusamus delectus quae repellendus vel a!
                </p>
                <div>
                    <ProductIncrement :quantity="state.quantity" @change="productIncrementChange($event)" />
                    <div class="flex flex-col" v-for="error in $v.quantity.$errors" v-bind:key="error.$uid">
                        <span class="text-red-500">{{ error.$message }}</span>
                    </div>
                </div>
                <button class="btn-primary w-[30px]" v-on:click="navigateToCartPage">
                    Add to cart
                </button>
            </div>
            <div v-show="state.loader">
                <div class="animate-pulse">
                    <div class="h-20 mb-2 rounded bg-slate-200"></div>
                    <span class="flex flex-col px-2 gap-y-2">
                        <span class="w-32 h-4 rounded bg-slate-200"></span>
                        <span class="w-32 h-4 rounded bg-slate-200"></span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import ProductItem from "@/components/product/ProductItemComponent.vue";
import ProductItemLoader from "@/components/product/ProductItemLoaderComponent.vue";
import ProductIncrement from "@/components/product/ProductIncrementComponent.vue";
import { product } from '@/http';
import type { ProductResponse } from '@/models';
import { reactive, ref } from 'vue';
import { SimulationDelay } from "@/configs";
import useVuelidate from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';

const a = ref("gg")

type StateModel = {
    productDetails: ProductResponse | null,
    quantity: number,
    loader: boolean
}

const router = useRouter()
const route = useRoute()

const productId = route.params.id.toString()
const state = reactive<StateModel>({
    productDetails: null,
    quantity: 0,
    loader: true
})

const $v = useVuelidate({
    quantity: { required, minValue: minValue(1) }
},state)

const loadProductDetails = () => {
    state.loader = true
    product().details(productId)
        .then(response => state.productDetails = response)
        .finally(() => state.loader = false)
}

const productIncrementChange = (quantity: number) => {
    state.quantity = quantity
}

const navigateToCartPage = async () => {
    const valid = await $v.value.$validate()
    if (!valid)
        return
    router.push({path: '/checkout'})
}

setTimeout(loadProductDetails, SimulationDelay);

</script>