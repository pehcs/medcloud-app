import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';

import { Home } from './pages/Home/index'

const theme = createMuiTheme({
  palette: {
      primary: {
        main: "#009adf",
      },
      secondary:{
        main: "#f44336",
        contrastText: "#fff",
      },
  },
  spacing: 4,
  zIndex:{
    drawer: 1000
  },
}) 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home></Home>

    </ThemeProvider>
  );
}

export default App;

