<script setup>
import { onMounted, reactive, ref, watch, provide, computed } from 'vue'
import axios from 'axios'

import Header from '@/components/Header.vue'

import Drawer from '@/components/Drawer.vue'
// import sneakersList from "../public/data/sneakers.json"

// onMounted(async ()=>{
//   try {
//     const {data} = await axios.get('https://4023d8e1c4c444d2.mokky.dev/items')
//     console.log(data)
//     sneakersList.value = data
//   }catch (err){
//     console.log(err)
//   }
// })


/* Корзина (START)*/
const cart = ref([])
// reactive - для хранения обьектов
// ref - для хранения массивов

const totalPrice = computed(()=> cart.value.reduce((count,item)=>count + item.price,0));
const vatPrice = computed(()=>Math.round((totalPrice.value * 5) / 100));
const drawerOpen = ref(false)

// const sortBy = ref('');
// const searchQuery = ref('');

const addToCart = (item)=>{
  cart.value.push(item)
  item.isAdded = true
}
const removeFromCart = (item)=>{
  const index = cart.value.indexOf(item);
  if (index > -1) {
    cart.value.splice(index, 1);
  }
  item.isAdded = false
}
const openDrawer = ()=>{
  drawerOpen.value = true
}
const closeDrawer = ()=>{
  drawerOpen.value = false
}

/* Корзина (END)*/


provide("cardActions",
  {
    cart,
    openDrawer,
    closeDrawer,
    addToCart,
    removeFromCart
  })
// onMounted(()=>{
//   // fetch('https://4023d8e1c4c444d2.mokky.dev/items')
//   //   .then((res)=>res.json())
//   //   .then((data)=>{
//   //     console.log(data)
//   //   })
//   //
//   // axios.get('https://4023d8e1c4c444d2.mokky.dev/items')
//   //   .then((result)=>{
//   //     sneakersList.value = result.data
//   //   })
// })


// watch(filters,async ()=>{
//   axios.get(`https://4023d8e1c4c444d2.mokky.dev/items?sortBy=${filters.sortBy}`)
//     .then((result)=>{
//       console.log(result.data)
//       sneakersList.value = result.data
//     })
// })

// provide("addToFavorite",addToFavorite)

</script>

<template>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl shadow-grey-200 mt-20">
    <Header
      :total="totalPrice"
      @open-drawer="openDrawer"
    />

    <div class="p-10">
      <RouterView />
    </div>
    <Drawer
      v-if="drawerOpen"
      :vat-price="vatPrice"
      :total-price="totalPrice"
    />

  </div>

</template>

<style scoped>

</style>
