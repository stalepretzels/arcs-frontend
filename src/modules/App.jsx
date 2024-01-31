import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addDependencyScripts, addDependencyScriptsAsync, addDependencyScriptsDefer } from "../utility.js";

import './App.css';
import './Message.css';
import {IconButton} from  '../components/Input/Input.jsx';

function Chat() {
  useEffect(async () => {
    let scriptsAsync = await addDependencyScriptsAsync(["./scripts/arrive.min.js", "./scripts/jquery.min.js", "./scripts/socket.io.min.js"]);
    let scripts = addDependencyScripts(["./scripts/chat.js"]);

    // Clean up the script when the component is unmounted
    return () => {
      scripts.forEach((script)=>{
        document.body.removeChild(script);
      })
      scriptsAsync.forEach((script)=>{
        document.body.removeChild(script);
      })
    };
  }, []);

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
<IconButton size="1.6em" classes="chatFiles button" icon="folder" onClick={() => document.getElementById('selectedFile').click() }></IconButton>
        <IconButton id="chatSubmit" classes="button" size="1.6em" icon="send"></IconButton>
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
    let scripts = addDependencyScriptsDefer(["./scripts/jquery.min.js", "./scripts/chance.min.js"]);
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
