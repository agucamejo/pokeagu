<template>
  <!-- Application title -->
  <h1 class="text-3xl my-4 text-center ">Lista de Pokémon</h1>
  <!-- Sorting buttons -->
  <div class="flex gap-5 justify-center flex-wrap">
    <button @click="toggleSorting('weight')" class="button bg-slate-300 hover:bg-slate-400 p-2 rounded">
      Ordenar por peso
      <i :class="[sortByProperty === 'weight' ? (sortOrder ? 'arrow-up' : 'arrow-down') : '']"></i>
    </button>
    <button @click="toggleSorting('id')" class="button bg-slate-300 hover:bg-slate-400 p-2 rounded">
      Ordenar por número
      <i :class="[sortByProperty === 'id' ? (sortOrder ? 'arrow-up' : 'arrow-down') : '']"></i>
    </button>
    <button @click="toggleSorting('height')" class="button bg-slate-300 hover:bg-slate-400 p-2 rounded">
      Ordenar por altura
      <i :class="[sortByProperty === 'height' ? (sortOrder ? 'arrow-up' : 'arrow-down') : '']"></i>
    </button>
  </div>

  <!-- Pokemon list -->
  <div class="flex justify-center flex-wrap">
    <ul>
      <router-link v-for="pokemon in sortedPokemons" :key="pokemon.id" :to="{ name: 'pokemon-details', params: { id: pokemon.id } }">
        <li class="bg-white hover:bg-red-100 p-4 rounded shadow-md flex items-center my-4">
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
    // Format number to show the corrects decimals
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
    },
  },
  
  // Lifecycle hook to fetch Pokemon data when the component is created
  created() {
    this.fetchPokemon();
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