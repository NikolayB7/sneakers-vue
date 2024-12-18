<script setup>

import Card from '@/components/Card.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'

defineProps({
  items:Array,
  loading:Boolean
})

const emit = defineEmits(['addToFavorite','addToCart'])

// const addToFavorite = inject('addToFavorite')

</script>

<template>
  <div
    v-auto-animate
    class="grid grid-cols-4 gap-5 p-5"
  >
    <div
      v-if="loading"
      v-for="(item, index) in 8"
      :key="index"
    >
      <SkeletonCard
      />
    </div>

    <Card
      v-else
      v-for="(item, index) in items"
      :key="`${item.id + index}`"
      :id="item.id"
      :img="item.imageUrl"
      :price="item.price"
      :title="item.title"
      :is-added="false"
      :is-favorite="item.isFavorite"
      :clickToFavorite="()=>emit('addToFavorite',item)"
      :addCart="()=>emit('addToCart',item)"
      :isAdded="item.isAdded"
    />

  </div>
</template>

<style scoped>

</style>