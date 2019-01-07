import * as React from 'react';
import { TodoItem } from './TodoItem';

export interface TodoListProps {
  items: any
}

export interface TodoListState {
  items: any,
  deleted: boolean
}

export class TodoList extends React.Component <TodoListProps, TodoListState> {

  public state: TodoListState;

  constructor(props: any) {
    super(props);

    this.state = {
      items: this.props.items,
      deleted: false
    };

    this.removeTodo = this.removeTodo.bind(this);
  }

  addItem(e: any) {
    e.preventDefault(e);
    
    let currentItems = this.state.items;
    let textBox = e.target.previousElementSibling;

    if (textBox.value) {
      currentItems.push(textBox.value);
      textBox.value = "";

      this.setState({
        items: currentItems
      });
    }
  }

  removeTodo(e: any) {
    // event.preventDefault();

    let currentItem = e.target.textContent;
    let updatedItems = this.state.items.filter((item: string) => {
      return currentItem !== item;
    });

    // let updatedItems = this.state.items.filter((item:any) => item !== name);

    this.setState({
      items: updatedItems
    });

    !this.state.deleted && this.setState({
      deleted: true
    })
  }

  render() {
    let cssTaskItem = "task-item";
    let taskItems = this.state.items.map((task:string, i:number) => {
      return <li onClick={this.removeTodo.bind(this)}
      className={cssTaskItem} 
      key={cssTaskItem + i}>{task}</li>;
    });
    return <div className="todoListMain">
      <div className="header">
        <form onSubmit={this.addItem}>
          <input type="text"
          placeholder="Enter task"
          />
          <button onClick={this.addItem.bind(this)}>Add</button>
        </form>
        {/* <TodoItem items={this.state.items} removeTodo={this.removeTodo}/> */}
        <div>{taskItems}</div>
      </div>
    </div>
  }
}