import * as React from 'react';
import styles from "./TodoTableStyles";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';

//TODO: Table footer: {[# items left][All/Active/Completed][Clear Completed]}


export interface TodoTableProps extends WithStyles<typeof styles> {
  taskItems: JSX.Element[],
  todoCount: number,
  completedCount: number,
  clearAll: () => void,
}

export interface TodoTableState {
  clearDisable: boolean
}



class TodoTable extends React.Component <TodoTableProps, TodoTableState> {

  public state: TodoTableState;

  constructor(props: any) {
    super(props);

    this.state = {
      clearDisable: true
    };

  }

  renderTodoCount(): JSX.Element {
    const itemword = this.props.todoCount === 1 ? 'item' : 'items';

    return (
      <span>
        <strong>{this.props.todoCount || 'No'} {itemword} left</strong>
      </span>
    )
  }

  // renderFilters(): JSX.Element {
  //   return ()
  // }

  renderClearButton(): JSX.Element {
    const {completedCount} = this.props;
    if (completedCount! > 0) {
      this.state.clearDisable = false
    } else {
      this.state.clearDisable = true
    }
    return (
      <TableCell>
          <Button disabled={this.state.clearDisable} onClick={this.props.clearAll}>Clear Completed</Button>
        </TableCell>
    )
  }

  onClickFilter() {}

  clearCompleted() {}

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.todoTable}>
        <Grid container spacing={0} direction="column" alignItems="center" justify="center">
          <Paper className={classes.tableRoot}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Completed</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{this.props.taskItems}</TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className={classes.todoCount}>
                    {this.renderTodoCount()}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <Button>All</Button>
                    <Button>Active</Button>
                    <Button>Completed</Button>
                  </TableCell>
                  <TableCell></TableCell>
                    {this.renderClearButton()}
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </Grid>
      </div>
    )
  }
}
export default withStyles(styles)(TodoTable);