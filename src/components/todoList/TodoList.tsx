import * as React from 'react';
import styles from "./TodoListStyles";
import NewTodo from '../../models/NewTodoModel';
import TodoItem from '../todoListItem/TodoItem';
import AddDialog from '../addDialog/AddDialog';
import TodoTable from '../todoTable/TodoTable';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

//TODO: Componentize TodoTable
//TODO: Properly set state
//TODO: Proper error handling
//TODO: Data validation

export interface TodoListProps extends WithStyles<typeof styles> {
  fullScreen: boolean
}

export interface TodoListState {
  todoData: NewTodo[]
}



class TodoList extends React.Component <TodoListProps, TodoListState> {

  public state: TodoListState;

  constructor(props: any) {
    super(props);

    this.state = {
      todoData: []
    };

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.toggleComplete = this.toggleComplete.bind(this);

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

  public addTodo(obj: any) {
    this.state.todoData.push(obj);
    this.setState({
      todoData: this.state.todoData,
    });
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
          <Grid item xs={6}><AddDialog add={(e: any) => this.addTodo(e)}/></Grid>
        </Grid>
        <TodoTable taskItems={taskItems}/>
      </div>
    )
  }
}
export default withStyles(styles)(TodoList);