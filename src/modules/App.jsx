import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './App.css';
import './Message.css'

function Chat() {
  useEffect(() => {
    // Execute your script or code here
    const script = document.createElement('script');
    script.src = './scripts/chat.js';
    document.body.appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <main className="mainContainer">
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
    </main>
  );
}

function MessageContainer() {
  return (
    <div id="appendto" className="chatContainer"></div>
  );
}

function Intro() {
  return (
    <div>
      <div className='titlecon'>
    <h3>An excellent free chat app.</h3>
    </div>

    <p>Currently in development.</p>

    <a href="/chat"><em>Proceed to chat app.</em></a>
    </div>
  );
}

function Profile() {
  let params = useParams();

  return (
    <div id="profileContainer">
      <header className="titleContainer">
      <h2 id="user" style={{margin:0}}>{ params.user }</h2><br/>
      <p id="bio" style={{margin:0}}>Bios have been temporarily removed. Sorry!</p><br/>
      </header>


      <a href="/chat">
        <em>Back to chat app.</em>
      </a>
    </div>
  );
}

function Edit() {
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
    <div>
      <form onSubmit={(e)=>handleFormSubmit(e)} action="" id="userForm">
      <input placeholder='Username...' id="usernameInput" maxlength='20' type="text" required />
      <input placeholder='Bio...' id="bioInput" type="text" />

      <input type="submit" />
    </form>
    </div>
  );
}
            
export { Chat, Intro, Profile, Edit };
