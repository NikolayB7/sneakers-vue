<script setup>


defineProps({
  title: String,
  img: String,
  price: Number,
  isLiked:Boolean,
  isAdded:Boolean,
  addFavorite:Function,
  addCard:Function,
});


</script>

<template>
  <div
    class="flex-grow-0 flex-shrink-0 basis-1/4 relative flex flex-col w-full border border-slate-100 rounded-xl p-5 cursor-pointer transition hover:shadow-xl hover:transform hover:-translate-y-2"
  >
    <div @click="addFavorite" class="absolute top-8 left-8">
      <img :src="!isLiked ? '/img/like-1.svg' : '/img/like-2.svg'" alt="Favorite" />
    </div>
    <img :src="`/img/${img}`" class="w-full" alt="Sneaker" />
    <p>{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col gap-2">
        <span class="text-slate-200">Цена:</span>
        <span class="font-bold">{{ price }} uan.</span>
      </div>
      <img @click="addCard" :src="!isAdded ? '/img/plus.svg' : '/img/checked.svg'" alt="Plus" />
    </div>
  </div>
</template>
