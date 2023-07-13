<template>
    <div class="flex  items-center gap-x-2">
        <Icon class="cursor-pointer" icon="zondicons:minus-outline" v-on:click="decrement" />
        <input class="bg-[#F6F6F6] text-[#2A3240] rounded-full px-4 py-1 text-sm outline-none w-[100px] h-[30px] text-center" type="number" readonly v-model.number.lazy="quantity" >
        <Icon class="cursor-pointer" icon="simple-line-icons:plus" v-on:click="increment" />
    </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const props = defineProps({
    quantity: {
        required: true,
        type: Number
    },
    minValue: {
        requied: false,
        type: Number
    }
})
const emit = defineEmits<{
    (event: 'change', quantity: number): void
}>()

const quantity = ref(props.quantity)

const increment = () => {
    quantity.value++
    emit('change', quantity.value)
}

const decrement = () => {
    if (quantity.value == props.minValue ?? 0)
        return
    quantity.value--
    emit('change', quantity.value)
}

// emit('change', quantity.value)

</script>

