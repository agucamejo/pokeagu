<template>
  <!-- Application title -->
  <h2 class="my-3 text-center font-bold text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Lista de Pokémon</span></h2>
  
  <!-- Sorting buttons -->
  <div class="flex rounded-md shadow-sm justify-center">
    <!-- By weight -->
    <button @click="toggleSorting('weight')" class="px-4 py-2 text-sm font-medium border  rounded-s-lg bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white">
      Ordenar por peso
      <i :class="[sortByProperty === 'weight' ? (sortOrder ? 'arrow-up' : 'arrow-down') : '']"></i>
    </button>

    <!-- By number or id-->
    <button @click="toggleSorting('id')" class="px-4 py-2 text-sm font-medium border-t border-b bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white">
      Ordenar por número
      <i :class="[sortByProperty === 'id' ? (sortOrder ? 'arrow-up' : 'arrow-down') : '']"></i>
    </button>

    <!-- By height -->
    <button @click="toggleSorting('height')" class="px-4 py-2 text-sm font-medium border rounded-e-lg bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white">
      Ordenar por altura
      <i :class="[sortByProperty === 'height' ? (sortOrder ? 'arrow-up' : 'arrow-down') : '']"></i>
    </button>
  </div>

  <!-- Pokemon list -->
  <div class="flex justify-center flex-wrap">
    <ul>
      <!-- Displaying a list of Pokemon with dynamic routing to details page -->
      <router-link v-for="pokemon in sortedPokemons" :key="pokemon.id" :to="{ name: 'pokemon-details', params: { id: pokemon.id } }">
        <li class="bg-slate-200 duration-500 hover:bg-yellow-100 p-4 rounded flex items-center my-4 animate__animated  animate__fadeIn transform transition-transform hover:scale-105">
          <div class="grid justify-items-center mr-5">
            <img :src="pokemon.image" :alt="pokemon.name" class="w-30 h-auto" />
            <strong class="text-xl">{{ pokemon.name.toUpperCase() }}</strong><br />
          </div>
          <div class="ml-auto">
            Número: {{ pokemon.id }}<br />
            Peso: {{ formatNumber(pokemon.weight , 1) }} kg<br />
            Altura: {{ formatNumber(pokemon.height, 1) }} m
          </div>
        </li>
      </router-link>
    </ul>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      pokemons: [],
      sortOrder: false,
      sortByProperty: '',
    };
  },
  computed: {
    // Computed property for sorted pokemons based on current sorting criteria
    sortedPokemons() {
      return this.pokemons.slice().sort(this.getCompareFunction());
    },
  },
  methods: {
    // Format number to show the correct decimals
    formatNumber(value, decimals = 0) {
      return (value / Math.pow(10, decimals)).toFixed(decimals).replace('.', ',');
    },

    // Toggle sorting order and criteria
    toggleSorting(column) {
      if (this.sortByProperty === column) {
        this.sortOrder = !this.sortOrder;
      } else {
        this.sortByProperty = column;
        this.sortOrder = true;
      }
    },

    // Get compare function based on current sorting criteria and order
    getCompareFunction() {
      const order = this.sortOrder ? 1 : -1;

      return (a, b) => {
        const valueA = a[this.sortByProperty];
        const valueB = b[this.sortByProperty];

        if (valueA < valueB) {
          return -1 * order;
        } else if (valueA > valueB) {
          return 1 * order;
        } else {
          return 0;
        }
      };
    },

    // Fetch Pokemon data from the PokeAPI
    async fetchPokemon() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
          params: {
            limit: 10,
          },
        });

        this.pokemons = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
              id: details.data.id,
              name: details.data.name,
              weight: details.data.weight,
              height: details.data.height,
              image: details.data.sprites.front_default,
            };
          })
        );
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        throw error; // Re-throw the error for potential handling in parent component
      }
    },
  },

  // Lifecycle hook to fetch Pokemon data when the component is created
  async created() {
    await this.fetchPokemon();
  },
};
</script>

<style>
/* Arrow-up icon */
.arrow-up::after {
  content: '\2191';
}

/* Arrow-down icon */
.arrow-down::after {
  content: '\2193';
}
</style>