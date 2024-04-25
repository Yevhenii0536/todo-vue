<script setup lang="ts">
import { ref  } from 'vue'
import { v4 as uuidv4 } from 'uuid';
import { TodoItemModel } from "@/components/Todos";
import { useTodos } from "@/composables/todo/useTodo";

const { getTodosFromLocalStorage, updateTodosInLocalStorage } = useTodos()
const myValue = ref<string>('')
const todos = ref<TodoItemModel[]>(getTodosFromLocalStorage())
const todoContainer = ref<HTMLElement | null>(null)

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

  updateTodos()
}

function completeTodo(todoId: string, isCompleted: boolean) {
  const todo = todos.value.find(todo => todo.id === todoId)

  if (todo) {
    todo.isCompleted = isCompleted

    updateTodos()
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

      <div ref="todoContainer" class="todo">
        <transition-group name="todo-item" tag="div" class="todo-list">
          <todo-list-item
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            :is-completed="todo.isCompleted"
            @deleteTodo="deleteTodo"
            @completeTodo="completeTodo"
          />
        </transition-group>

        <div v-if="todos.length === 0" class="todo-list__empty">
          <span>Todo list is empty...</span>
        </div>
      </div>
    </div>


    <todo-input
      :value="myValue"
      type="text"
      name="todo-input"
      placeholder="Enter your new ToDo..."
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
      margin-top: 30px;
    }
  }

  &-input {
    position: absolute; bottom: 30px;
  }
}
</style>