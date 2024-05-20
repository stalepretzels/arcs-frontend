import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addDependencyScripts,
  addDependencyScriptsAsync,
  addDependencyScriptsDefer,
} from "../utility.js";
import $ from "jquery";
import { io } from "socket.io-client";
import * as arrive from "arrive";
import { Chance } from "chance";
import { MailmanClass, MailboxClass } from "./chat.js";

import "./App.css";
import "./Message.css";
import { IconButton } from "../components/Input/Input.jsx";

function Chat() {
  const ws = useRef(io("https://callmeclover.serv00.net"));
  const [room, setRoom] = useState("::GENERAL");
  const Mailbox = new MailboxClass();
  let loggedIn,
    alreadyConnected = false;

  if (localStorage.getItem("readrules") == undefined) {
    window.location = "/rules";
  }

  let User;
  if (localStorage.getItem("user") == undefined) {
    window.location = "/profile/edit";
  } else {
    User = JSON.parse(localStorage.getItem("user"));
  }

  useEffect(() => {
    ws.on("connect", function (data) {
      if (!alreadyConnected) {
        let Mailman = new MailmanClass("join", "", User, room);
        if (!(User.disName == undefined)) {
          Mailman.send();
          alreadyConnected = !alreadyConnected;
        }
      }
    });

    ws.on("broad", function (data) {
      Mailbox.append(data);
    });

    ws.on("notification", function (data) {
      Mailbox.sendNotif(data);
    });

    document.arrive("time", function (elem) {
      elem.innerHTML = new Date(elem.getAttribute("datetime")).toLocaleString();
    });

    $("#chatInput").keypress(function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();

        let message = $("#chatInput").val();

        if (!message.replace(/\s/g, "").length) {
          /* empty */
        } else {
          document.getElementById("chatInput").value = "";

          Mailman = new MailmanClass("message", message, User, room);
          Mailman.send();
        }
      }
    });

    return () => {
      ws.disconnect();
    };
  }, [ws]);

  function submitMessage() {
    e.preventDefault();

    let message = $("#chatInput").val();

    if (!message.replace(/\s/g, "").length) {
      /* empty */
    } else {
      document.getElementById("chatInput").value = "";

      Mailman = new MailmanClass("message", message, User, room);
      Mailman.send();
    }
  }

  return (
    <>
      <div id="appendto" className="chatContainer"></div>
      <div id="chatForm">
        <textarea
          placeholder="This field supports Markdown!! 2000 character limit."
          id="chatInput"
          type="text"
          maxLength="2000"
        ></textarea>
        <input type="file" id="selectedFile" accept="image/*" />
        <IconButton
          size="1.6em"
          classes="chatFiles button"
          icon="folder"
          onClick={() => document.getElementById("selectedFile").click()}
        ></IconButton>
        <IconButton
          id="chatSubmit"
          onClick={submitMessage}
          classes="button"
          size="1.6em"
          icon="send"
        ></IconButton>
      </div>
    </>
  );
}

function Intro() {
  return (
    <>
      <div className="titleContainer">
        <h3>An excellent free chat app.</h3>
      </div>

      <p>Currently in development.</p>

      <a href="/chat">
        <em>Proceed to chat app.</em>
      </a>
    </>
  );
}

function Profile() {
  let params = useParams();

  return (
    <>
      <header className="titleContainer">
        <h2 id="user" style={{ margin: 0 }}>
          {params.user}
        </h2>
        <br />
        <p id="bio" style={{ margin: 0 }}>
          Bios have been temporarily removed. Sorry!
        </p>
        <br />
      </header>

      <a href="/chat">
        <em>Back to chat app.</em>
      </a>
    </>
  );
}

function Edit() {
  function handleFormSubmit(event) {
    event.preventDefault();
    let username = document.getElementById("usernameInput").value;
    let bio = document.getElementById("bioInput").value;
    let user = JSON.parse(localStorage.getItem("user")) || {};
    let uuid = user.uuid || chance.guid();
    let useridentifier = user.ugn || chance.integer({ min: 1000, max: 9999 });
    let UserModel = {
      disName: username,
      uuid: uuid,
      ugn: useridentifier,
      bio: bio,
    };
    localStorage.setItem("user", JSON.stringify(UserModel));
    window.location = "/chat";
  }

  return (
    <>
      <form onSubmit={(e) => handleFormSubmit(e)} action="" id="userForm">
        <input
          placeholder="Username..."
          id="usernameInput"
          maxlength="20"
          type="text"
          required
        />
        <input placeholder="Bio..." id="bioInput" type="text" />
        <input type="submit" />
      </form>
    </>
  );
}

export { Chat, Intro, Profile, Edit };