import * as React from 'react';
import styles from "./TodoTableStyles";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


export interface TodoTableProps extends WithStyles<typeof styles> {
  taskItems: JSX.Element[]
}

export interface TodoTableState {

}



class TodoTable extends React.Component <TodoTableProps, TodoTableState> {

  public state: TodoTableState;

  constructor(props: any) {
    super(props);

    this.state = {

    };

  }

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
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{this.props.taskItems}</TableBody>
            </Table>
          </Paper>
        </Grid>
      </div>
    )
  }
}
export default withStyles(styles)(TodoTable);