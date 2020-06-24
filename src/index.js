import React from 'react';
import ReactDOM from 'react-dom';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './components/App.jsx';
import theme from './theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="lg">
      <Box my={4}>
        <App />
      </Box>
    </Container>
  </ThemeProvider>,
  document.querySelector('#root'),
);