<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCurrencyStore } from '@/stores/currencyStore';
import CurrencyCard from '@/components/CurrencyCard.vue';


const currencyStore = useCurrencyStore();
const { toggleFavorite } = currencyStore;
const { favoriteItems } = storeToRefs(currencyStore);

</script>

<template>
  <div class="favorites">
    <CurrencyCard
      @toggleFavorite="toggleFavorite"
      v-for="item in favoriteItems" 
      :key="item.title" 
      :item="item" 
      v-if="favoriteItems.length"/>
    <div v-else>There is no data</div>
</div>
</template>

<style>
.favorites {
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}
</style>
