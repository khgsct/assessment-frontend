<template>
    <div>
        <div class="mb-2">
            <h2 class="title">Cart</h2>
        </div>

        <div v-show="!state.loader">
            <div class="flex justify-between mb-2" v-bind:key="cartItem.id" v-for="cartItem in state.cartInfo?.cartDetails">
                <span class="text-[#737373] font-light">{{ cartItem.productName }}</span>
                <span class="flex">
                    <ProductIncrement :quantity="cartItem.quantity" :min-value="1" @change="productQuantityChange(cartItem.productId, $event)" />
                    <span class="pl-2 text-[#31241E] min-w-[150px] text-right">{{ formatNumber(cartItem.totalPrice) }} </span>
                </span>
            </div>
            <div class="flex justify-between text-[25px]">
                <span class="text-gray-700">Total</span>
                <span class="font-thin text-gray-800"><u>{{ formatNumber(state.cartInfo?.totalPrice ?? 0) }}</u></span>
            </div>
        </div>

        <div v-show="state.loader">
                <div class="animate-pulse">
                    <div class="h-10 mb-2 rounded bg-slate-200"></div>
                    <div class="h-10 mb-2 rounded bg-slate-200"></div>
                    <div class="h-10 mb-2 rounded bg-slate-200"></div>
                    <div class="flex justify-between mb-2">
                        <span class="w-20 h-10 rounded bg-slate-200"></span>
                        <span class="w-20 h-10 rounded bg-slate-200"></span>
                    </div>
                </div>
            </div>

        <div class="flex justify-between py-5">
                <RouterLink class="btn-secondary" to="/products">
                    <span>Back</span>
                </RouterLink>
            <button class="btn-primary" v-on:click="checkout" :disabled="state.updating">
                Checkout
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import ProductIncrement from "@/components/product/ProductIncrementComponent.vue";
import { cart } from '@/http';
import type { CartSummaryResponse } from '@/models';
import { reactive, watch } from 'vue';
import { SimulationDelay, UpdateCartDelay } from '@/configs';
import { formatNumber } from "@/utils";

type StateModel = {
    cartInfo: CartSummaryResponse | null,
    loader: boolean,
    updating: boolean
}

type ProductTaskModel = {
    productTaskId: string,
    execute: () => void
}

const router = useRouter()

let productQueueTimeoutId = -1
const productQueueProcessor = reactive([] as ProductTaskModel[])
const productQueueWorker = reactive([] as string[])
const processProductQueue = (queue: ProductTaskModel[]): boolean => {
    const productTask = queue.shift()
    if (productTask && !productQueueWorker.includes(productTask.productTaskId)) {
        productQueueWorker.push(productTask.productTaskId)
        productTask.execute()
        productQueueWorker.shift()
    }
    return queue.length > 0
}


watch(productQueueProcessor, (queue: ProductTaskModel[]) => {
    if (queue.length == 0)
        loadCartSummary()
    clearTimeout(productQueueTimeoutId)
    productQueueTimeoutId = setTimeout(() => {
        let hasPendingTask = processProductQueue(queue)
        while(hasPendingTask) {
            hasPendingTask = processProductQueue(queue)
        }
    }, UpdateCartDelay)
}, { deep: true })

const state = reactive<StateModel>({
    cartInfo: null,
    loader: true,
    updating: false
})

const loadCartSummary = () => {
    cart().getCartSummary()
        .then(response => state.cartInfo = response)
        .finally(() => state.loader = false)
}

const enqueueProductQueueProcessor = (productId: string, quantity: number) => {
    const productTask: ProductTaskModel = {
        productTaskId: productId,
        execute: () => {
            cart().updateCart(productId, quantity)
                .finally(() => state.updating = false)
            }
        }
    const productTaskIdx = productQueueProcessor.findIndex(p => p.productTaskId == productId)
    if (productTaskIdx != -1)
        productQueueProcessor.splice(productTaskIdx, 1)
    productQueueProcessor.push(productTask)
}

const productQuantityChange = (productId: string, quantity: number) => {
    state.updating = true
    enqueueProductQueueProcessor(productId, quantity)
}

const checkout = () => {
    router.push({path: '/thank-you'})
}

setTimeout(loadCartSummary, SimulationDelay)
</script>
