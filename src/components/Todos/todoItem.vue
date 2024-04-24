<script setup lang="ts">
defineProps<{
  title: string | number
}>()
</script>

<template>
  <h2>Todo item</h2>
  <p>{{ title }}</p>
</template>



<style scoped>

</style>