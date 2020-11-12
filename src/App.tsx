import React from 'react';

import { ThemeProvider } from 'styled-components';

import Home from 'presentation/screens/Home';
import GlobalStyle from 'presentation/styles/global.styles';
import theme from 'presentation/styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Home />
    </ThemeProvider>
  );
}

export default App;
