import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
  font-family: 'roboto';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #F5F5F5;
  overflow: hidden;
  }

  code {
    font-family: 'roboto';
  }
`;

export default GlobalStyles;