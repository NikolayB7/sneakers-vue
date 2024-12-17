<script setup>

</script>

<template>
  <div class="locale-changer">
    <select
      v-model="$i18n.locale"
      class=" border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
    >
      <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale.toUpperCase() }}</option>
    </select>
  </div>
</template>

<style scoped>

</style>