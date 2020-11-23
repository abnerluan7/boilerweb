import React, { useMemo, useState } from 'react'
import { MdBrightness4, MdBrightness7 } from 'react-icons/md'
import { MuiThemeProvider } from '@material-ui/core'
import { ThemeContext } from '~/presentation/contexts'
import { makeDarkTheme, makeLightTheme } from '~/presentation/styles'

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(makeLightTheme())

  const {
    palette: { type }
  } = theme

  const toggleTheme = (): void => {
    const newTheme = type === 'light' ? makeDarkTheme() : makeLightTheme()
    setTheme(newTheme)
  }

  const themeType = useMemo(
    () => (type === 'light' ? <MdBrightness4 /> : <MdBrightness7 />),
    [type]
  )

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ toggleTheme, type: themeType }}>
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  )
}

export default ThemeProvider
