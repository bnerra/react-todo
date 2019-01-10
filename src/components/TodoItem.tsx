import * as React from'react';
import Todo from '../models/Todo'

export interface TodoItemProps {
  title: string,
  summary: string,
  completed: boolean,
  id: number
}

export interface TodoItemState {
  title: string,
  summary: string,
  completed: boolean,
  id: number,
  deleted: boolean
}

export class TodoItem extends React.Component <TodoItemProps, TodoItemState> {

  public state: TodoItemState;

  constructor(props: any) {
    super(props);

    this.state = {
      title: this.props.title,
      summary: this.props.summary,
      completed: this.props.completed,
      id: this.props.id,
      deleted: false
    }

    // this.removeItem = this.removeItem.bind(this);
  }

  // removeItem(item: string) {
  //   this.props.removeTodo(item);
  // }

  // removeItem(e: any) {
  //   e.preventDefault(e);

  //   let currentItem = e.target.textContent;
  //   let updatedItems = this.state.items.filter((item: string) => {
  //     return currentItem !== item;
  //   });

  //   this.setState({
  //     items: updatedItems
  //   });

  //   !this.state.deleted && this.setState({
  //     deleted: true
  //   })
  // }

  render() {
    let cssTaskItem = "task-item";
    return (
      <li>
          <h2>{this.state.title}</h2>
          <p>{this.state.summary}</p>
          <input type="checkbox" checked={this.state.completed}/>
        </li>
    );
  }
}