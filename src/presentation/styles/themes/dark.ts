import { createMuiTheme, Theme } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

export const makeDarkTheme = (): Theme =>
  createMuiTheme({
    palette: {
      type: 'dark'
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          html: {
            overflow: 'auto',
            overflowX: 'hidden'
          },
          '*::-webkit-scrollbar': {
            width: '6px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: grey[400],
            borderRadius: '8px',
            backgroundClip: 'padding-box'
          },
          body: {
            paddingRight: '0px !important'
          }
        }
      }
    }
  })
