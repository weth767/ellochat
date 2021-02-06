import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Store, Persistor } from './store'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={Persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
