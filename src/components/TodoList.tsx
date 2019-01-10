import * as React from 'react';
import Todo from '../models/Todo'
import { TodoItem } from './TodoItem';

export interface TodoListProps {
  todos: Todo[]
}

export interface TodoListState {
  todos: any,
  addTodoTitle: string,
  addTodoSummary: string,
  deleted: boolean
}

export class TodoList extends React.Component <TodoListProps, TodoListState> {

  public state: TodoListState;

  constructor(props: any) {
    super(props);

    this.state = {
      todos: this.props.todos,
      addTodoTitle: '',
      addTodoSummary: '',
      deleted: false
    };
    this.addTodoTitleChange = this.addTodoTitleChange.bind(this);
    this.addTodoSummaryChange = this.addTodoSummaryChange.bind(this);
    this.addTodo = this.addTodo.bind(this);

    this.removeTodo = this.removeTodo.bind(this);
  }

  public addTodoTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      addTodoTitle: event.target.value
    });
  }

  public addTodoSummaryChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      addTodoSummary: event.target.value
    });
  }

  public addTodo(e: any) {

    e.preventDefault();

    this.state.todos.push({
      id: this.state.todos[this.state.todos.length - 1].id +1,
      title: this.state.addTodoTitle,
      summary: this.state.addTodoSummary,
      done: false
    });

    this.setState({
      todos: this.state.todos,
      addTodoTitle: '',
      addTodoSummary: ''
    });

    console.log(this.state.todos);
    // e.preventDefault(e);
    
    // let currentItems = this.state.todos;
    // let textBox = e.target.previousElementSibling;

    // if (textBox.value) {
    //   currentItems.push(textBox.value);
    //   textBox.value = "";

    //   this.setState({
    //     todos: currentItems
    //   });
    // }
  }

  removeTodo(e: any) {
    // event.preventDefault();

    let currentItem = e.target.textContent;
    let updatedItems = this.state.todos.filter((item: string) => {
      return currentItem !== item;
    });

    // let updatedItems = this.state.items.filter((item:any) => item !== name);

    this.setState({
      todos: updatedItems
    });
    console.log(this.state.todos);

    !this.state.deleted && this.setState({
      deleted: true
    })
  }

  render() {
    let cssTaskItem = "task-item";
    let taskItems = this.props.todos.map((item:any, index: number) => {
      // return (<TodoItem title={item.title} summary={item.summary} completed={item.done}/>)
      return (
        <TodoItem key={item.id} title={item.title} summary={item.summary} completed={item.done} id={item.id}/>
      )
    });
    return (
      <div className="todoListMain">
        <div className="header">
          <h3>Add New Todo:</h3>
          <form>
            <label>Title:</label><input type="text" value={this.state.addTodoTitle} onChange={this.addTodoTitleChange} placeholder="Enter task"/>
            <label>Description</label><textarea value={this.state.addTodoSummary} onChange={this.addTodoSummaryChange}></textarea>
            <button onClick={this.addTodo}>Add</button>
          </form>
          <ul>{taskItems}</ul>
        </div>
      </div>
    )
  }
}