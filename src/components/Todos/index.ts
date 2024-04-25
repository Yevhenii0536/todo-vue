export interface TodoItemModel {
  id: string
  title: (number | string)
  isCompleted: boolean
  createdAt: string
}

export enum TodoListFilterEnum {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}