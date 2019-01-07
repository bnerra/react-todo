import * as React from 'react';

export interface TodoListProps {
  taskName: string
}

export interface TodoListState {
  taskName: string,
  items: any
}

export class TodoList extends React.Component<TodoListProps, TodoListState> {

  public state: TodoListState;

  constructor(props: TodoListProps) {
    super(props);

    this.state = {
      taskName: "",
      items: []
    };

    // this.handleChange = this.handleChange.bind(this);

    this.addItem = this.addItem.bind(this);
  }

  public handleChange(event: any) : void {
    this.setState({ taskName: event.target.value })
  };

  addItem(e: any) {
    
    let currentItems = this.state.items;
    let textBox = e.target.previouselementSibling;

    if (textBox.value) {
      currentItems.push(textBox.value);
      textBox.value = "";

      this.setState({
        items: currentItems
      });
    }
    // if (this.state.taskName !== "") {
    //   var newItem: {text: string} = {
    //     text: this.state.taskName
    //   };

    //   this.setState({ items: this.state.items.push(newItem) });
    //   this.setState({ taskName: "" });
    // }
    console.log("items: " + this.state.items);
    e.preventDefault();
    
  }
  render() {
    return <div className="todoListMain">
      <div className="header">
        <form onSubmit={this.addItem}>
          <input type="text"
          placeholder="Enter task"
          // value={this.state.taskName} 
          // onChange={ e => this.handleChange(e) }
          />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  }
}