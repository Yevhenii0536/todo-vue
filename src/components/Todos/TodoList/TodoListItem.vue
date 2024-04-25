<script setup lang="ts">
import { ref } from 'vue'
import { TodoItemModel } from "@/components/Todos"
import { useRouter } from "vue-router"

const props = defineProps<{
  todo: TodoItemModel
}>()

const router = useRouter()
const emit = defineEmits(['deleteTodo', 'completeTodo'])
const isChecked = ref<boolean>(props.todo.isCompleted)

const toggleComplete = () => {
  isChecked.value = !isChecked.value
  emit('completeTodo', props.todo.id, isChecked.value)
}

const goToTodoDetails = () => {
  router.push({ name: 'todo-details', params: { id: props.todo.id } })
}
</script>

<template>
  <div
    class="todo-item"
    :class="{ 'todo-item-completed': props.todo.isCompleted }"
    @click.stop.prevent="goToTodoDetails"
  >
    <div class="todo-item__title">
      <input
        type="checkbox"
        :checked="props.todo.isCompleted"
        @change.stop.prevent="toggleComplete"
        @click.stop
      >
      <span>
        {{ todo.title }}
      </span>
    </div>
    <img
      class="cursor-pointer"
      src="@/assets/trash.svg"
      alt="trash"
      @click.stop.prevent="emit('deleteTodo', props.todo.id)"
    >
  </div>
</template>

<style scoped lang="scss">
.todo {
  &-item {
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1);

    &-completed {
      opacity: 0.5;
      color: gray;
      text-decoration: line-through;
    }

    &__title {
      display: flex;

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

      & > span {
        word-wrap: anywhere;
        text-align: justify;
        text-align-last: justify;
        overflow-wrap: anywhere;
        max-width: calc(100% - 25px);
      }
    }

    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding: 12px;
    border-radius: 10px;
    width: 100%;
    min-height: 50px;
    height: auto;
    color: #000;
  }
}
</style>