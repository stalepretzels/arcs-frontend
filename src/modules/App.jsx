import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './App.css';

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
  useEffect(() => {
    // Execute your script or code here
    const script = document.createElement('script');
    script.src = './scripts/editProfile.js';
    document.body.appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <form action="" method="get" id="userForm">
      <input placeholder='Username...' id="usernameInput" maxlength='20' type="text" required />
      <input placeholder='Bio...' id="bioInput" type="text" />

      <input type="submit" />
    </form>
    </div>
  );
}
            
export { Chat, Intro, Profile, Edit };
