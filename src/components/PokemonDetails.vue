<!-- PokemonDetails.vue -->
<template>
  <div class="flex flex-wrap justify-center items-center bg-pokemon m-12 rounded py-4">
    <!-- Imagen en el lado izquierdo -->
    <div class="w-full sm:w-1/2 lg:w-1/3 mb-4 sm:mb-0 ">
      <img :src="pokemon.image" :alt="pokemon.name" class="h-40 w-auto mx-auto sm:center duration-300 hover:-translate-y-1 hover:scale-110" />
    </div>

    <!-- Detalles en el lado derecho -->
    <div class="w-full sm:w-1/2 lg:w-2/3 p-5">
      <h2 class="my-3 text-center font-semibold text-3xl">{{ pokemon.name.toUpperCase() }}</h2>
      <div>
        <strong>Número:</strong> {{ pokemon.id }}<br />
        <strong>Peso:</strong> {{ formatNumber(pokemon.weight, 1) }} kg<br />
        <strong>Altura:</strong> {{ formatNumber(pokemon.height, 1) }} m<br />
        <strong>Experiencia base:</strong> {{ pokemon.experience }}<br />
        <strong>Habilidades:</strong>
        <p class="pl-4">{{ formatText(pokemon.abilities) }}</p>
        <strong>Tipos:</strong>
        <p class="pl-4">{{ formatText(pokemon.types) }}</p>
        <strong>Estadísticas:</strong>
        <ul class=" bg-red-100 p-1 rounded">
          <li v-for="stat in pokemon.stats" :key="stat.name" class="pl-4">
            <div class="flex items-center">
              <span>{{ formatName(stat.name) }}:</span>
              <div class="w-2/4 ml-5 mr-6 hidden sm:block">
                <div class="bg-gray-300 h-4 relative">
                  <div :style="{ width: stat.baseStat + '%' }" class="bg-blue-500 h-full"></div>
                </div>
              </div>
              <div class="w-1/4 text-start ml-5">{{ stat.baseStat }} %</div>
            </div>
            <hr class="sm:w-11/12 border-gray-400 my-1 w-11/12">
          </li>
        </ul>
      </div>
    </div>
    <RouterLink to="/" class="button m-5 bg-blue-300 hover:bg-blue-400 p-2 rounded">Volver al inicio</RouterLink>
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
    formatText(list) {
      return list.map(item => item.name.replace(/-/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())).join(', ');
    },
    formatName(name) {
      return name.replace(/-/g, ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  },
    formatNumber(value, decimals = 0) {
      return (value / Math.pow(10, decimals)).toFixed(decimals).replace('.', ',');
    },
    async fetchPokemonDetails() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
        this.pokemon = {
          id: response.data.id,
          name: response.data.name,
          weight: response.data.weight,
          height: response.data.height,
          image: response.data.sprites.front_default,
          experience: response.data.base_experience,
          abilities: response.data.abilities.map((ability) => ({
            name: ability.ability.name,
          })),
          types: response.data.types.map((type) => ({
            name: type.type.name,
          })),
          stats: response.data.stats.map(stat => ({
            name: stat.stat.name,
            baseStat: stat.base_stat,
          })),
        };
      } catch (error) {
        console.error('Error al obtener detalles del Pokémon:', error);
      }
    },
  },
  created() {
    this.fetchPokemonDetails();
  },
};
</script>

<style>
.bg-pokemon{
  background-image: linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%);
}
</style>
