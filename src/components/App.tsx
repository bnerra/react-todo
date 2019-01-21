import * as React from 'react';
import TodoList from './todoList/TodoList';

import CssBaseline from '@material-ui/core/CssBaseline';

export class App extends React.Component<{}> {
  render() {
    let todos = [
      {
        id: 1,
        title: "Eat Breakfast",
        summary: "Toast and scrambled eggs would be nice.",
        done: true
      },
      {
        id: 2,
        title: "Walk Dog",
        summary: "Dress for wet weather",
        done: false
      },
      {
        id: 3,
        title: "Learn React",
        summary: "I am making great progress!",
        done: false
      }
    ];
    return (
      <div>
        <CssBaseline />
        <TodoList todos={todos} />
      </div>
    )
  }
}