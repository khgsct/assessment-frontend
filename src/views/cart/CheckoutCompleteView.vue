<template>
    <div class="flex flex-col justify-center items-center">
        <span class="text-blue-500 text-[50px] font-thin uppercase">
            Thank you 
            <Icon icon="ph:heart-duotone" color="red" class="inline-flex text-[50px]" />
        </span>   
        <RouterLink class="btn-primary" to="/products">
            <span>View more products..</span>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

