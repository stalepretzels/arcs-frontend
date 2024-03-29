import "./Sidebar.css";
import { MenuIconButton } from "../components/Input/Input.jsx";

let room = "::GENERAL";

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
  document.onclick = function (event) {
    if (event.target.classList.contains("vignette")) {
      const menuContainer = document.querySelector(".menuContainer");
      const settingsMenu = document.querySelector(".settingsMenu");
      if (settingsMenu.classList.contains("expanded")) {
        settingsMenu.classList.toggle("expanded");
        if (document.body.classList.contains("vignette")) {
          document.body.classList.toggle("vignette");
        }
      }
      if (menuContainer.classList.contains("expanded")) {
        menuContainer.classList.toggle("expanded");
        if (document.body.classList.contains("vignette")) {
          document.body.classList.toggle("vignette");
        }
      }
    }
  };

  function handleSidebarExpand() {
    const menuContainer = document.querySelector(".menuContainer");
    const settingsMenu = document.querySelector(".settingsMenu");
    menuContainer.classList.toggle("expanded");

    if (!settingsMenu.classList.contains("expanded")) {
      document.body.classList.toggle("vignette");
    }
  }

  function handleSettingsExpand() {
    const menuContainer = document.querySelector(".menuContainer");
    const settingsMenu = document.querySelector(".settingsMenu");
    settingsMenu.classList.toggle("expanded");

    if (!menuContainer.classList.contains("expanded")) {
      document.body.classList.toggle("vignette");
    }
  }

  return (
    <>
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
            ></MenuIconButton>
            Edit profile
          </li>
          <li>
            <MenuIconButton
              onClick={() =>
                window.open("https://github.com/stalepretzels/arcs")
              }
              icon="logo-github"
              size="32px"
            ></MenuIconButton>
            Github
          </li>
          <li>
            <MenuIconButton
              onClick={() => (window.location = "/rules")}
              icon="reader"
              size="32px"
            ></MenuIconButton>
            Rules
          </li>
          <li>
            <MenuIconButton
              onClick={() => (window.location = "/about")}
              icon="information-circle"
              size="32px"
            ></MenuIconButton>
            About
          </li>
          <li>
            <MenuIconButton
              onClick={handleSettingsExpand}
              icon="settings"
              size="32px"
            ></MenuIconButton>
            Settings
          </li>
        </ul>
      </nav>
      <Settings />
    </>
  );
}

function Settings() {
  function handleNotificationButton() {
    if (Notification.permission === "denied") {
      /* nothing */
    } else if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          localStorage.setItem(
            "notifMuted",
            JSON.parse(localStorage.getItem("notifMuted")) || false
          );
          if (JSON.parse(localStorage.getItem("notifMuted"))) {
            document.getElementById("notificationButton").innerHTML =
            '<ion-icon name="notifications-off" style="font-size: 32px"></ion-icon>';
            document.getElementById("notifTxtIndicator").innerText = "off"
          } else if (!JSON.parse(localStorage.getItem("notifMuted"))) {
            document.getElementById("notificationButton").innerHTML =
            '<ion-icon name="notifications" style="font-size: 32px"></ion-icon>';
            document.getElementById("notifTxtIndicator").innerText = "on"
          }
        }
      });
    } else {
      localStorage.setItem(
        "notifMuted",
        !JSON.parse(localStorage.getItem("notifMuted"))
      );
      if (JSON.parse(localStorage.getItem("notifMuted"))) {
        localStorage.setItem("notifMuted", "true");
        document.getElementById("notificationButton").innerHTML =
          '<ion-icon name="notifications-off" style="font-size: 32px"></ion-icon>';
          document.getElementById("notifTxtIndicator").innerText = "off"
      } else if (!JSON.parse(localStorage.getItem("notifMuted"))) {
        localStorage.setItem("notifMuted", "false");
        document.getElementById("notificationButton").innerHTML =
          '<ion-icon name="notifications" style="font-size: 32px"></ion-icon>';
          document.getElementById("notifTxtIndicator").innerText = "on"
      }
    }
  }

  function handleSettingsExpand() {
    const menuContainer = document.querySelector(".menuContainer");
    const settingsMenu = document.querySelector(".settingsMenu");
    settingsMenu.classList.toggle("expanded");

    if (!menuContainer.classList.contains("expanded")) {
      document.body.classList.toggle("vignette");
    }
  }

  return (
    <nav className="settingsMenu">
      <div className="settingsHeader">
        <MenuIconButton
          size="32px"
          icon="close"
          id="closeSettingsButton"
          onClick={handleSettingsExpand}
        ></MenuIconButton>
      </div>
      <ul className="menuList">
        <li>
          <MenuIconButton
            id="notificationButton"
            onClick={handleNotificationButton}
            icon="notifications"
            size="32px"
          ></MenuIconButton>
          Notifications&nbsp;<span id="notifTxtIndicator"></span>
        </li>
      </ul>
    </nav>
  );
}

export { Sidebar };
