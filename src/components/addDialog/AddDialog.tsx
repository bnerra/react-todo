import * as React from 'react';
import styles from "./AddDialogStyles";
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

export interface AddDialogProps extends WithStyles<typeof styles> {
  fullScreen: boolean,
  add: (obj: any) => void
}

export interface AddDialogState {
  addTodoTitle: string,
  addTodoSummary: string,
  dialogOpen: boolean
}



class AddDialog extends React.Component <AddDialogProps, AddDialogState> {

  public state: AddDialogState;

  constructor(props: any) {
    super(props);

    this.state = {
      addTodoTitle: '',
      addTodoSummary: '',
      dialogOpen: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

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
          this.setState({
            addTodoTitle: '',
            addTodoSummary: '',
            dialogOpen: false
          });
          this.props.add(res.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  render() {

    const { classes } = this.props;

    const enabled = this.state.addTodoTitle !== '' && this.state.addTodoSummary !== '';

    return (
      <div className="addDialog">
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
        </div>
    )
  }
}
export default withStyles(styles)(AddDialog);