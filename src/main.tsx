import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ProviderLogin from './context/ProviderLogin';
import ProviderSearch from './context/ProviderSearch';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <ProviderLogin>
      <ProviderSearch>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProviderSearch>
    </ProviderLogin>,
  );
