import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // Importando o componente App
import Home from './routes/home.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './assets/styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Componente App renderiza a rota Home
    children: [
      {
        path: '/',
        element: <Home />, // Rota filha renderiza Home
      },
    ],
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
