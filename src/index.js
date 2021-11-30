import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PrimeReact from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'                    
import 'primeicons/primeicons.css'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>,
  </Provider>,
  document.getElementById('root')
);
