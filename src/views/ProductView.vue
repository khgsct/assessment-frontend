<template>
    <div>
        <div class="mb-2">
            <h2 class="title">Products</h2>
        </div>
        <div class="grid grid-cols-12 gap-3 gap-y-10">
            <div class="col-span-6 lg:col-span-4 cursor-pointer" v-bind:key="product" v-for="product in Array(5)">
                <ProductItem :product="product" />
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
import ProductItem from "../components/ProductItemComponent.vue";
</script>
