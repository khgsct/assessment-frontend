<template>
    <ul class="flex justify-end gap-3 text-sm text-[#31241E] md:flex-row flex-col">
        <li><RouterLink class="hover:underline" to="/products">Products</RouterLink></li>
        <li><RouterLink class="hover:underline" to="/auth" v-if="!isLoggedIn">Login</RouterLink></li>
        <li><RouterLink class="hover:underline" to="/auth" v-if="isLoggedIn" v-on:click="logout">Logout</RouterLink></li>
    </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { user } from "@/auth";

const router = useRouter()
const isLoggedIn = computed(() => user.isAuthenticated)

const logout = () => {
    user.logout()
    router.push({path: '/auth'})
}
</script>
