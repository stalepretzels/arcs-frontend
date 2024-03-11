import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Sidebar } from "./modules/Sidebar.jsx";
import { Chat, Intro, Profile, Edit } from "./modules/App.jsx";
import { About, Rules, ChangelogAbout } from "./modules/Extras.jsx";
import { ErrorComp } from "./modules/Error.jsx"
import './index.css'

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
    path: "/about/chnlogfaq",
    element: <ChangelogAbout />
  },
  {
    path: "/privatization",
    element: <>This project is being privated on the 31st of March, 2024. I am sorry it has come to this. I have spent the better half of 2 years working on this project, and it appears it is time to rest.
    My reasoning for doing this is simple, and it is that there are simply too many issues to handle with filtration. The amount of anti-semitic, racist, and homophobic jokes being spread among the platform I hold dear to my heart is sad to see.
    This shutdown was caused by a group of people, which for some reason, decided to spread hate among Arcs as a joke. It isn't funny, and it never was. You can attempt to change my mind on this, but I shall not budge.
    This is a mere privatization, and not a sunset or shutdown, so still expect to see this come back, but this is goodbye for now.
    
    - Clover</>
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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="privatizationNotice"><a href="/privatization">This project is being privated on the 31st of March, 2024. I am sorry it has come to this.</a></div>

    <Sidebar />

    <main className="mainContainer">
      <header className="titleContainer">
        <h1>
          Arcs <span style={{ fontWeight: 200 }}>{__APP_VERSION_HANDLE__}</span>&nbsp;
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
  </React.StrictMode>
);
