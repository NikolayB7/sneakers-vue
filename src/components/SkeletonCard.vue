<script setup>

</script>

<template>
  <div
    class="flex-grow-0 flex-shrink-0 basis-1/4 relative flex flex-col w-full border border-slate-100 rounded-xl p-5 cursor-pointer transition hover:shadow-xl hover:transform hover:-translate-y-2"
  >
    <div class="flex items-center justify-center w-full h-48 bg-gray-200 rounded dark:bg-gray-400 mb-4">
      <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
      </svg>
    </div>
    <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-400 w-full mb-4"></div>
    <div class="flex justify-between mt-5 w-full">
      <div class="flex flex-col gap-2 w-[50%]">
        <span class="text-slate-200">Цена:</span>
        <span class="font-bold flex items-center">
           <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-400 w-full mr-3"></div>
          uan.</span>
      </div>
      <img src="/img/plus.svg" alt="Plus" />
    </div>
  </div>
</template>

<style scoped>

</style>