import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PrimeReact from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'                    
import 'primeicons/primeicons.css'
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  document.getElementById('root')
);
