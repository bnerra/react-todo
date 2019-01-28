import * as React from'react';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import styles from './TodoItemStyles'
import axios from 'axios';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';


export interface TodoItemProps extends WithStyles<typeof styles>{
  title: string,
  summary: string,
  completed: boolean,
  id: number,
  update: (obj: any) => void,
  complete: (obj: any) => void,
  remove: () => void
}

export interface TodoItemState {
  title: string,
  summary: string,
  completed: boolean,
  id: number,
  inEditMode: boolean
}

class TodoItem extends React.Component <TodoItemProps, TodoItemState> {

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
    this.updateTodo = this.updateTodo.bind(this);
    this.updateComplete = this.updateComplete.bind(this);
  }

  public toggleCompleted(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ completed: !this.state.completed });

    this.props.complete({...this.state, [event.currentTarget.name]: event.currentTarget.checked});

    // console.log("boolean", event.currentTarget.checked);

    this.updateComplete(event.currentTarget.checked);
  }

  public toggleEditMode() {
    this.setState({ inEditMode: !this.state.inEditMode})
  }

  public editTodo(event: React.SyntheticEvent<{name: string, value: string}>) {
    this.setState({...this.state, [event.currentTarget.name]: event.currentTarget.value});

    this.props.update({...this.state, [event.currentTarget.name]: event.currentTarget.value});
  }

  public updateTodo() {

    let payload = {
      "title": this.state.title,
      "summary": this.state.summary 
    };

    let id = this.state.id;

    axios.put("http://localhost:8000/api/todos/?id="+ id, payload)
        .then(res => {
        })
        .catch((error) => {
          console.log(error);
        })
  }

  public updateComplete(bool: boolean) {

    console.log("status", bool);

    let payload = {
      "isComplete": bool
    };

    let id = this.state.id;

    axios.put("http://localhost:8000/api/todoComplete/?id=" + id)
      .then(res => {
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    const { classes } = this.props;
    let isComplete = this.state.completed ? 'complete' : '';
    var titleDisplay;
    var summaryDisplay;

    if (this.state.inEditMode) {
      titleDisplay = <TextField name="title" value={this.state.title} onChange={this.editTodo}></TextField>;
      summaryDisplay = <TextField name="summary" value={this.state.summary} onChange={this.editTodo}></TextField>;
    } else {
      titleDisplay = <h3>{this.state.title}</h3>;
      summaryDisplay = <p>{this.state.summary}</p>;
    }
    return (
      <TableRow>
        <TableCell><Checkbox name="isComplete" checked={this.state.completed} onChange={this.toggleCompleted} /></TableCell>
        <TableCell className={this.state.completed ? classes.isCompleted : ''}>{titleDisplay}</TableCell>
        <TableCell className={this.state.completed ? classes.isCompleted : ''}>{summaryDisplay}</TableCell>
        <TableCell><IconButton onClick={this.toggleEditMode}>{this.state.inEditMode ? <Icon onClick={this.updateTodo}>check</Icon> : <Icon>create</Icon>}</IconButton></TableCell>
        <TableCell><IconButton onClick={this.props.remove}><Icon>delete_forever</Icon></IconButton></TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(TodoItem);