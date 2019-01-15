import * as React from 'react';
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

export namespace TodoList {
  export interface TodoListProps extends WithStyles<typeof styles> {
    todos: Todo[]
  }
  
  export interface TodoListState {
    todos: any,
    addTodoTitle: string,
    addTodoSummary: string,
    deleted: boolean
  }
}



class TodoList extends React.Component <TodoList.TodoListProps, TodoList.TodoListState> {

  public state: TodoList.TodoListState;

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
    const { classes } = this.props;

    let taskItems = this.props.todos.map((item:any, index: number) => {
      return (
        <TodoItem key={item.id} title={item.title} summary={item.summary} completed={item.done} id={item.id} update={(obj: any) => this.updateTodo(obj, index)} remove={() => this.removeTodo(index)}/>
      )
    });
    return (
      <div className="todoListMain">
        <Grid container spacing={16} direction="column">
          <Grid item xs={12}><h2>Todo List:</h2></Grid>
          <Grid item xs={12}><Paper><TextField className={classes.textField} label="Title" name="addTodoTitle" value={this.state.addTodoTitle} onChange={this.handleChange} placeholder="Enter task"></TextField></Paper></Grid>
          <Grid item xs={12}>
            <Grid container spacing={16} direction="row">
              <Grid item xs={12}><Paper><TextField className={classes.textField} label="Description" multiline rows="3" variant="filled" name="addTodoSummary" value={this.state.addTodoSummary} onChange={this.handleChange} placeholder="Enter task summary"></TextField></Paper></Grid>
              <Grid item xs><Button className={classes.addButton} variant="contained" color="primary" onClick={this.addTodo}>Add<Icon>add</Icon></Button></Grid>
            </Grid>
          </Grid>
        </Grid><br/>
        <Grid container spacing={24}>
          <Paper className={classes.tableRoot}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Completed</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Edit</TableCell>
                  <TableCell align="right">Delete</TableCell>
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

const styles = (theme: Theme) => createStyles({
  addButton: {
    color: 'red'
  },
  textField: {
    width: '100%'
  },
  tableRoot: {
    width: '100%',
    overflowX: 'auto'
  }
})

export default withStyles(styles)(TodoList);