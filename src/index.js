import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@material-ui/core/styles'

import App from './components/App.jsx'
import theme from './theme'

ReactDOM.render(
  <ThemeProvider theme={theme}>
  	<App />
  </ThemeProvider>,
  document.querySelector('#root'),
);