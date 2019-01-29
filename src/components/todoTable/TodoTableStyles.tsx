import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
  tableRoot: {
    width: '75%',
    overflowX: 'auto'
  },
  todoCount: {
    paddingRight: '8px'
  },
  todoTable: {
    marginTop: '5%'
  }
})

export default styles;