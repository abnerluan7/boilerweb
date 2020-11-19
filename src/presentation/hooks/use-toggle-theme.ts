import { ReactNode, useContext } from 'react'
import { ThemeContext } from '~/presentation/contexts'

type UseToggleThemeTypes = {
  toggleTheme: () => void
  type: string | ReactNode
}

export const useToggleTheme = (): UseToggleThemeTypes => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useToggleTheme must be used within a ThemeProvider')
  }

  return { toggleTheme: context.toggleTheme, type: context.type }
}
