<template>
  <div class="w-[300px]">
    <div class="mb-2">
        <h2 class="title">Authentication</h2>
    </div>
    <form method="post" @submit.prevent="signin">
      <div class="flex flex-col gap-y-5">
        <div class="relative">
          <Icon class="absolute top-1 left-2 text-[25px] text-gray-500" icon="ei:user" />
          <input class="form-control pl-[40px]" type="email" placeholder="Email Address" v-model="state.email">
          <div class="flex flex-col" v-for="error in $v.email.$errors" v-bind:key="error.$uid">
            <span class="text-red-500">{{ error.$message }}</span>
          </div>
        </div>
        <div class="relative">
          <Icon class="absolute top-2 left-2 text-[20px] text-gray-500" icon="akar-icons:key" />
          <input class="form-control pl-[40px]" type="password" placeholder="Password" v-model="state.password">
          <div class="flex flex-col" v-for="error in $v.password.$errors" v-bind:key="error.$uid">
            <span class="text-red-500">{{ error.$message }}</span>
          </div>
        </div>
        <div class="flex justify-between">
          <button class="btn-primary" type="submit" :disabled="state.loader">
            <Icon icon="eos-icons:bubble-loading" v-show="state.loader" class="inline-block" /> Sign in
          </button>
          <span v-if="state.errorMsg" class="text-red-500">{{ state.errorMsg }}</span>
        </div>
        
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { useVuelidate } from '@vuelidate/core'
import { auth } from "@/http";
import type { AuthResponse, HttpError } from "@/models";
import { user } from "@/auth";
import { required, email } from '@vuelidate/validators';
import { SimulationDelay } from '@/configs';

type StateModel = {
  email: string,
  password: string,
  errorMsg: string,
  loader: boolean
}

const router = useRouter()
const state = reactive<StateModel>({
  email: '',
  password: '',
  errorMsg: '',
  loader: false
})
const $v = useVuelidate({
  email: { required, email},
  password: { required }
}, state)

watch(() => state.email, () => state.errorMsg = '')
watch(() => state.password, () => state.errorMsg = '')

const signin = async () => {
  const valid = await $v.value.$validate()
  if (!valid)
    return
  state.loader = true
  state.errorMsg = ''
  setTimeout(() => {
    auth().authenticate(state.email, state.password)
      .then((response: AuthResponse) => user.updateToken(response.token))
      .then(() => router.push({path: '/products'}))
      .catch((error: HttpError) => state.errorMsg = error.message)
      .finally(() => state.loader = false)
  }, SimulationDelay);
}
</script>
