<script setup>
  // Importing the RouterView component from vue-router for rendering the current route's component
  import { RouterView } from 'vue-router';
</script>

<template>
  <!-- Application title -->
  <h1 class="text-3xl my-4 text-center">PokeAgu</h1>

  <!-- Render the current route's component using RouterView -->
  <RouterView />
</template>
