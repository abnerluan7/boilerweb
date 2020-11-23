import React from 'react'
import { Box, CircularProgress, CssBaseline } from '@material-ui/core'

const FullPageLoading: React.FC = () => {
  return (
    <Box
      width='100vw'
      height='100vh'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <CssBaseline />
      <CircularProgress />
    </Box>
  )
}

export default FullPageLoading
