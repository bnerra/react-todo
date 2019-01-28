import * as React from 'react';
import styles from "./TodoListStyles";
import Todo from '../../models/Todo'
import NewTodo from '../../models/NewTodoModel';
import NewTodoItem from '../../models/TodoItemModel';
import { Utils } from "../../utils";
import TodoItem from '../todoListItem/TodoItem';
import axios from 'axios';
import mockData from './mockData';
import update from 'immutability-helper';
import * as deepmerge from 'deepmerge';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { any } from 'prop-types';

//TODO: Componentize Dialog
//TODO: Componentize TodoTable
//TODO: Properly set state
//TODO: Proper error handling
//TODO: Data validation

export interface TodoListProps extends WithStyles<typeof styles> {
  fullScreen: boolean
}

export interface TodoListState {
  addTodoTitle: string,
  addTodoSummary: string,
  dialogOpen: boolean,
  todoData: NewTodo[]
}



class TodoList extends React.Component <TodoListProps, TodoListState> {

  public state: TodoListState;

  constructor(props: any) {
    super(props);

    this.state = {
      addTodoTitle: '',
      addTodoSummary: '',
      dialogOpen: false,
      todoData: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/todos/')
      .then(res => {
        this.setState({ todoData: res.data });
      })
      .catch((error) => {
        console.log(error);
      })
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

    if (!this.state.addTodoTitle || this.state.addTodoSummary) {
      let payload = {
        "title": this.state.addTodoTitle,
        "summary": this.state.addTodoSummary 
      };
  
      axios.post("http://localhost:8000/api/todos", payload)
        .then(res => {
          this.state.todoData.push(res.data);
          this.setState({
            todoData: this.state.todoData,
            addTodoTitle: '',
            addTodoSummary: '',
            dialogOpen: false
          });
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  public updateTodo(obj: NewTodo, index: number) {

    this.state.todoData[index] = {
      id: this.state.todoData[index].id,
      title: obj.title,
      summary: obj.summary,
      isComplete: obj.isComplete
    }
    this.setState({
      todoData: this.state.todoData
    })

  }

  public removeTodo(index: number) {

    let id = this.state.todoData[index].id;

    axios.delete("http://localhost:8000/api/todos/?id="+ id)
        .then(res => {
          this.state.todoData.splice(index, 1);
          this.setState({
            todoData: this.state.todoData
          })
        })
        .catch((error) => {
          console.log(error);
        })
  }

  public toggleComplete(obj: NewTodo, index: number) {

    this.state.todoData[index] = {
      id: this.state.todoData[index].id,
      title: obj.title,
      summary: obj.summary,
      isComplete: obj.isComplete
    }
    this.setState({
      todoData: this.state.todoData
    })

  }


  render() {

    const { classes } = this.props;

    const enabled = this.state.addTodoTitle !== '' && this.state.addTodoSummary !== '';

    let todoDialog = 
        <div>
          <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
            Add Todo
          </Button>
          <Dialog
             fullScreen
            open={this.state.dialogOpen}
            onClose={this.handleClose}
            aria-labelledby="add-new-todo"
            className={classes.dialogBox}
          >
            <AppBar className={classes.dialogAppBar}>
              <Toolbar>
                <Grid container direction="row" justify="space-between" alignItems="center">
                  <Grid item>
                    <IconButton color="inherit" onClick={this.handleClose}>
                      <Icon>close</Icon>
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.dialogTitle} variant="h4">
                      Add New Todo
                    </Typography>
                  </Grid>
                  <Grid item>
                    <IconButton color="inherit" disabled={!enabled} onClick={this.addTodo}><Icon>check</Icon></IconButton>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
            <List>
              <ListItem>
                <TextField multiline className={classes.textField} label="Title" name="addTodoTitle" value={this.state.addTodoTitle} onChange={this.handleChange} placeholder="Enter task"></TextField>
              </ListItem>
              <ListItem>
                <TextField  className={classes.textField} label="Description" multiline rows="3" name="addTodoSummary" value={this.state.addTodoSummary} onChange={this.handleChange} placeholder="Enter task summary"></TextField>
              </ListItem>
            </List>
          </Dialog>
        </div>;

    this.state.todoData.sort((a: any,b: any) => { return a.isComplete - b.isComplete});

    let taskItems = this.state.todoData.map((item: NewTodo, index: number) => {
      return (
        <TodoItem key={item.id} title={item.title} summary={item.summary} completed={item.isComplete} id={item.id} update={(obj: any) => this.updateTodo(obj, index)} complete={(obj: any) => this.toggleComplete(obj, index)} remove={() => this.removeTodo(index)}/>
      )
    });
    return (
      <div className="todoListMain">
        <Grid container spacing={32} direction="column" alignItems="center" justify="center">
          <Grid item xs={6}><Typography variant="h3">Todo List:</Typography></Grid>
          <Grid item xs={6}>{todoDialog}</Grid>
        </Grid><br/>
        <Grid container spacing={0} direction="column" alignItems="center" justify="center">
          <Paper className={classes.tableRoot}>
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
export default withStyles(styles)(TodoList);