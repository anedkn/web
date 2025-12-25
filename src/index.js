import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Redux Provider
import { BrowserRouter } from 'react-router-dom'; // React Router
import { store } from './store'; // Redux store
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Redux Provider для доступа к store */}
    <Provider store={store}>
      {/* React Router для маршрутизации */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);