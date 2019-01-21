import * as React from 'react';
import Todo from '../models/Todo'
import { Utils } from "../utils";
import TodoItem from './todoListItem/TodoItem';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export namespace AddTodoDialog {
  export interface AddTodoDialogProps extends WithStyles<typeof styles> {
    todos: Todo[]
  }
  
  export interface AddTodoDialogState {
    todos: any,
    addTodoTitle: string,
    addTodoSummary: string,
    dialogOpen: boolean
  }
}



class AddTodoDialog extends React.Component <AddTodoDialog.AddTodoDialogProps, AddTodoDialog.AddTodoDialogState> {

  public state: AddTodoDialog.AddTodoDialogState;

  constructor(props: any) {
    super(props);

    this.state = {
      todos: this.props.todos,
      addTodoTitle: '',
      addTodoSummary: '',
      dialogOpen: false
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
    return (
      <div className="addTodoDialog">
      </div>
    )
  }
}

const styles = (theme: Theme) => createStyles({
})

export default withStyles(styles)(AddTodoDialog);