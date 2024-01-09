import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addDependencyScripts } from "../utility.js";

import './App.css';
import './Message.css'

function Chat() {
  // Call this shit FedEx
class MailSystemClass {
  constructor() {
    // this is where id put my shared mailing resources...
    // ...if i had any!!!
  }
}

class MailmanClass extends MailSystemClass {
  constructor(pkgtype, message, user, room, attaachment) {
    super();
    this.pkgtype = pkgtype;
    switch (this.pkgtype) {
      case "message":
        this.message = message;
        //this.attachment = attachment;
        this.room = room;

        this.pkg = {
          message: this.message,
          date: Date.now(),
          room: this.room,
          user: user,
          //attachment: attachment
        };
        break;
      case "join":
        this.room = room;
        this.preroom = message;

        this.pkg = {
          room: this.room,
          preroom: this.preroom,
          user: user,
        };
        room = this.room;
        break;
      case "command":
        this.callback = message;
        this.type = user;

        this.pkg = {
          callback: this.callback,
          type: this.type,
        };
        break;
    }
  }

  send() {
    switch (this.pkgtype) {
      case "message":
        socket.emit("messages", this.pkg);
        let element = document.getElementById("appendto");
        element.scrollTop = element.scrollHeight - element.clientHeight;
        break;
      case "join":
        socket.emit("join", this.pkg);
        break;
      case "command":
        socket.emit("command", this.pkg);
        break;
    }
  }
}

let has_focus;

class MailboxClass extends MailSystemClass {
  constructor() {
    super();
  }

  append(pkg) {
    let element = document.getElementById("appendto");
    let isScrolledToBottom =
      element.scrollHeight - element.clientHeight <= element.scrollTop + 1;
    $("#appendto").append(pkg);
    if (isScrolledToBottom) {
      element.scrollTop = element.scrollHeight - element.clientHeight;
    }
  }

  sendNotif(pkg) {
    if (Notification.permission == "granted" && !notifMuted) {
      if (!document.hasFocus()) {
        new Notification(pkg.user.disName + "@" + pkg.user.ugn, {
          body: pkg.message,
        });
      }
    }
  }
}

const MailSystem = new MailSystemClass();
const Mailbox = new MailboxClass();

  useEffect(() => {
    let notifMuted, loggedIn;
let alreadyConnected = false;
let room = "::GENERAL";

if (localStorage.getItem("readrules") == undefined) {
  window.location = "/rules";
}

let User;
if (localStorage.getItem("user") == undefined) {
  window.location = "/profile/edit";
} else {
  User = JSON.parse(localStorage.getItem("user"));
}

const socket = io("https://callmeclover.serv00.net");

socket.on("connect", function (data) {
  if (!alreadyConnected) {
    let Mailman = new MailmanClass("join", "", User, room);
    if (!(User.disName == undefined)) {
      Mailman.send();
      alreadyConnected = !alreadyConnected;
    }
  }
});

document.getElementById("chatSubmit").onclick = function (e) {
  e.preventDefault();

  let message = $("#chatInput").val();

  if (!message.replace(/\s/g, "").length) {
    /* empty */
  } else {
    document.getElementById("chatInput").value = "";

    let Mailman = new MailmanClass("message", message, User, room);
    Mailman.send();
  }
};

$("#chatInput").keypress(function (e) {
  if (e.which === 13 && !e.shiftKey) {
    e.preventDefault();

    let message = $("#chatInput").val();

    if (!message.replace(/\s/g, "").length) {
      /* empty */
    } else {
      document.getElementById("chatInput").value = "";

      let Mailman = new MailmanClass("message", message, User, room);
      Mailman.send();
    }
  }
});

socket.on("broad", function (data) {
  Mailbox.append(data);
});

socket.on("notification", function (data) {
  Mailbox.sendNotif(data);
});

    // Clean up the script when the component is unmounted
    return () => {
      socket.disconnect()
    };
  }, [MailSystem, Mailbox]);

  return (
    <>
      <MessageContainer />
      <div id="chatForm">
        <textarea
          placeholder="This field supports Markdown!! 2000 character limit."
          id="chatInput"
          type="text"
          maxLength="2000"
        ></textarea>
<input type="file" id="selectedFile" accept="image/*" />
<button className="chatFiles" onClick={() => document.getElementById('selectedFile').click() }>Browse...</button>
        <button id="chatSubmit">&gt;&gt;</button>
      </div>
    </>
  );
}

function MessageContainer() {
  return (
    <div id="appendto" className="chatContainer"></div>
  );
}

function Intro() {
  return (
    <>
      <div className='titleContainer'>
    <h3>An excellent free chat app.</h3>
    </div>

    <p>Currently in development.</p>

    <a href="/chat"><em>Proceed to chat app.</em></a>
    </>
  );
}

function Profile() {
  let params = useParams();

  return (
    <>
      <header className="titleContainer">
      <h2 id="user" style={{margin:0}}>{ params.user }</h2><br/>
      <p id="bio" style={{margin:0}}>Bios have been temporarily removed. Sorry!</p><br/>
      </header>


      <a href="/chat">
        <em>Back to chat app.</em>
      </a>
    </>
  );
}

function Edit() {
  useEffect(() => {
    let dependencies = ["./scripts/jquery.validate.min.js"];
    let scripts = addDependencyScripts(dependencies);

    // Clean up the script when the component is unmounted
    return () => {
      scripts.forEach((script)=>{
        document.body.removeChild(script);
      })
    };
  }, []);

  function handleFormSubmit(event) {
    event.preventDefault();
    let username = $("#usernameInput").val();
    let bio = $("#bioInput").val();
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
      <form onSubmit={(e)=>handleFormSubmit(e)} action="" id="userForm">
      <input placeholder='Username...' id="usernameInput" maxlength='20' type="text" required />
      <input placeholder='Bio...' id="bioInput" type="text" />

      <input type="submit" />
    </form>
    </>
  );
}
            
export { Chat, Intro, Profile, Edit };
