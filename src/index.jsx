import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {Sidebar} from './modules/Sidebar.jsx';
import {Chat,Intro,Profile} from './modules/App.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Intro />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/profile/:user",
    action: ({params}) => {},
    element: <Profile />
  },
  {
    path: "*", // Catch-all route used for errors
    element: <p>This page <em>probably</em> doesn't exist. Check back later, or <a href="https://github.com/stalepretzels/arcs-frontend/issues" target="_blank" rel="noopener noreferrer">file an issue</a></p>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <header className="titleContainer">
      <h1>
        Arcs <span style={{fontWeight: 200}}>Slate</span>&nbsp;<span
          style={{fontWeight: 300, fontSize: '15px'}}
          >v3.0.0-indev15</span
        >
      </h1>
    </header>
    <Sidebar />
    <RouterProvider router={router} />
    </React.StrictMode>
);