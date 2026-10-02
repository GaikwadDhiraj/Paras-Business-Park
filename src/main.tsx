import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import WhatsAppButton from './components/WhatsappButton.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <WhatsAppButton />
  </StrictMode>
);
