import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './locales/i18n';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AlertProvider } from './context/AlertContext';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <AlertProvider>
        <App />
      </AlertProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
