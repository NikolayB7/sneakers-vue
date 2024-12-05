<script setup>

import { onMounted, ref } from 'vue'
import axios from 'axios'
import CartItem from '@/components/CartItem.vue'
import CardList from '@/components/CardList.vue'

const favoritesIdList = ref([])

onMounted(async ()=>{
  try{

    const { data } = await axios.get(`https://4023d8e1c4c444d2.mokky.dev/favorites`)
    favoritesIdList.value = data
    // const listSneakers = await axios.get(`https://4023d8e1c4c444d2.mokky.dev/items`)

    // favoritesIdList.value = listSneakers.data.filter(item1 =>
    //   favoritesList.data.some(item2 => item1.id === item2.product_id)
    // );

  }catch (err){
    console.log(err)
  }
})

</script>

<template>
  <CardList
    :items="favoritesIdList"
  />
</template>

<style scoped>

</style>