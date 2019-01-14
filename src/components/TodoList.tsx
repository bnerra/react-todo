import * as React from 'react';
import Todo from '../models/Todo'
import { Utils } from "../utils";
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
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);

    this.removeTodo = this.removeTodo.bind(this);
  }

  public handleChange(event: React.SyntheticEvent<{name: string, value: string}>) {
    event.preventDefault();
    this.setState({...this.state, [event.currentTarget.name]: event.currentTarget.value })
  }

  public addTodo(e: any) {

    e.preventDefault();

    this.state.todos.push({
      id: Utils.uuid(),
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
  }

  public updateTodo(obj: any, index: number) {
    this.state.todos[index] = {
      id: this.state.todos[index].id,
      title: obj.title,
      summary: obj.summary
    }
  }

  public removeTodo(index: number) {
    this.state.todos.splice(index, 1);

    this.setState({
      todos: this.state.todos
    })
    console.log(this.state.todos);
  }

  render() {
    let taskItems = this.props.todos.map((item:any, index: number) => {
      return (
        <TodoItem key={item.id} title={item.title} summary={item.summary} completed={item.done} id={item.id} update={(obj: any) => this.updateTodo(obj, index)} remove={() => this.removeTodo(index)}/>
      )
    });
    return (
      <div className="todoListMain">
        <div className="header">
          <h3>Add New Todo:</h3>
          <form>
            <label>Title:</label><input type="text" name="addTodoTitle" value={this.state.addTodoTitle} onChange={this.handleChange} placeholder="Enter task"/>
            <label>Description</label><textarea name="addTodoSummary" value={this.state.addTodoSummary} onChange={this.handleChange}></textarea>
            <button onClick={this.addTodo}>Add</button>
          </form>
          <ul>{taskItems}</ul>
        </div>
      </div>
    )
  }
}