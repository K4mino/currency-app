<script setup lang="ts">

const emit = defineEmits(['changePage'])
const props = defineProps({
    pageCount: {
        type: Number,
        required: true
    },
    currentPage: {
        type: Number,
        required: true
    }
})
</script>
<template>
    <div class="pagination">
        <button
        @click="emit('changePage', i)"
        :class="['pagination__button',{'active': props.currentPage === i}]" 
        v-for="i in props.pageCount"
        :key="i"
        >
            {{ i }}
        </button>
    </div>
</template>

<style scoped>

.pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
}

.pagination__button{
    background-color: #fff;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 8px;
    padding: 4px 8px;
}

.pagination__button:hover{
    background-color: #ccc;
}

.pagination__button.active{
    background-color: black;
    color: #fff;
}

</style>