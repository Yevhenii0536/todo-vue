import { TodoItemModel } from "@/components/Todos";
interface TodosComposition {
  getTodosFromLocalStorage: () => TodoItemModel[]
  updateTodosInLocalStorage: (todos: TodoItemModel[]) => void
}

const TODOS = 'todos'

export function useTodos(): TodosComposition {
  const getTodosFromLocalStorage = () => {
    const todosFromStorage = localStorage.getItem(TODOS)

    if (todosFromStorage) {
      return JSON.parse(todosFromStorage)
    } else {
      return []
    }
  }

  const updateTodosInLocalStorage = (todos: TodoItemModel[]) => {
    const todosToJSON = JSON.stringify(todos)

    localStorage.setItem(TODOS, todosToJSON)
  }

  return {
    getTodosFromLocalStorage,
    updateTodosInLocalStorage,
  }
}
