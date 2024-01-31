// Import global styles for the application
import './assets/styles.css'

// Import createApp function from Vue
import { createApp } from 'vue'

// Import the root component (App.vue) and the router instance
import App from './App.vue'
import router from './router'

// Create a Vue app instance
const app = createApp(App)

// Use the router instance in the app
app.use(router)

// Mount the app on the element with the id 'app' in the HTML file
app.mount('#app')

