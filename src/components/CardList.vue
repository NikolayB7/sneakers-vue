<script setup>

import Card from '@/components/Card.vue'
import { ref } from 'vue'

defineProps({
  items:Array
})

const emit = defineEmits(['addToFavorite','addToCart'])

const addFavorite = ()=>{

  // isLiked.value = !isLiked.value
}
const addCard = ()=>{
  // isLiked.value = !isLiked.value
}

// const addToFavorite = inject('addToFavorite')

</script>

<template>
  <div
    v-auto-animate
    class="grid grid-cols-4 gap-5 p-5"
  >
    <Card
      v-for="(item, index) in items"
      :key="item.id"
      :id="item.id"
      :img="item.imageUrl"
      :price="item.price"
      :title="item.title"
      :is-added="false"
      :is-favorite="item.isFavorite"
      :addCard="addCard"
      :clickToFavorite="()=>emit('addToFavorite',item)"
      :addCart="()=>emit('addToCart',item)"
      :isAdded="item.isAdded"
    />
  </div>
</template>

<style scoped>

</style>