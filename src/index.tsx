import React from 'react';
import ReactDOM from 'react-dom/client';
import { enableMapSet } from "immer"
import { enableArrayMethods } from "immer"
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './components/app/AppLayout/AppLayout';
import Homepage from './pages/HomePage/HomePage';
import DecksPage from './pages/DecksPage/DecksPage';
import GachaPage from './pages/GachaPage/GachaPage';
import GamePage from './pages/GamePage/GamePage';
import SignupPage from './pages/SignupPage/SignupPage';
import { AuthProvider } from './contexts/AuthContext/AuthContext';
import ProtectedRoute from './components/app/ProtectedRoute/ProtectedRoute';
import PublicRoute from './components/app/PublicRoute/PublicRoute';
import LoginPage from './pages/LoginPage/LoginPage';
import { DECKSPAGE_PATH, GACHAPAGE_PATH, GAMEPAGE_PATH, LOGINPAGE_PATH, SIGNUPPAGE_PATH } from './components/app/Topbar/shared/pagePaths';


// immer stuff
enableArrayMethods()
enableMapSet()


const router = createBrowserRouter([{
  path: "/",
  Component: AppLayout,
  children: [
    {
      element: <ProtectedRoute />,
      children: [
        { index: true, Component: Homepage },
        { path: DECKSPAGE_PATH, Component: DecksPage },
        { path: GACHAPAGE_PATH, Component: GachaPage },
        { path: GAMEPAGE_PATH, Component: GamePage },
      ],
    },
    {
      element: <PublicRoute/>,
      children: [
        { path: SIGNUPPAGE_PATH, Component: SignupPage },
        { path: LOGINPAGE_PATH, Component: LoginPage }
      ]
    }
  ],
}]);


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider> 
  </React.StrictMode>
);

