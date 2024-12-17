<script setup>
import Language from '@/components/Language.vue'

const emit = defineEmits(['openDrawer']);
defineProps({
  total:Number
})
</script>

<template>
  <header class="flex justify-between items-center border-b border-slate-200 px-10 py-8">
    <!-- Логотип и название -->
    <RouterLink to="/">
      <div class="flex items-center gap-4">
        <img src="/img/logo.png" alt="Logo" class="w-11" />
        <div>
          <h2 class="font-bold text-xl uppercase">Vue Sneakers</h2>
          <p class="text-slate-400">{{ $t('logo_text') }}</p>
        </div>
      </div>
    </RouterLink>

    <!-- Навигация -->
    <ul class="flex items-center gap-10 ml-auto mr-3">
      <!-- Корзина -->
      <li
        @click="emit('openDrawer')"
        class="flex items-center gap-3 cursor-pointer"
      >
        <img src="/img/cart.svg" alt="Cart" />
        <b>{{ total }} uan.</b>
      </li>
      <!-- Закладки -->
      <RouterLink to="/favorites">
        <li class="flex items-center gap-3 cursor-pointer">
          <img src="/img/heart.svg" alt="Favorite" />
          <span>{{ $t('bookmarks') }}</span>
        </li>
      </RouterLink>
      <!-- Профиль -->
      <li class="flex items-center gap-3 cursor-pointer">
        <img src="/img/profile.svg" alt="Profile" />
        <span>{{ $t('profile') }}</span>
      </li>
    </ul>
    <!--  Language  -->
    <Language/>
  </header>
</template>
