<script setup>

import CardList from '@/components/CardList.vue'
import axios from 'axios'
import { inject, onMounted, reactive, ref, watch } from 'vue'
import debounce from "lodash.debounce"
import Toast from '@/components/Toast.vue'
const { cart, addToCart, removeFromCart } = inject('cardActions')
import staticSneakersList from "../../public/data/sneakers.json"

const isLoading = ref(true);
const isFailed = ref(false);
const sneakersList = ref([]); //{value: []}
const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const addToFavorite = async (item)=>{

  try {
    if(!item.isFavorite){
      const obj ={
        'product_id': item.id,
        ...item
      }
      const {data} = await axios.post('https://4023d8e1c4c444d2.mokky.dev/favorites',obj)
      // item.isFavorite = true
      item.favoriteId = data.id
      item.isFavorite = !item.isFavorite
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
const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value;
}, 500);
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
    isLoading.value= false
  }catch (err){
    isFailed.value = true
    isLoading.value= true
    console.log(err)
  }
}
const closeToast = ()=>{
  isFailed.value = false
}
const getSatic = ()=>{
  sneakersList.value = staticSneakersList
  isLoading.value= false
  closeToast()
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
watch(isFailed, () => { if (!isFailed.value) { getSatic(); } });
watch(cart,()=>{
  localStorage.setItem('cart',JSON.stringify(cart.value))
},{
  deep:true // "" глубокая проверка cart
})
</script>

<template>
  <div class="flex justify-between items-center mb-10">
    <h1 class="text-3xl font-bold">{{ $t('all_sneakers') }}</h1>
    <div class="flex items-center gap-4">
      <select
        @change="onChangeSelect"
        class="py-2 px-3 border border-gray-200 focus:border-gray-400 rounded-md focus:outline-none"
      >
        <option value="name">{{ $t('filter.name') }}</option>
        <option value="price">{{ $t('filter.price_down') }}</option>
        <option value="-price">{{ $t('filter.price_up') }}</option>
      </select>
      <div class="relative">
        <input
          @input="onChangeSearchInput"
          type="text"
          class="border border-gray-200 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-gray-400"
          :placeholder="`${$t('filter.search')}...`"
        />
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <img src="/img/search.svg" />
        </div>
      </div>
    </div>
  </div>
  <CardList
    :loading="isLoading"
    :items="sneakersList"
    @addToFavorite="addToFavorite"
    @add-to-cart="clickToCart"
  />
  <Toast
    v-if="isFailed"
    :getSatic="getSatic"
    :close="closeToast"
  />
</template>

<style scoped>

</style>