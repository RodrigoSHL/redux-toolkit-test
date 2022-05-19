import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Country from '../Maintainers/Country';
import BusinessUnit from '../Maintainers/BusinessUnit';
import BranchOffice from '../Maintainers/BranchOffice';
import Clacom from '../Maintainers/Clacom';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{width: '100%', typography: 'body1'}}>
      <TabContext value={value}>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Países" value="1" />
            <Tab label="Unidades de negocio" value="2" />
            <Tab label="Tiendas" value="3" />
            <Tab label="Clacom" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Country />
        </TabPanel>
        <TabPanel value="2">
          <BusinessUnit />
        </TabPanel>
        <TabPanel value="3">
          <BranchOffice />
        </TabPanel>
        <TabPanel value="4">
          <Clacom />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
