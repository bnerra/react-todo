export default interface NewTodo {
  id: number,
  title: string,
  createdAt: string,
  updatedAt: string,
  todoItems: {
    id: number,
    content: string,
    complete: boolean,
    createdAt: string,
    updatedAt: string,
    todoId: number
  }
}