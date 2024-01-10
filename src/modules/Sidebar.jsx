import "./Sidebar.css";
import { MenuIconButton } from "../components/Input/Input.jsx";

let notifMuted = localStorage.getItem("notifMuted") || true,
  room = "::GENERAL";

function joinRoomLogic(rtj) {
  if (room === rtj) {
    // user is already in room
  } else {
    //let Mailman = new MailmanClass("join", room, User, rtj);
    //Mailman.send();
    room = rtj;
  }
}

function Sidebar() {
  function handleNotificationButton() {
    if (Notification.permission === "denied") {
      /* nothing */
    } else if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          notifMuted = false;
          localStorage.setItem("notifMuted", "false");
          document.getElementById("notificationButton").innerHTML =
            '<ion-icon name="notifications" style="font-size: 32px"></ion-icon>';
        }
      });
    } else {
      notifMuted = !notifMuted;
      if (notifMuted === false) {
        localStorage.setItem("notifMuted", "false");
        document.getElementById("notificationButton").innerHTML =
          '<ion-icon name="notifications" style="font-size: 32px"></ion-icon>';
      } else {
        localStorage.setItem("notifMuted", "true");
        document.getElementById("notificationButton").innerHTML =
          '<ion-icon name="notifications-off" style="font-size: 32px"></ion-icon>';
      }
    }
  }

  function handleSidebarExpand() {
    const menuContainer = document.querySelector('.menuContainer');
  menuContainer.classList.toggle('expanded');
  }

  return (
    <nav className="menuContainer">
      <ul className="menuList">
      <li>
          <MenuIconButton
            onClick={handleSidebarExpand}
            icon="menu"
            id="menuExpandBtn"
            size="32px"
          ></MenuIconButton>
        </li>
        <li>
          <MenuIconButton
            onClick={() => (window.location = "/profile/edit")}
            icon="person-circle"
            size="32px"
          ></MenuIconButton>Edit profile
        </li>
        <li>
          <MenuIconButton
            onClick={() => window.open("https://github.com/stalepretzels/arcs")}
            icon="logo-github"
            size="32px"
          ></MenuIconButton>Github
        </li>
        <li>
          <MenuIconButton
            id="notificationButton"
            onClick={handleNotificationButton}
            icon="notifications"
            size="32px"
          ></MenuIconButton>Notifications
        </li>
        <li>
          <MenuIconButton
            onClick={() => (window.location = "/rules")}
            icon="book"
            size="32px"
          ></MenuIconButton>Rules
        </li>
        <li>
          <MenuIconButton
            onClick={() => (window.location = "/about")}
            icon="information-circle"
            size="32px"
          ></MenuIconButton>About
        </li>
        <li>
          <div id="connected" className="menuButton">
            <ion-icon name="cloud" style={{fontSize: '32px'}}></ion-icon>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export { Sidebar };
