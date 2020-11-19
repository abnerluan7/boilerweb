import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'inherit',
    alignItems: 'inherit',
    width: '100%',
    height: '100%'
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    height: '70%',
    maxWidth: '50%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '80%'
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: '90%'
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '80%',
    height: '50%'
  }
}))
