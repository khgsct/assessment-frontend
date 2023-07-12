<template>
    <div>
        <div class="mb-2">
            <h2 class="title">Cart</h2>
        </div>
        <div class="flex justify-between mb-2" v-bind:key="product" v-for="product in Array(5)">
            <span class="text-[#737373] font-light">Product name</span>
            <span class="flex">
                <ProductIncrement />
                <span class="pl-2 text-[#31241E]">100.50 THB</span>
            </span>
        </div>
        <div class="flex justify-between py-5">
            <button class="btn-secondary">
                <RouterLink to="/products">Back</RouterLink>
            </button>
            <button class="btn-primary" v-on:click="checkout">Checkout</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import ProductIncrement from "@/components/ProductIncrementComponent.vue";

const checkout = () => {
    alert('checkout complete')
}
</script>
