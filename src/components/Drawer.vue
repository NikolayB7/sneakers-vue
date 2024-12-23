<script setup>
import CartItem from '@/components/CartItem.vue'
import { inject, ref } from 'vue'
import InfoBlock from '@/components/InfoBlock.vue'
import axios from 'axios'


const props = defineProps({
  totalPrice:Number,
  vatPrice:Number,
  isCreatingOrder: Boolean
})

const baseUrl = import.meta.env.VITE_BASE_URL

const {closeDrawer,cart,removeFromCart} = inject('cardActions');

const isCreatingOrder = ref(false);
const orderSaccess = ref(null);
const createOrder = async()=>{

  try{
    isCreatingOrder.value = true
    const {data} = await axios.post(`https://4023d8e1c4c444d2.mokky.dev/orders`,{
      items:cart.value,
      totalPrice:props.totalPrice.value
    })
    console.log(data.id,'___data.id')
    cart.value = [];
    orderSaccess.value = data.id
    return data
  }catch(err) {
    console.log(err)
  }finally {
    isCreatingOrder.value = false
  }
}

</script>


<template>
  <div class="fixed z-10 top-0 h-full w-full bg-black opacity-70" />
  <div class="flex flex-col justify-between fixed h-full z-10 top-0 h-full right-0 w-96 bg-white px-10 py-7">
    <h2 class="text-2xl font-bold mb-10 flex items-center gap-5">
      <svg
        @click="closeDrawer"
        class="rotate-180 hover:-translate-x-1 opacity-30 hover:opacity-100 transition cursor-pointer"
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 7H14.7143"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.71436 1L14.7144 7L8.71436 13"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      {{ $t('cart.title') }}
    </h2>

    <div
      v-if="!totalPrice || orderSaccess"
      class="flex h-full items-center"
    >
      <InfoBlock
        v-if="orderSaccess"
        :title="$t('cart.order_success')"
        :description="$t('cart.order_description',{order_number:orderSaccess})"
        :image-url="`${baseUrl}img/order-success-icon.png`">
      </InfoBlock>
      <InfoBlock
        v-if="!totalPrice && !orderSaccess"
        :title="$t('cart.title_empty')"
        :description="$t('cart.empty_description')"
        :image-url="`${baseUrl}img/package-icon.png`">
      </InfoBlock>
    </div>

    <div v-else class="flex flex-col flex-1 justify-between">
      <div
        v-auto-animate
        class="flex flex-col gap-5"
      >
        <CartItem
          v-for="(item,index) in cart"
          :key="index"
          :title="item.title"
          :price="item.price"
          :img="`img/${item.imageUrl}`"
          @on-click-remove="()=>removeFromCart(item)"
        />

      </div>

      <div>
        <div class="flex flex-col gap-5">
          <div class="flex items-end gap-2">
            <span>{{ $t('cart.total') }}:</span>
            <div class="flex-1 border-b border-dashed" />
            <span class="font-bold">{{ totalPrice }} uan.</span>
          </div>

          <div class="flex items-end gap-2">
            <span>{{ $t('cart.tax') }} 5%:</span>
            <div class="flex-1 border-b border-dashed" />
            <span class="font-bold">{{ vatPrice }} uan.</span>
          </div>
        </div>

        <button
          :disabled="totalPrice ? false : true"
          @click = "createOrder"
          class="relative flex justify-center items-center gap-3 w-full py-3 mt-10 bg-lime-500 text-white rounded-xl transition active:bg-lime-700 hover:bg-lime-600 disabled:bg-gray-300"
        >
          {{ $t('cart.order_btn') }}
          <img v-if="isCreatingOrder" class="absolute" src="/img/loading.svg" alt="loading..." />
          <img src="/img/arrow-next.svg" alt="Arrow" />
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>