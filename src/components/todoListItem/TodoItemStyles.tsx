import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
  isCompleted: {
    textDecoration: 'line-through',
    color: '#999'
  },
})

export default styles;