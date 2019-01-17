import * as React from 'react';
// const styles = require<any>("./TodoList.css");
import * as  styles from "./TodoList.css";
import Todo from '../models/Todo'
import { Utils } from "../utils";
import { TodoItem } from './TodoItem';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface TodoListProps {
  todos: Todo[]
}

export interface TodoListState {
  todos: any,
  addTodoTitle: string,
  addTodoSummary: string,
  dialogOpen: boolean
}

export default class TodoList extends React.Component <TodoListProps, TodoListState> {

  public state: TodoListState;

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

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  public handleClickOpen() {
    this.setState({ dialogOpen: true });
  }

  public handleClose() {
    this.setState({ dialogOpen: false });
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
    this.handleClose;

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
    // const { classes } = this.props;

    let todoDialog = 
        <div>
          <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
            Add New Todo
          </Button>
          <Dialog
            open={this.state.dialogOpen}
            onClose={this.handleClose}
            aria-labelledby="add-new-todo"
          >
            <DialogTitle id="add-new-todo">Add New Todo</DialogTitle>
            <DialogContent>
              <Grid container spacing={16} direction="column">
                <Grid item xs={12}><Paper><TextField className={styles.textField} label="Title" name="addTodoTitle" value={this.state.addTodoTitle} onChange={this.handleChange} placeholder="Enter task"></TextField></Paper></Grid>
                <Grid item xs={12}><Paper><TextField className={styles.textField} label="Description" multiline rows="3" name="addTodoSummary" value={this.state.addTodoSummary} onChange={this.handleChange} placeholder="Enter task summary"></TextField></Paper></Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>Cancel</Button>
              <Button className={'add-button'} variant="contained" color="primary" onClick={this.addTodo}>Add<Icon>add</Icon></Button>
            </DialogActions>
          </Dialog>
        </div>;

    let taskItems = this.props.todos.map((item:any, index: number) => {
      return (
        <TodoItem key={item.id} title={item.title} summary={item.summary} completed={item.done} id={item.id} update={(obj: any) => this.updateTodo(obj, index)} remove={() => this.removeTodo(index)}/>
      )
    });

    const buttonStyle = {
      background: 'red' as 'red'
    };
    return (
      <div className="todoListMain">
        <Grid container spacing={16} direction="column">
          <Grid item xs={12}><h2>Todo List:</h2><button className={styles.buttonStyle}>Click Me</button><Button className={styles.addButton} variant="contained" color="primary" onClick={this.addTodo}>Add<Icon>add</Icon></Button></Grid>
          <Grid item xs={12}>{todoDialog}</Grid>
        </Grid><br/>
        <Grid container spacing={24}>
          <Paper className={styles.TableRoot}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Completed</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{taskItems}</TableBody>
            </Table>
          </Paper>
        </Grid>

      </div>
    )
  }
}