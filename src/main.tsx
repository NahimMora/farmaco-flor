import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/atkinson-hyperlegible-next';
import '@fontsource-variable/big-shoulders-display';
import './styles.css';
import { App } from './App';
import { aplicarTema, obtener } from './lib/store';

aplicarTema(obtener().ajustes.tema);

// Pide al navegador que no borre el progreso si se queda sin espacio.
void navigator.storage?.persist?.();

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => { void navigator.serviceWorker.register(import.meta.env.BASE_URL + 'sw.js'); });
}
