<script setup>

import Card from '@/components/Card.vue'
import { ref } from 'vue'

defineProps({
  items:Array
})


const addFavorite = ()=>{
  // isLiked.value = !isLiked.value
}
const addCard = ()=>{
  // isLiked.value = !isLiked.value
}
</script>

<template>
  <div class="grid grid-cols-4 gap-5 p-5">
    <Card
      v-for="(item, index) in items"
      :key="item.id"
      :img="item.imageUrl"
      :price="item.price"
      :title="item.title"
      :is-added="false"
      :is-liked="false"
      :addCard="addCard"
      :addFavorite="addFavorite"
    />
  </div>
</template>

<style scoped>

</style>