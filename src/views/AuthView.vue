<template>
  <div class="w-[300px]">
    <div class="mb-2">
        <h2 class="title">Authentication</h2>
    </div>
    <form method="post" @submit.prevent="signin">
      <div class="flex flex-col gap-y-5">
        <div class="relative">
          <Icon class="absolute top-1 left-2 text-[25px] text-gray-500" icon="ei:user" />
          <input class="form-control pl-[40px]" type="email" placeholder="Email Address" v-model="email">
        </div>
        <div class="relative">
          <Icon class="absolute top-2 left-2 text-[20px] text-gray-500" icon="akar-icons:key" />
          <input class="form-control pl-[40px]" type="password" placeholder="Password" v-model="password">
        </div>
        <div class="flex justify-between">
          <button class="btn-primary" type="submit" :disabled="loader">
            <Icon icon="eos-icons:bubble-loading" v-show="loader" class="inline-block" /> Sign in
          </button>
          <span v-if="errorMsg" class="text-red-500">{{ errorMsg }}</span>
        </div>
        
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { auth } from "@/http";
import type { AuthResponse, HttpError } from "@/models";
import { user } from "@/auth";

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMsg = ref('')
const loader = ref(false)

watch(email, () => errorMsg.value = '')
watch(password, () => errorMsg.value = '')

const signin = () => {
  loader.value = true
  setTimeout(() => {
    errorMsg.value = ''
    auth().authenticate(email.value, password.value)
      .then((response: AuthResponse) => user.updateToken(response.token))
      .then(() => router.push({path: '/products'}))
      .catch((error: HttpError) => errorMsg.value = error.message)
      .finally(() => loader.value = false)
  }, 3000);
}
</script>
