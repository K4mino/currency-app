<script setup lang="ts">
import { ref } from 'vue';

const searchType = ref('fullname')
const emit = defineEmits(['search'])

const search = (e: Event) => {
    emit('search', e.target?.value,searchType.value)
}
</script>

<template>
    <div>
        <input placeholder="Search" @input="search" type="text">
        <select name="filter" id="" v-model="searchType">
            <option value="fullname">Full name</option>
            <option value="title">Code</option>
        </select>
    </div>
</template>