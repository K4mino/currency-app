<script setup lang="ts">
import { defineProps } from 'vue'
import type { Item } from '../stores/currencyStore'
import Heart from './icons/Heart.vue'

const props = defineProps<{
  item: Item;
}>();

const emit = defineEmits(['toggleFavorite'])

</script>

<template>
  <div class="currency-card">
    <div class="currency-card__heart" @click="emit('toggleFavorite', props.item.title)">
      <Heart :fill="props.item.isFavorite ? 'red' : 'black'"/>
    </div>
    <div class="currency-card__flag" v-if="props.item.flag">
      <img class="currency-card__image" :src="props.item.flag" :alt="props.item.title">
    </div>
    <h2 class="currency-card__title">{{ props.item.title }}</h2>
    <p class="currency-card__description">{{ props.item.rate }}</p>
    <p class="currency-card__fullname">{{ props.item.fullname }}</p>
  </div>
</template>

<style scoped>
.currency-card {
  position: relative;
  padding: 16px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 300px;
  height: 140px;
  display: flex;
  flex-direction: column;
  margin: 16px;
}

.currency-card__title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.currency-card__description {
  color: #555;
  margin-bottom: 8px;
}

.currency-card__fullname {
  font-size: 14px;
  color: #888;
}

.currency-card__heart {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.currency-card__image {
  max-width: 100%;
  max-height: 100%;
  display: block;
}

.currency-card__flag {
  position: absolute;
  top: 16px;
  left: 72px;
  width: 54px;
  height: 54px;
}

</style>