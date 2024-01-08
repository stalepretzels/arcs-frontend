import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Sidebar } from "./modules/Sidebar.jsx";
import { Chat, Intro, Profile, Edit } from "./modules/App.jsx";
import { About, Rules } from "./modules/Extras.jsx";
import "./index.css";

window.onerror = (e, s, l, c, err) => {
  window.alert(`${s} at ${l}:${c}; ${err}`);
};

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
    action: ({ params }) => {},
    element: <Profile />,
  },
  {
    path: "/profile/edit",
    element: <Edit />,
  },
  {
    path: "/rules",
    element: <Rules />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "*", // Catch-all route used for errors
    element: (
      <p>
        This page <em>probably</em> doesn't exist. Check back later, or{" "}
        <a
          href="https://github.com/stalepretzels/arcs-frontend/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          file an issue
        </a>
      </p>
    ),
  },
]);

const dependencies = createBrowserRouter([
  {
    path: "/chat",
    element: (
      <>
        <script src="/scripts/jquery.min.js"></script>
        <script src="/scripts/socket.io.min.js"></script>
        <script src="/scripts/arrive.min.js"></script>
        <script src="/scripts/chat.js"></script>
      </>
    ),
  },
  {
    path: "/profile/edit",
    element: (
      <>
        <script src="./scripts/jquery.min.js"></script>
        <script src="./scripts/jquery.validate.min.js"></script>
      </>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Sidebar />
    <main className="mainContainer">
      <header className="titleContainer">
        <h1>
          Arcs <span style={{ fontWeight: 200 }}>Slate</span>&nbsp;
          <span style={{ fontWeight: 300, fontSize: "15px" }}>
            {__APP_VERSION__}
          </span>
        </h1>
      </header>

      <RouterProvider router={router} />

      <footer className="statusmsg watermark">
        Made by{" "}
        <a
          href="https://clover.is-probably.gay"
          target="_blank"
          rel="noopener noreferrer"
        >
          Clover Johnson
        </a>
        .
      </footer>
    </main>
    <RouterProvider router={dependencies} />
  </React.StrictMode>
);
