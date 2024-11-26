<script setup>
import { onMounted, reactive, ref, watch, provide, computed } from 'vue'
import axios from 'axios'

import Header from '@/components/Header.vue'
import CardList from '@/components/CardList.vue'

import Drawer from '@/components/Drawer.vue'
// import skeakersList from "../public/data/sneakers.json"

// onMounted(async ()=>{
//   try {
//     const {data} = await axios.get('https://4023d8e1c4c444d2.mokky.dev/items')
//     console.log(data)
//     skeakersList.value = data
//   }catch (err){
//     console.log(err)
//   }
// })


const skeakersList = ref([]); //{value: []}

const cart = ref([])
// reactive - для хранения обьектов
// ref - для хранения массивов

const totalPrice = computed(()=> cart.value.reduce((count,item)=>count + item.price,0));
const vatPrice = computed(()=>Math.round((totalPrice.value * 5) / 100));

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

// const sortBy = ref('');
// const searchQuery = ref('');

const onChangeSelect = ()=>{
  filters.sortBy = event.target.value
}
const onChangeSearchInput =()=>{
  filters.searchQuery = event.target.value
}

const fetchFavorites = async ()=>{
  try {
    const {data:favorites} = await axios.get(`https://4023d8e1c4c444d2.mokky.dev/favorites`)
    skeakersList.value = skeakersList.value.map(item=>{
      const favorite = favorites.find(favorite=>favorite.productId === item.id);

      if(!favorite){
        return item;
      }

      return {
        ...item,
        isFavorite:true,
        favoriteId:favorite.id
      }

    })
    // console.log(skeakersList.value)
  }catch (err){
    console.log(err)
  }
}

const addToFavorite = async (item)=>{
  item.isFavorite = !item.isFavorite
  try {
    if(!item.isFavorite){
      const obj ={
        'productId': item.id
      }
      const {data} = await axios.post('https://4023d8e1c4c444d2.mokky.dev/favorites',obj)
      // item.isFavorite = true
      item.favoriteId = data.id
    }else{
      await axios.delete(`https://4023d8e1c4c444d2.mokky.dev/favorites/${item.favoriteId}`)
      // item.isFavorite = false
      item.favoriteId = null
    }
  }catch (err){
    console.log(err)
  }
}

const fetchItems = async ()=>{
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if(filters.searchQuery){
      params.title = `*${filters.searchQuery}*`
    }

    const {data} = await axios.get(`https://4023d8e1c4c444d2.mokky.dev/items` ,{params})
    skeakersList.value = data.map((obj)=>({
      ...obj,
      isFavorite:false,
      favoriteId:null,
      isAdded:false
    }))
  }catch (err){
    console.log(err)
  }
}

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

const clickToCart = (item)=>{
  if(!item.isAdded){
    addToCart(item)
  }else{
    removeFromCart(item)
  }
}

const drawerOpen = ref(false)

const openDrawer = ()=>{
  drawerOpen.value = true
}
const closeDrawer = ()=>{
  drawerOpen.value = false
}

onMounted(async ()=>{
  await fetchItems()
  await fetchFavorites()
});
watch(fetchItems)

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
//   //     skeakersList.value = result.data
//   //   })
// })


// watch(filters,async ()=>{
//   axios.get(`https://4023d8e1c4c444d2.mokky.dev/items?sortBy=${filters.sortBy}`)
//     .then((result)=>{
//       console.log(result.data)
//       skeakersList.value = result.data
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
      <div class="flex justify-between items-center mb-10">
        <h1 class="text-3xl font-bold">Все кроссовки</h1>
        <div class="flex items-center gap-4">
          <select
            @change="onChangeSelect"
            class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none"
          >
            <option value="name">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
          </select>
          <div class="relative">
            <input
              @change="onChangeSearchInput"
              type="text"
              class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400"
              placeholder="Поиск..."
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <img src="/img/search.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <CardList
      :items="skeakersList"
      @addToFavorite="addToFavorite"
      @add-to-cart="clickToCart"
    />

    <Drawer
      v-if="drawerOpen"
      :vat-price="vatPrice"
      :total-price="totalPrice"
    />

  </div>

</template>

<style scoped>

</style>
