<script setup>

defineProps({
  id: Number,
  title: String,
  img: String,
  price: Number,
  isFavorite:Boolean,
  isAdded:Boolean,
  clickToFavorite:Function,
  addCart:Function,
});

const baseUrl = import.meta.env.VITE_BASE_URL


</script>

<template>
  <div
    class="flex-grow-0 flex-shrink-0 basis-1/4 relative flex flex-col w-full border border-slate-100 rounded-xl p-5 cursor-pointer transition hover:shadow-xl hover:transform hover:-translate-y-2"
  >
    <div @click="clickToFavorite" class="absolute top-8 left-8">
      <img :src="!isFavorite ? `${baseUrl}img/like-1.svg` : `${baseUrl}img/like-2.svg`" alt="Favorite" />
    </div>
    <img :src="`${baseUrl}img/${img}`" class="w-full" alt="Sneaker" />
    <p>{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col gap-2">
        <span class="text-slate-200">{{ $t('price') }}:</span>
        <span class="font-bold">{{ price }} uan.</span>
      </div>
      <img @click="addCart" :src="!isAdded ? `${baseUrl}img/plus.svg` : `${baseUrl}img/checked.svg`" alt="Plus" />
    </div>
  </div>
</template>
