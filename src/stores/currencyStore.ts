import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { parseItemsXML } from '@/utils/xmlParser'
import  formatDate from '@/utils/formatDate'
import { flags } from '@/utils/constants'

export interface Item {
  title: string;
  rate: number;
  fullname: string;
  isFavorite?: boolean;
  flag?: string;
}


export const useCurrencyStore = defineStore('currency', () => {
  const storedItems = localStorage.getItem('currencyItems');
  const initialItems = storedItems ? JSON.parse(storedItems) as Item[] : [];
  const items = ref<Item[]>(initialItems);

  const storedFavorites = localStorage.getItem('favoriteCurrencyItems');
  const initialFavorites = storedFavorites ? JSON.parse(storedFavorites) as Item[] : [];
  const favorites = ref<Item[]>(initialFavorites);

  const favoriteItems = computed(() => favorites.value);

  const rateDate = ref('30.03.2023');
 
  async function fetchData() {
    try {
      const res = await fetch(`/api/rss/get_rates.cfm?fdate=${rateDate.value}`);
      //const res = await fetch(`https://nationalbank.kz/rss/get_rates.cfm?fdate=30.04.2023`)
      const xmlText = await res.text();
      const parsedItems = parseItemsXML(xmlText)

      parsedItems.forEach(item => {
        item.flag = flags[item.title]
        item.isFavorite = favorites.value.some(fav => fav.title === item.title);
      });

      items.value = parsedItems;

      localStorage.setItem('currencyItems',JSON.stringify(items.value))
    } catch (error) {
      console.log(error) 
    }
  }

  function toggleFavorite(title: string) {
    const item = items.value.find(item => item.title === title);

    if(item) {
      item.isFavorite = !item.isFavorite
      if(item.isFavorite){
        favorites.value.push(item)
      }else{
        favorites.value = favorites.value.filter(favorite => favorite.title !== title)
      }
      localStorage.setItem('favoriteCurrencyItems',JSON.stringify(favorites.value))
      localStorage.setItem('currencyItems',JSON.stringify(items.value))
    }
  }

  async function updateRateDate(date: string) {
    try {
      rateDate.value = formatDate(date)
      await fetchData()
    } catch (error) {
      console.log(error)
    }
  }

  return { fetchData, items, favoriteItems, toggleFavorite, updateRateDate, rateDate }
})
