import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import Favicon from 'react-favicon';

ReactDOM.render(
  <React.StrictMode>
    <Favicon url="https://yt3.ggpht.com/ytc/AAUvwniqCJQn4NNwTok5I9Wm5iveJTLdATVKAdXpzIvwmA=s240-c-k-c0x00ffffff-no-rj" />
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
