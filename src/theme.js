import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff'
    },
    secondary: {
      main: '#333333',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;