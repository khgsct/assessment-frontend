<template>
    <div>
        <div class="mb-2">
            <h2 class="title">Products</h2>
        </div>
        <div class="grid grid-cols-12 gap-3">
            <div class="col-span-6 lg:col-span-4 cursor-pointer" v-bind:key="product" v-for="product in Array(15)">
                <ProductItem :product="product" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ProductItem from "../components/ProductItemComponent.vue";
</script>
