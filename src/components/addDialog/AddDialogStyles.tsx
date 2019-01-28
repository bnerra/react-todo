import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
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
})

export default styles;