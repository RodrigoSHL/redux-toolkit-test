import {Box} from '@mui/material';
import React from 'react';
import Table from './Table';

const index = () => {
  return (
    <Box
      sx={{
        flexDirection: 'row',
      }}>
      <Box>
        <Table />
      </Box>
    </Box>
  );
};
export default index;
