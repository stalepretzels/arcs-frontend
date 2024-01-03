import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Sidebar} from './modules/Sidebar.jsx';
import {Chat,Intro} from './modules/App.jsx';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
    path: "*", // Catch-all route used for errors
    element: <p>This page <em>probably</em> doesn't exist. Check back later, or <a href="https://github.com/stalepretzels/arcs-frontend/issues" target="_blank" rel="noopener noreferrer">file an issue</a></p>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="container title">
      <h1>
        Arcs <span style={{fontWeight: 200}}>Slate</span>&nbsp;<span
          style={{fontWeight: 300, fontSize: '15px'}}
          >v3.0.0-indev14</span
        >
      </h1>
    </div>
    <Sidebar />
    <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
