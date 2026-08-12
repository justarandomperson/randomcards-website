import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
