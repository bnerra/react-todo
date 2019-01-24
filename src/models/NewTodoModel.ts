import TodoItems from './TodoItemModel';

export default interface NewTodo {
  id?: number,
  title?: string,
  summary?: string,
  isComplete?: boolean,
  createdAt?: string,
  updatedAt?: string,
}
// export default interface NewTodo {
//   id?: number,
//   title?: string,
//   createdAt?: string,
//   updatedAt?: string,
//   todoItems?: new TodoItems[]
// }