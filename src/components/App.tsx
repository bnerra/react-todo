import * as React from 'react';
import { Hello } from './Hello';
import { TodoList } from './TodoList';

export class App extends React.Component<{}> {
  render() {
    return <div>
      <Hello compiler="TypeScript" framework="React"/>
      <TodoList items="['Reading', 'Writing', 'Music']"/>
    </div>
  }
}