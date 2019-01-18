import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
  addButton: {
    color: 'red'
  },
  textField: {
    width: '100%'
  },
  tableRoot: {
    width: '100%',
    overflowX: 'auto'
  }
})

export default styles;