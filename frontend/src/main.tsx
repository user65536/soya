import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ApiClient } from './Services/ApiClient.ts';
import { http } from './Services/http.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

new ApiClient(http).getAllEntries().then(console.log);
