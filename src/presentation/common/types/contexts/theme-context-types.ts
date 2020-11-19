import { ReactNode } from 'react'

export type ThemeContextType = {
  toggleTheme: () => void
  type: string | ReactNode
}
