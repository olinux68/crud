// src/index.js (ou App.js)

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css'; // Ajoute cette ligne pour lier le fichier CSS

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
