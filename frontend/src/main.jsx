import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { API_BASE_URL } from './utils/api'
// import './PanelAcceso.jsx' // Eliminado: el archivo está en ./Inicio/PanelAcceso.jsx y se importa desde App.jsx

const API_URL_PATTERN = /^http:\/\/(localhost|127\.0\.0\.1):8000\/api/;

const normalizeApiUrl = (input) => {
  if (typeof input === 'string') {
    return input.replace(API_URL_PATTERN, API_BASE_URL);
  }

  if (input instanceof URL) {
    return new URL(input.toString().replace(API_URL_PATTERN, API_BASE_URL));
  }

  if (input instanceof Request) {
    const nextUrl = input.url.replace(API_URL_PATTERN, API_BASE_URL);
    if (nextUrl === input.url) return input;
    return new Request(nextUrl, input);
  }

  return input;
};

const originalFetch = window.fetch.bind(window);
window.fetch = (input, init) => originalFetch(normalizeApiUrl(input), init);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
