import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './styles.scss';
import GlobalStyles from './components/global.styles';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
