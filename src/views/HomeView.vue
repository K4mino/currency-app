<script setup lang="ts">
import {onMounted, watchEffect} from 'vue'
import { Item, useCurrencyStore } from '../stores/currencyStore';
import CurrencyCard from '@/components/CurrencyCard.vue';
import Pagination from '@/components/Pagination.vue';
import DatePicker from '@/components/DatePicker.vue';
import Filter from '@/components/Filter.vue';
import { useFilterStore } from '@/stores/filterStore';
import { storeToRefs } from 'pinia'

const currencyStore = useCurrencyStore();
const { fetchData,toggleFavorite,updateRateDate } = currencyStore;
const { rateDate } = storeToRefs(currencyStore);

const filterStore = useFilterStore();
const { filteredItems , activePage , pageCount, activePageData, } = storeToRefs(filterStore);
const { handleSearch, handleChangePage} = filterStore

onMounted(async () => {
    await fetchData()
})
</script>

<template>
  <main class="home">
    <h2>Rate date: {{rateDate}}</h2>
    <Filter @search="handleSearch"/>
    <DatePicker @update-date="updateRateDate"/>
    <div class="currency-cards" v-if="filteredItems.length">
      <CurrencyCard 
        @toggleFavorite="toggleFavorite" 
        v-for="item in activePageData" 
        :key="item.title" 
        :item="item"/>
    </div>
    <h2 v-else>No data found</h2>
    <Pagination 
      @changePage="handleChangePage" 
      :pageCount="pageCount" 
      :currentPage="activePage"/>
  </main>
</template>

<style scoped>
.home {
  padding: 0 20px;
}
.currency-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  min-height: 400px;
}
</style>