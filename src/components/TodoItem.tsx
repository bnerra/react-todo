import * as React from'react';

export interface TodoItemProps {
  title: string,
  summary: string,
  completed: boolean,
  id: number,
  update: (obj: any) => void,
  remove: () => void
}

export interface TodoItemState {
  title: string,
  summary: string,
  completed: boolean,
  id: number,
  inEditMode: boolean
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
      inEditMode: false
    }
    this.editTodo = this.editTodo.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

  public toggleCompleted() {
    this.setState({ completed: !this.state.completed })
  }

  public toggleEditMode() {
    this.setState({ inEditMode: !this.state.inEditMode})
  }

  public editTodo(event: React.SyntheticEvent<{name: string, value: string}>) {
    this.setState({...this.state, [event.currentTarget.name]: event.currentTarget.value});

    this.props.update({...this.state, [event.currentTarget.name]: event.currentTarget.value});
  }

  render() {
    let cssTaskItem = "task-item";
    return (
      <li>
        { this.state.inEditMode ? <div><input type="text" name="title" value={this.state.title} onChange={this.editTodo} /> <textarea name="summary" value={this.state.summary} onChange={this.editTodo}></textarea></div> : <div><h2>{this.state.title}</h2><p>{this.state.summary}</p> <input type="checkbox" checked={this.state.completed} onChange={this.toggleCompleted} /></div> }

        {/* <h2>{this.state.title}</h2>
        <p>{this.state.summary}</p> */}
        {/* <input type="checkbox" checked={this.state.completed} onChange={this.toggleCompleted}/> */}
        {/* <input type="text" name="title" value={this.state.title} onChange={this.editTodo}/><textarea name="summary" value={this.state.summary} onChange={this.editTodo}></textarea> */}
        <button onClick={this.toggleEditMode}>{this.state.inEditMode ? 'Stop Editing' : 'Edit'}</button>
        <button onClick={this.props.remove}>Delete</button>
      </li>
    );
  }
}