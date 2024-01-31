import { createRouter, createWebHistory } from 'vue-router'

// Create a Vue Router instance with web history mode
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),  
  // Define the route for the home view
  routes: [
    {
      path: '/',
      name: 'home',
      // Use dynamic import for lazy loading of the HomeView component
      component: () => import ('../views/HomeView.vue')
    }
  ]
})

// Export the router instance
export default router