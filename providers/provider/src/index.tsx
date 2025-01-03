// @ts-ignore
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './fonts.css';
import './style.css';

// @ts-ignore
import { App } from './App';
import RootLayout from "./layout";

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <RootLayout>
      <App />
      </RootLayout>
    </StrictMode>,
  );
}
