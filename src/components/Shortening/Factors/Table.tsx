import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import Filters from './Filters'

const Table = () => {

  return (
    <Paper>
    <Box >
      <Typography variant="h6" component="h2" color="primary">
        Factores
      </Typography>
    </Box>
    <Box>
      <Filters/>
    </Box>
  </Paper>  
  )
}

export default Table