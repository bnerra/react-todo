import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./components/App";
import { TodoList } from "./components/TodoList";

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

ReactDOM.render(
  <TodoList todos={todos}/>,
  document.getElementById("root")
);