import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import VoiceRecog from './VoiceRecog';
import { WordCountProvider } from './ParamsProvider';

import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <BrowserRouter>
      <WordCountProvider>
        <App />
        <VoiceRecog />
      </WordCountProvider>
    </BrowserRouter>
  </React.StrictMode>
);
