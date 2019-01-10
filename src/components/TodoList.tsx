import * as React from 'react';
import Todo from '../models/Todo'
import { TodoItem } from './TodoItem';

export interface TodoListProps {
  todos: Todo[]
}

export interface TodoListState {
  todos: any,
  deleted: boolean
}

export class TodoList extends React.Component <TodoListProps, TodoListState> {

  public state: TodoListState;

  constructor(props: any) {
    super(props);

    this.state = {
      todos: this.props.todos,
      deleted: false
    };

    this.removeTodo = this.removeTodo.bind(this);
  }

  addItem(e: any) {
    e.preventDefault(e);
    
    let currentItems = this.state.todos;
    let textBox = e.target.previousElementSibling;

    if (textBox.value) {
      currentItems.push(textBox.value);
      textBox.value = "";

      this.setState({
        todos: currentItems
      });
    }
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
    let taskItems = this.props.todos.map((item:any) => {
      // return (<TodoItem title={item.title} summary={item.summary} completed={item.done}/>)
      return (
        <TodoItem title={item.title} summary={item.summary} completed={item.done} id={item.id}/>
      )
    });
    return <div className="todoListMain">
      <div className="header">
        <form onSubmit={this.addItem}>
          <input type="text"
          placeholder="Enter task"
          />
          <button onClick={this.addItem.bind(this)}>Add</button>
        </form>
        {/* <TodoItem data={this.state.data} removeTodo={this.removeTodo}/> */}
        <div>{taskItems}</div>
      </div>
    </div>
  }
}