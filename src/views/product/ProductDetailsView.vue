<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12 md:col-span-4">
            <ProductItem :product="state.productDetails" v-show="!state.loader" />
            <ProductItemLoader v-show="state.loader" />
        </div>
        <div class="col-span-12 md:col-span-8">
            <div v-show="!state.loader" class="flex flex-col gap-y-4">
                <p class="pr-4 text-sm text-gray-600">
                    {{ state.productDetails?.description }}
                </p>
                <div>
                    <ProductIncrement :quantity="state.quantity" @change="productIncrementChange($event)" />
                    <div class="flex flex-col" v-for="error in $v.quantity.$errors" v-bind:key="error.$uid">
                        <span class="text-red-500">{{ error.$message }}</span>
                    </div>
                </div>
                <button class="btn-primary min-w-[130px] w-[120px]" v-on:click="navigateToCartPage" :disabled="state.saving">
                    <Icon icon="eos-icons:bubble-loading" v-show="state.saving" class="inline-block" /> Add to cart
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
import { Icon } from '@iconify/vue';
import ProductItem from "@/components/product/ProductItemComponent.vue";
import ProductItemLoader from "@/components/product/ProductItemLoaderComponent.vue";
import ProductIncrement from "@/components/product/ProductIncrementComponent.vue";
import { cart, product } from '@/http';
import type { ProductDetailsResponse } from '@/models';
import { reactive } from 'vue';
import { SimulationDelay } from "@/configs";
import useVuelidate from '@vuelidate/core';
import { required, minValue } from '@vuelidate/validators';

type StateModel = {
    productDetails: ProductDetailsResponse | null,
    quantity: number,
    loader: boolean,
    saving: boolean
}

const router = useRouter()
const route = useRoute()

const productId = route.params.id.toString()
const state = reactive<StateModel>({
    productDetails: null,
    quantity: 0,
    loader: true,
    saving: false,
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

const updateCart = () => {
        cart().updateCart(productId, state.quantity)
            .finally(() => state.saving = false)
}

const navigateToCartPage = async () => {
    const valid = await $v.value.$validate()
    if (!valid)
        return

    state.saving = true
    setTimeout(() => {
        updateCart()
        router.push({path: '/checkout'})
    }, SimulationDelay)
}

setTimeout(loadProductDetails, SimulationDelay)

</script>
