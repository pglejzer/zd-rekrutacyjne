import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  // nie wywalam "StrictMode" ale przez to są podwójne strzały w trybie deweloperskim :)
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
