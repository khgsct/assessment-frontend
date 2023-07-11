<template>
  <div>
    <div class="mb-2">
        <h2 class="title">Authentication</h2>
    </div>
    <form method="post">
      <div class="flex flex-col gap-y-5">
        <div class="relative">
          <Icon class="absolute top-1 left-2 text-[25px] text-gray-500" icon="ei:user" />
          <input class="form-control pl-[40px]" type="email" placeholder="Email Address">
        </div>
        <div class="relative">
          <Icon class="absolute top-2 left-2 text-[20px] text-gray-500" icon="akar-icons:key" />
          <input class="form-control pl-[40px]" type="password" placeholder="Password">
        </div>
        <div>
          <button class="btn-primary" v-on:click="signin">Sign in</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

const signin = () => {
  alert('welcome')
}
</script>
