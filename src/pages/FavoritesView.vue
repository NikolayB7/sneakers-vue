<script setup>

import { onMounted, ref } from 'vue'
import axios from 'axios'

const favoritesIdList = ref([])

onMounted(async ()=>{
  try{
    // https://4023d8e1c4c444d2.mokky.dev/orders

    // https://4023d8e1c4c444d2.mokky.dev/items
    // https://4023d8e1c4c444d2.mokky.dev/favorites


    const {data} = await axios.get(`https://4023d8e1c4c444d2.mokky.dev/favorites`)

    favoritesIdList.value = data
    const resp = await axios.post(`https://4023d8e1c4c444d2.mokky.dev/items?_relations=${favoritesIdList.value}`,)
    console.log(resp.data)

  }catch (err){
    console.log(err)
  }
})

</script>

<template>
  favorites
</template>

<style scoped>

</style>