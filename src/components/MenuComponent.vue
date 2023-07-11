<template>
    <ul class="flex justify-end gap-3 text-sm text-[#31241E] md:flex-row flex-col">
        <li><RouterLink class="hover:underline" to="/auth">Login</RouterLink></li>
        <li><RouterLink class="hover:underline" to="/products">Products</RouterLink></li>
    </ul>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
