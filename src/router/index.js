import { createRouter, createWebHistory } from 'vue-router'

// Create a Vue Router instance with web history mode
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //Friendly transition to go home view  
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  // Define the route for the home and pokemon's details views
  routes: [
    {
      path: '/',
      name: 'home',
      // Use dynamic import for lazy loading of the HomeView component
      component: () => import ('../views/HomeView.vue')
    },
    {
      path: '/pokemon/:id',
      name: 'pokemon-details',
      component: () => import('../components/PokemonDetails.vue'),
      props: true, 
    }
  ]
})

// Export the router instance
export default router