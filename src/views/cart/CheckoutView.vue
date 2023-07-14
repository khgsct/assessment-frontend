<template>
    <div>
        <div class="mb-2">
            <h2 class="title">Cart</h2>
        </div>

        <div v-show="!state.loader">
            <div class="flex justify-between mb-2">
                <span>Name</span>
                <span>Amount</span>
            </div>

            <div class="flex mb-2" v-bind:key="cartItem.id" v-for="cartItem in state.cartInfo?.cartDetails">
                <span class="text-[#737373] font-light pl-5">{{ cartItem.productName }}</span>
                <span class="text-[#31241E] ml-auto flex items-center gap-x-2">
                    <span class="text-sm">{{ formatNumber(cartItem.productPrice) }}</span> <span>@</span> <ProductIncrement :quantity="cartItem.quantity" :min-value="1" @change="productQuantityChange(cartItem.productId, $event)" />
                </span>
                
                <div class="min-w-[100px] flex justify-end">
                    <span v-show="!state.updating" class="text-[#31241E]">{{ formatNumber(cartItem.totalPrice) }} </span>
                    <span class="animate-pulse" v-show="state.updating">
                        <div class="w-16 h-7 rounded bg-slate-200"></div>
                    </span>
                </div>
            </div>
            <div class="flex justify-between text-[25px] border-t border-gray-300 pt-2">
                <span class="text-gray-700">Total</span>
                <span class="font-thin text-gray-800" v-show="!state.updating"><u>{{ formatNumber(state.cartInfo?.totalPrice ?? 0) }}</u></span>

                <div v-show="state.updating">
                    <div class="animate-pulse">
                        <div class="w-32 h-7 rounded bg-slate-200"></div>
                    </div>
                </div>
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
                Back
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
    execute: () => Promise<void>
}

const router = useRouter()

let productQueueTimeoutId = -1
const productQueueProcessor = reactive([] as ProductTaskModel[])
const productQueueWorker = reactive([] as string[])
const processProductQueue = async (queue: ProductTaskModel[]): Promise<boolean> => {
    const productTask = queue.shift()
    if (productTask && !productQueueWorker.includes(productTask.productTaskId)) {
        productQueueWorker.push(productTask.productTaskId)
        await productTask.execute()
        productQueueWorker.shift()

        if (queue.length == 0) {
            state.updating = false
            loadCartSummary()
        }
    }
    return queue.length > 0
}

watch(productQueueProcessor, (queue: ProductTaskModel[]) => {
    clearTimeout(productQueueTimeoutId)
    productQueueTimeoutId = setTimeout(async () => {
        let hasPendingTask = await processProductQueue(queue)
        while(hasPendingTask) {
            hasPendingTask = await processProductQueue(queue)
        }
    }, UpdateCartDelay)
})

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

const enqueueProductTask = (productId: string, quantity: number) => {
    const productTask: ProductTaskModel = {
        productTaskId: productId,
        execute: (): Promise<void> => {
            return cart().updateCart(productId, quantity)
        }
    }
    const productTaskIdx = productQueueProcessor.findIndex(p => p.productTaskId == productId)
    if (productTaskIdx != -1)
        productQueueProcessor.splice(productTaskIdx, 1)
    productQueueProcessor.push(productTask)
}

const productQuantityChange = (productId: string, quantity: number) => {
    state.updating = true
    enqueueProductTask(productId, quantity)
}

const checkout = () => {
    router.push({path: '/thank-you'})
}

setTimeout(loadCartSummary, SimulationDelay)
</script>
