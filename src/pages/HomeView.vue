<script setup>

import CardList from '@/components/CardList.vue'
import axios from 'axios'
import { inject, onMounted, reactive, ref, watch } from 'vue'

const { cart, addToCart, removeFromCart } = inject('cardActions')

const sneakersList = ref([]); //{value: []}
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const addToFavorite = async (item)=>{
  item.isFavorite = !item.isFavorite
  try {
    if(item.isFavorite){
      const obj ={
        'product_id': item.id
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
    // console.log(err)
  }
}
const onChangeSelect = ()=>{
  filters.sortBy = event.target.value
}
const onChangeSearchInput =()=>{
  filters.searchQuery = event.target.value
}
const fetchFavorites = async ()=>{
  try {
    const {data:favorites} = await axios.get(`https://4023d8e1c4c444d2.mokky.dev/favorites`)
    sneakersList.value = sneakersList.value.map(item=>{
      const favorite = favorites.find(favorite=>favorite.product_id === item.id);

      if(!favorite){
        return item;
      }

      return {
        ...item,
        isFavorite:true,
        favoriteId:favorite.id
      }

    })
    // console.log(sneakersList.value)
  }catch (err){
    console.log(err)
  }
}
const clickToCart = (item)=>{
  if(!item.isAdded){
    addToCart(item)
  }else{
    removeFromCart(item)
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
    sneakersList.value = data.map((obj)=>({
      ...obj,
      isFavorite:false,
      favoriteId:null,
      isAdded:false
    }))
  }catch (err){
    console.log(err)
  }
}

onMounted(async ()=>{
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()

  sneakersList.value = sneakersList.value.map(item=>({
    ... item,
    isAdded: cart.value.some(el=>el.id === item.id)
  }))


});
watch(cart,()=>{
  sneakersList.value = sneakersList.value.map((item)=>({
    ...item,
    isAdded: false
  }))
})
watch(filters,fetchItems)
watch(cart,()=>{
  localStorage.setItem('cart',JSON.stringify(cart.value))
},{
  deep:true // "" глубокая проверка cart
})
</script>

<template>
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
  <CardList
    :items="sneakersList"
    @addToFavorite="addToFavorite"
    @add-to-cart="clickToCart"
  />
</template>

<style scoped>

</style>