import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './components/AppLayout/AppLayout';
import Homepage from './pages/HomePage/HomePage';
import GachaPage from './pages/GachaPage/GachaPage';
import GamePage from './pages/GamePage/GamePage';

const router = createBrowserRouter([{
  path: "/",
  Component: AppLayout,
  children: [
    {index: true, Component: Homepage},
    {path: "gacha", Component: GachaPage},
  ],
},
{
  path: "/game",
  Component: GamePage
}
]);

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

