import { ref, computed, reactive } from 'vue';
import { defineStore } from 'pinia';
import { useCurrencyStore } from './currencyStore';
import type { Item } from '@/stores/currencyStore';
import { storeToRefs } from 'pinia';

export const useFilterStore = defineStore('filter', () => {
  const searchValue = reactive({
        value: '',
        type: 'fullname'
      });
  const activePage = ref(1);

  const currencyStore = useCurrencyStore();
  const { items } = storeToRefs(currencyStore);
  const itemsPerPage = 5;

  const pageCount = computed(() =>
    Math.ceil(filteredItems.value.length/itemsPerPage)
  );

  const filteredItems = computed(() => {
    return items.value.filter((item: Item) => {
      return item[searchValue.type].toLowerCase().includes(searchValue.value.toLowerCase());
    });
  });
  
  const activePageData = computed(() => {
    const startIndex = (activePage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems.value.slice(startIndex, endIndex) 
  });

  const handleSearch = (value: string, type: string) => {
    searchValue.value = value
    searchValue.type = type
    activePage.value = 1
  }

  const handleChangePage = (page: number) => {
    activePage.value = page
}

  return { searchValue, activePageData, filteredItems, activePage, handleSearch, handleChangePage,pageCount };
});
