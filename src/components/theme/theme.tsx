import {createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#716fa3',
      main: '#444474',
      dark: '#181d48',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffffff',
      main: '#e0e0e0',
      dark: '#aeaeae',
      contrastText: '#000000',
    },
    background: {
      default: '#fafafa',
    },
  },
});

export default theme;
