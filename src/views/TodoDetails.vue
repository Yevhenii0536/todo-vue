<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, onMounted, ref, watch } from "vue";
import { useTodos } from "@/composables/todo/useTodo";
import { TodoItemModel } from "@/components/Todos";


const { getTodosFromLocalStorage, getTodoById, updateTodosInLocalStorage } = useTodos()
const router = useRouter()
const todoId = computed(() => router.currentRoute.value.params.id as string)
const currentTodo = ref<TodoItemModel | null>(getTodoById(todoId.value))
const isTodoCompleted = ref<boolean>(currentTodo.value.isCompleted)
const isEditing = ref<boolean>(false)
const editedTitle = ref<string>(currentTodo.value.title)

onMounted(() => {
  const todoId = router.currentRoute.value.params.id as string;

  currentTodo.value = getTodoById(todoId)
})

watch(currentTodo.value, (newVal) => {
  isTodoCompleted.value = newVal.isCompleted
  editedTitle.value = newVal.title
})

function completeTodo() {
  isTodoCompleted.value = !isTodoCompleted.value

  const todos: TodoItemModel[] = getTodosFromLocalStorage()
  const todo = todos.find(td => td.id === currentTodo.value.id)

  todo.isCompleted = isTodoCompleted.value

  updateTodosInLocalStorage(todos)
}

function deleteTodo() {
  let todos: TodoItemModel[] = getTodosFromLocalStorage()
  todos = todos.filter(td => td.id !== currentTodo.value.id)

  updateTodosInLocalStorage(todos)
}

function turnOnEditMode() {
  isEditing.value = true
}

function turnOffEditMode() {
  isEditing.value = false;
}

function saveTitle() {
  const todos: TodoItemModel[] = getTodosFromLocalStorage()
  const todo = todos.find(td => td.id === currentTodo.value.id)

  if (todo) {
    todo.title = editedTitle.value
    currentTodo.value = { ...todo }
    updateTodosInLocalStorage(todos)
    isEditing.value = false
  }
}
</script>

<template>
  <div class="todo-details">
    <router-link to="/">
      &lt; Back
    </router-link>

    <div class="todo-details__title">
      <input :checked="currentTodo?.isCompleted" type="checkbox" @change="completeTodo">
      <textarea
        v-if="isEditing"
        v-model="editedTitle"
      />
      <span v-else>{{ currentTodo?.title }}</span>
    </div>

    <div class="todo-details__actions" v-if="isEditing">
      <button @click="saveTitle">Save</button>
      <button @click="turnOffEditMode">Cancel</button>
    </div>

    <div class="todo-details__info">
      Created at:  {{ new Date(currentTodo?.createdAt).toLocaleString() }}

      <div>
        <router-link to="/" @click="deleteTodo">
          Delete
        </router-link>
        <button @click="turnOnEditMode">
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.todo-details {
  & > a {
    color: gray;
  }

  &__actions {
    display: flex;
    gap: 10px;
    margin: 20px 0;

    button {
      padding: 5px 10px;
      border: none;
      border-radius: 5px;
      background: none;
      color: black;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #45a049;
      }
    }

    button:nth-child(1) {
      background: lightblue;
    }

    button:nth-child(2) {
      background: lightcoral;
    }
  }

  &__title {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    color: black;
    margin-top: 56px;
    font-size: 40px;

    & > textarea {
      margin-top: 10px;
      width: 100%;
    }

    & > input {
      position: relative;
      margin-right: 15px;
      width: 25px;
      height: 25px;
      appearance: none;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 25px;
        height: 25px;
        background-color: white;
        border: 2px solid gray;
        border-radius: 4px;
      }

      &:checked::before {
        background-color: gray;
      }

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg) scaleX(-1);
        width: 10px;
        height: 5px;
        border: solid white;
        border-width: 0 2px 2px 0;
        opacity: 0;
      }

      &:checked::after {
        opacity: 1;
        background-color: gray;
      }
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    color: gray;

    & > div {
      display: flex;
      align-items: center;
    }

    & > div a {
      color: red;
      text-decoration: underline;
    }

    & > div button {
      padding-top: 2px;
      background: none;
      border: none;
      color: black;
      text-decoration: underline;
    }
  }

  width: 100%;
  height: 100%;
  padding: 40px 0;
}
</style>


