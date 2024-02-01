<script setup>
// Importing the RouterView component from vue-router for rendering the current route's component
import { RouterView } from 'vue-router';

// Function for smooth scroll to the top
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// Adding a listener to show/hide the scroll-to-top button
window.addEventListener('scroll', () => {
  const goUpElement = document.querySelector('.go-up');
  if (goUpElement) {
    if (window.scrollY > 0) {
      goUpElement.style.display = 'block';
    } else {
      goUpElement.style.display = 'none';
    }
  }
});
</script>

<template>
  <!-- Application logo -->
  <div class="grid justify-center"> 
    <img src="./assets/images/pokeagu-logo.png" alt="Pokeagu logo" class="w-60 mt-4">
  </div>

  <!-- Scroll-to-top button -->
  <span class="go-up" @click="scrollToTop">
    <svg width="24" height="24" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" fill-rule="evenodd" d="M10.103 7.222c3.447 3.468 5.744 5.764 6.89 6.887c.198.185.539.56 1.046.07c.339-.327.325-.685-.039-1.073l-7.444-7.43a.638.638 0 0 0-.455-.176a.702.702 0 0 0-.472.176l-7.453 7.635c-.241.388-.231.715.03.98c.26.265.577.28.95.043z"/>
    </svg>
  </span>

  <!-- Render the current route's component using RouterView -->
  <transition name="fade" mode="out-in">
    <RouterView />
  </transition>
  
</template>

<style>
/* Transition classes for fade effect */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s; /* Ajusta la duración según tus preferencias */
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Styles for the scroll-to-top button */
.go-up {
	display:none;
	padding:20px;
	background:#024959;
	font-size:20px;
	color:#fff;
	cursor:pointer;
	position: fixed;
	bottom:20px;
	right:20px;
}
</style>