import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
  addButton: {
    color: 'white',
    fontSize: '16px'
  },
  dialogAppBar: {
    backgroundColor: '#2196f3',
    position: 'relative'
  },
  dialogBox: {
    height: '150vh',
    paddingtop: 0
  },
  dialogTitle: {
    color: 'white'
  },
  textField: {
    width: '100%',
    marginTop: '5px',
  },
  tableRoot: {
    width: '75%',
    overflowX: 'auto'
  }
})

export default styles;