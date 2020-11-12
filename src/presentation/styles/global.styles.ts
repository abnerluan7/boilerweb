import { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    vertical-align: baseline;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ${({ theme }) => css`
    html {
      font-family: ${theme.font.family};
      font-size: 62.5%;
      scroll-behavior: smooth;
    }
    body {
      background-color: ${theme.colors.mainBg};
      color: ${theme.colors.white};
      font-size: ${theme.font.sizes.small};
    }
  `}
`;

export default GlobalStyle;
