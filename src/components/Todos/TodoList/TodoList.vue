<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {v4 as uuidv4} from 'uuid';
import {TodoItemModel, TodoListFilterEnum} from "@/components/Todos";
import {useTodos} from "@/composables/todo/useTodo";

const {
  getTodosFromLocalStorage,
  deleteTodoFromLocalStorage,
  updateTodosInLocalStorage,
  getTodosFilterFromLocalStorage,
} = useTodos()

const isLoading = ref<boolean>(true)
const myValue = ref<string>('')
const todos = ref<TodoItemModel[]>([])
const todoContainer = ref<HTMLElement | null>(null)

onMounted(() => {
  filterTodos(getTodosFilterFromLocalStorage())

  setTimeout(() => {
    isLoading.value = false
  }, 300)
})

function updateTodos() {
  updateTodosInLocalStorage(todos.value)
}

function addTodo() {
  if (myValue.value) {
    todos.value.push({
      id: uuidv4(),
      title: myValue.value,
      isCompleted: false,
      createdAt: new Date()
    })

    myValue.value = ''
  }

  updateTodos()
}

function deleteTodo(todoId: string) {
  todos.value = todos.value.filter(todo => todo.id !== todoId)

  deleteTodoFromLocalStorage(todoId)
}

function completeTodo(todoId: string, isCompleted: boolean) {
  const todo = todos.value.find(todo => todo.id === todoId)

  if (todo) {
    todo.isCompleted = isCompleted

    updateTodos()
  }
}

function filterTodos(filter: TodoListFilterEnum) {
  const todosFromLocalStorage: TodoItemModel[] = getTodosFromLocalStorage()

  switch (filter) {
    case TodoListFilterEnum.ALL:
      todos.value = [...todosFromLocalStorage]

      return
    case TodoListFilterEnum.COMPLETED:
      todos.value = todosFromLocalStorage.filter(todo => todo.isCompleted)
      return;

    case TodoListFilterEnum.ACTIVE:
      todos.value = todosFromLocalStorage.filter(todo => !todo.isCompleted)
      return;

    default:
      return;
  }
}
</script>

<template>
  <div class="todo-wrapper">
    <div class="W-100 flex column align-center justify-between">
      <img
        alt="logo"
        class="logo"
        src="@/assets/logo.svg"
      />

      <TodoFilter
        :show-active="false"
        :show-completed="false"
        @filter-todos="filterTodos"
      />

      <div v-if="isLoading" class="spinner">
        Loading...
      </div>

      <div v-if="!todos.length && !isLoading" class="todo-list__empty">
        <span>Todo list is empty...</span>
      </div>

      <div v-else ref="todoContainer" class="todo">
        <transition-group name="todo-item" tag="div" class="todo-list">
          <TodoListItem
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            :is-completed="todo.isCompleted"
            @deleteTodo="deleteTodo"
            @completeTodo="completeTodo"
          />
        </transition-group>
      </div>
    </div>

    <todo-input
      :value="myValue"
      type="text"
      name="todo-input"
      placeholder="Enter your new ToDo..."
      @add-todo="addTodo"
      @update:value="newValue => myValue = newValue"
    >
      <template #append>
        <img
          alt="add todo"
          src="@/assets/add.svg"
          @click="addTodo"
        />
      </template>
    </todo-input>
  </div>
</template>

<style scoped lang="scss">
.todo-item-enter-active,
.todo-item-leave-active {
  transition: opacity 0.5s;
}

.todo-item-enter-from,
.todo-item-leave-to {
  opacity: 0;
}

.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 4px;
}

.todo {
  width: 100%;
  max-height: 60vh;
  overflow-y: auto;

  &-wrapper {
    padding-top: 60px;
    padding-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  &-list {
    padding: 5px;
    & > div:not(:last-child) {
      margin-bottom: 15px;
    }

    &__empty {
      color: black;
      margin-top: 30px;
    }
  }

  &-input {
    position: absolute; bottom: 30px;
  }
}
</style>