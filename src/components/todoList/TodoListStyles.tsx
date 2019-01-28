import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
  addButton: {
    color: 'white',
    fontSize: '16px'
  },
  tableRoot: {
    width: '75%',
    overflowX: 'auto'
  }
})

export default styles;