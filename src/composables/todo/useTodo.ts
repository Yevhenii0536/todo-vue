import { TodoItemModel, TodoListFilterEnum } from "@/components/Todos";

interface TodosComposition {
  getTodosFromLocalStorage: () => TodoItemModel[]
  getTodoById: (todoId: string) => TodoItemModel
  updateTodosInLocalStorage: (todos: TodoItemModel[]) => void
  deleteTodoFromLocalStorage: (todo: string) => void
  setTodosFilterInLocalStorage: (filter: TodoListFilterEnum) => void
  getTodosFilterFromLocalStorage: () => TodoListFilterEnum
}

const TODOS = 'todos'
const TODOS_FILTER = 'todos_filter'

export function useTodos(): TodosComposition {
  const getTodosFromLocalStorage = () => {
    const todosFromStorage = localStorage.getItem(TODOS)

    if (todosFromStorage) {
      return JSON.parse(todosFromStorage)
    } else {
      return []
    }
  }

  const getTodoById = (todoId: string) => {
    const todos: TodoItemModel[] = getTodosFromLocalStorage()
    return todos.find(td => td.id === todoId)
  }

  const deleteTodoFromLocalStorage = (todoId: string) => {
    let todos: TodoItemModel[] = getTodosFromLocalStorage()

    todos = [...todos].filter(todo => todo.id !== todoId)

    updateTodosInLocalStorage(todos)
  }

  const updateTodosInLocalStorage = (todos?: TodoItemModel[]) => {
    const values = todos ? todos : getTodosFromLocalStorage()

    const todosToJSON = JSON.stringify(values)

    localStorage.setItem(TODOS, todosToJSON)
  }

  const setTodosFilterInLocalStorage = (filter: TodoListFilterEnum) => {
    localStorage.setItem(TODOS_FILTER, filter)
  }

  const getTodosFilterFromLocalStorage = () => {
    const filter = localStorage.getItem(TODOS_FILTER)

    return filter ? filter : TodoListFilterEnum.ALL
  }

  return {
    getTodosFromLocalStorage,
    getTodoById,
    deleteTodoFromLocalStorage,
    updateTodosInLocalStorage,
    setTodosFilterInLocalStorage,
    getTodosFilterFromLocalStorage,
  }
}
