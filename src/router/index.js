import { createRouter, createWebHistory } from 'vue-router'

// Create a Vue Router instance with web history mode
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),  
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
      component: () => import('../components/PokemonDetails.vue'), // Asegúrate de tener este componente creado
      props: true, // Esto permite pasar el parámetro :id como propiedad al componente
    }
  ]
})

// Export the router instance
export default router