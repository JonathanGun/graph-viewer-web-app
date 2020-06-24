import { createMuiTheme } from '@material-ui/core/styles';
import { red, grey } from '@material-ui/core/colors';


const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
