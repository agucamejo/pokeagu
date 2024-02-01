<!-- PokemonDetails.vue -->
<template>
  <!-- Main container for Pokemon details -->
  <div class="flex flex-wrap justify-center items-center bg-slate-800 text-white m-12 rounded py-4 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] animate__animated  animate__fadeIn">
    <!-- Main container for Pokemon details -->
    <div class="w-full sm:w-1/2 lg:w-1/3 mb-2 sm:mb-0 ">
      <img :src="pokemon.image" :alt="pokemon.name" class="h-40 w-auto mx-auto sm:center duration-300 hover:-translate-y-1 hover:drop-shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:scale-110" />
    </div>

    <!-- Right side with Pokemon details -->
    <div class="w-full sm:w-1/2 lg:w-2/3 p-5 ">
      <h2 class="my-3 text-center font-bold text-4xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{{ pokemon.name.toUpperCase() }}</span></h2>
      <div>
        <!-- Displaying Pokemon details -->
        <p class="pb-1"><strong>Número:</strong> {{ pokemon.id }}</p>
        <p class="pb-1"><strong>Peso:</strong> {{ formatNumber(pokemon.weight, 1) }} kg</p>
        <p class="pb-1"><strong>Altura:</strong> {{ formatNumber(pokemon.height, 1) }} m</p>
        <p class="pb-1"><strong>Experiencia base:</strong> {{ pokemon.experience }}</p>
        <p class="pb-1"><strong>Habilidades:</strong> {{ formatText(pokemon.abilities) }}</p>
        <p class="pb-1"><strong>Tipos:</strong> {{ formatText(pokemon.types) }}</p>
        <strong>Estadísticas:</strong>
        <!-- Displaying Pokemon statistics -->
        <ul class=" bg-slate-600 p-1 rounded">
          <li v-for="stat in pokemon.stats" :key="stat.name" class="pl-4">
            <div class="flex items-center">
              <p>{{ formatName(stat.name) }}:</p>
              <div class="w-2/4 ml-5 mr-6 pr-5 hidden sm:block">
                <div class="rounded bg-gray-300 h-4 relative">
                  <div :style="{ width: stat.baseStat + '%' }" class="rounded-s bg-blue-500 h-full"></div>
                </div>
              </div>
              <div class="w-1/4 ml-1">{{ stat.baseStat }} %</div>
            </div>
            <hr class="sm:w-11/12 border-gray-400 my-1 w-11/12">
          </li>
        </ul>
      </div>
    </div>
    <!-- Link to go back to the home page -->
    <RouterLink to="/" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Volver al inicio</RouterLink>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'],
  data() {
    return {
      pokemon: {},
    };
  },
  methods: {
    // Format an array of names into a comma-separated string
    formatText(list) {
      return list.map(item => this.formatName(item.name)).join(', ');
    },
    // Format a name by replacing dashes, making it title case
    formatName(name) {
      return name.replace(/-/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    },
    // Format a number with specified decimals and formatting
    formatNumber(value, decimals = 0) {
      return (value / Math.pow(10, decimals)).toFixed(decimals).replace('.', ',');
    },
    // Fetch Pokemon details from the PokeAPI
    async fetchPokemonDetails() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
        const abilities = response.data.abilities.map(ability => ({ name: this.formatName(ability.ability.name) }));
        const types = response.data.types.map(type => ({ name: this.formatName(type.type.name) }));
        const stats = response.data.stats.map(stat => ({
          name: this.formatName(stat.stat.name),
          baseStat: stat.base_stat,
        }));

        // Set the Pokemon details in the component's data
        this.pokemon = {
          id: response.data.id,
          name: this.formatName(response.data.name),
          weight: response.data.weight,
          height: response.data.height,
          image: response.data.sprites.front_default,
          experience: this.formatNumber(response.data.base_experience),
          abilities,
          types,
          stats,
        };
      } catch (error) {
        console.error('Error al obtener detalles del Pokémon:', error);
        throw error;
      }
    },
  },
  // Fetch Pokemon details when the component is created
  async created() {
    await this.fetchPokemonDetails();
  },
};
</script>