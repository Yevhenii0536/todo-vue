<script setup lang="ts">
import { ref } from 'vue';
import { TodoListFilterEnum } from "@/components/Todos";
import { useTodos } from "@/composables/todo/useTodo";

const { setTodosFilterInLocalStorage, getTodosFilterFromLocalStorage } = useTodos()
const emit = defineEmits(['filterTodos']);
const selectedFilter = ref<TodoListFilterEnum>(getTodosFilterFromLocalStorage());

function onFilterSelect(event: Event) {
  const filter = (event.target as HTMLInputElement).value

  setTodosFilterInLocalStorage(filter)
  emit('filterTodos', filter)
}
</script>

<template>
  <div class="W-100 todo-filter">
    <select v-model="selectedFilter" class="W-100" @change="onFilterSelect">
      <option :value="TodoListFilterEnum.ALL">
        All
      </option>
      <option :value="TodoListFilterEnum.COMPLETED">
        Completed
      </option>
      <option :value="TodoListFilterEnum.ACTIVE">
        Active
      </option>
    </select>
  </div>
</template>

<style scoped>
.todo-filter {
  color: black;
  margin-bottom: 20px;
}

select {
  padding: 5px 10px;
  border-radius: 4px;
}
</style>
