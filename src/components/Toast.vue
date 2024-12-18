<script setup>
defineProps({
  close:Function,
  getSatic:Function
})
</script>

<template>
  <div id="toast-interactive" class="fixed top-[20%] left-[50%] translate-x-[-50%] w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-600 dark:text-gray-400" role="alert">
    <div class="flex">
      <div class="ms-3 text-sm font-normal">
        <span class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{{ $t('toast.title') }}</span>
        <div class="mb-2 text-sm font-normal">{{ $t('toast.description') }}</div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <a href="#"
               @click="getSatic"
               class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">
              {{ $t('toast.load') }}
            </a>
          </div>
          <div>
            <a href="#"
               @click="close"
               class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
              {{ $t('toast.close') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>