// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import Roteador from './componentes/Roteador';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Roteador />
  </React.StrictMode>
);