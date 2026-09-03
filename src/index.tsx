import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './components/app/AppLayout/AppLayout';
import Homepage from './pages/HomePage/HomePage';
import DecksPage from './pages/DecksPage/DecksPage';
import GachaPage from './pages/GachaPage/GachaPage';
import GamePage from './pages/GamePage/GamePage';
import SignupPage from './pages/SignupPage/SignupPage';

import { AuthProvider } from './contexts/AuthContext/AuthContext';
import { DeckProvider } from './contexts/DeckContext/DeckContext';

import ProtectedRoute from './components/app/ProtectedRoute/ProtectedRoute';
import PublicRoute from './components/app/PublicRoute/PublicRoute';
import LoginPage from './pages/LoginPage/LoginPage';
import { GameProvider } from './contexts/GameContext/GameContext';


const router = createBrowserRouter([{
  path: "/",
  Component: AppLayout,
  children: [
     {
        element: <ProtectedRoute />,
        children: [
            { index: true, Component: Homepage },
            { path: "decks", Component: DecksPage },
            { path: "gacha", Component: GachaPage },
            { path: "game", Component: GamePage },
        ],
    },
    {
      element: <PublicRoute/>,
      children: [
        { path: "signup", Component: SignupPage },
        { path: "login", Component: LoginPage }
      ]
    }
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
    <AuthProvider>
    <DeckProvider>
    <GameProvider>            
      <RouterProvider router={router}/>
    </GameProvider>            
    </DeckProvider>
    </AuthProvider> 
  </React.StrictMode>
);

