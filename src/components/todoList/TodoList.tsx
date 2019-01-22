import * as React from 'react';
import styles from "./TodoListStyles";
import Todo from '../../models/Todo'
import NewTodo from '../../models/NewTodoModel';
import { Utils } from "../../utils";
import TodoItem from '../todoListItem/TodoItem';
import axios from 'axios';

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

//TODO: Componentize Dialog
//TODO: Componentize TodoTable
//TODO: Connect to PostgreSQL

export interface TodoListProps extends WithStyles<typeof styles> {
  todos: Todo[],
  fullScreen: boolean
}

export interface TodoListState {
  todos: any,
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
      todos: this.props.todos,
      addTodoTitle: '',
      addTodoSummary: '',
      dialogOpen: false,
      todoData: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }

  componentDidMount() {
    axios.get('http://localhost:8000/api/todos/')
      .then(res => {
        this.setState({ todoData: res.data });
        console.log("Todo Data: ", this.state.todoData);
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

    if (!this.state.addTodoTitle || this.state.addTodoSummary)

    this.state.todos.push({
      id: Utils.uuid(),
      title: this.state.addTodoTitle,
      summary: this.state.addTodoSummary,
      done: false
    });

    this.setState({
      todos: this.state.todos,
      addTodoTitle: '',
      addTodoSummary: '',
      dialogOpen: false
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

    const enabled = this.state.addTodoTitle !== '' && this.state.addTodoSummary !== '';

    let tabRow = this.state.todoData.map((item: any, index: number) => {
      return(
        <TableRow key={index}>
          <TableCell>{item.title}</TableCell>
        </TableRow>
      )
    });

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

    let taskItems = this.props.todos.map((item:any, index: number) => {
      return (
        <TodoItem key={item.id} title={item.title} summary={item.summary} completed={item.done} id={item.id} update={(obj: any) => this.updateTodo(obj, index)} remove={() => this.removeTodo(index)}/>
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
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>List of Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* <TableRow>
                <TableCell>Object Here</TableCell>
              </TableRow> */}
              {tabRow}
            </TableBody>
          </Table>
        </div>

      </div>
    )
  }
}
export default withStyles(styles)(TodoList);