import React from 'react'
import { Box } from '@material-ui/core'

const BasicLayout: React.FC = ({ children }) => {
  return (
    <Box
      width='100vw'
      height='100vh'
      justifyContent='center'
      alignItems='center'
    >
      {children}
    </Box>
  )
}

export default BasicLayout
