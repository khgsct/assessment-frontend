<template>
    <div class="grid grid-cols-12 gap-3">
        <div class="col-span-12 md:col-span-4">
            <ProductItem :product="null" />
        </div>
        <div class="col-span-12 md:col-span-8">
            <p class="text-gray-600 text-sm pr-4 mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A magni modi sequi aliquid. Quos iste voluptatem laudantium quia, at ad et facilis, odio, ab accusamus delectus quae repellendus vel a!
            </p>
            <ProductIncrement class="mb-4" />
            <button class="btn-primary">
                <RouterLink to="/checkout">Add to cart</RouterLink>                
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import ProductItem from "../components/ProductItemComponent.vue";
import ProductIncrement from "../components/ProductIncrementComponent.vue";
</script>
