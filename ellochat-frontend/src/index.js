import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from './store'
import { Provider } from 'react-redux';


ReactDOM.render(
  <Provider store={Store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
