import './App.css';

function Chat() {
  return (
    <div className="mainContainer">
      <div id="appendto" className="chatContainer"></div>
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
    </div>
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
            
export {Chat, Intro};
