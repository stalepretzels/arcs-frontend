import './App.css';

function Chat() {
  return (
    <div id="container main">
      <div id="appendto"></div>
      <div id="chatform">
        <textarea
          placeholder="This field supports Markdown!! 2000 character limit."
          id="chat_input"
          type="text"
          maxLength="2000"
        ></textarea>
<input type="file" id="selectedFile" accept="image/*" />
<button className="chatfiles" onClick={() => document.getElementById('selectedFile').click() }>Browse...</button>
        <button id="chatsubmit">&gt;&gt;</button>
      </div>
    </div>
  );
}

function Intro() {
  return (
    <div id="container main">
      <div className='titlecon'>
    <h3>An excellent free chat app.</h3>
    </div>

    <p>Currently in development.</p>

    <a href="/chat"><em>Proceed to chat app.</em></a>
    </div>
  );
}

export {Chat, Intro};
