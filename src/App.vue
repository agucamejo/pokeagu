<script setup>
  // Importing the RouterView component from vue-router for rendering the current route's component
  import { RouterView } from 'vue-router';
</script>

<template>
  <!-- Application logo -->
  <div class="grid justify-center"> 
    <img src="./assets/images/pokeagu-logo.png" alt="Pokeagu logo" class="w-60 mt-4">
  </div>
  <!-- Render the current route's component using RouterView -->
  <RouterView />
</template>
