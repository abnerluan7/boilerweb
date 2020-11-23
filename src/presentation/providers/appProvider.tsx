import React from 'react'

type Props = {
  ThemeProvider: React.FC
  AuthProvider: React.FC
  ToastProvider: React.FC
}

const AppProvider: React.FC<Props> = ({
  ThemeProvider,
  AuthProvider,
  ToastProvider,
  children
}) => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>{children}</AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default AppProvider
