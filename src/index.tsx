import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./components/App";
import { TodoList } from "./components/TodoList";

ReactDOM.render(
  <TodoList items={['Reading', 'Writing', 'Music']}/>,
  document.getElementById("root")
);