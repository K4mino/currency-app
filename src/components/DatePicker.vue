<script setup lang="ts">
import { ref } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['update-date']);
const selectedDate = ref('');

const handleDateChange = () => {
  emit('update-date', selectedDate.value);
};
</script>

<template>
  <div class="date-picker">
    <label for="date">Select Date: </label>
    <input type="date" v-model="selectedDate" @change="handleDateChange" />
  </div>
</template>

<style scoped>
.date-picker {
  margin-bottom: 20px;
}
</style>
