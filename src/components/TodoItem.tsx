import * as React from'react';

export interface TodoItemProps {
  items: any,
  removeTodo: any
}

export interface TodoItemState {
  items: any,
  deleted: boolean
}

export class TodoItem extends React.Component <TodoItemProps, TodoItemState> {

  public state: TodoItemState;

  constructor(props: any) {
    super(props);

    this.state = {
      items: this.props.items,
      deleted: false
    }

    // this.removeItem = this.removeItem.bind(this);
  }

  removeItem(item: string) {
    this.props.removeTodo(item);
  }

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
    let taskItems = this.state.items.map((task:string, i:number) => {
      return <li
      className={cssTaskItem} 
      key={cssTaskItem + i}>{task} <button onClick={(event:any) => {this.removeItem(event)}} key={task}>Delete</button></li>;
    });
    return (
      <div>{taskItems}</div>
    );
  }
}