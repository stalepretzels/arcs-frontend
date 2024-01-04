let notifMuted, loggedIn;
let alreadyConnected = false;
let room = "::GENERAL";

if (localStorage.getItem("notifMuted") == undefined) {
  localStorage.setItem("notifMuted", false);
  notifMuted = false;
} else {
  notifMuted = localStorage.getItem("notifMuted");
}

if (localStorage.getItem("readrules") == undefined) {
  window.location = "/rules";
}

let User;
if (localStorage.getItem("user") == undefined) {
  window.location = "/profile/edit";
} else {
  User = JSON.parse(localStorage.getItem("user"));
}

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
          sent: new Date(Date.now()),
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

const socket = io("https://callmeclover.serv00.net");
const MailSystem = new MailSystemClass();
const Mailbox = new MailboxClass();

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

document.arrive("#date", function (element) {
  element.textContent = new Date(Date.now()).toLocaleString();
});

function joinRoomLogic(rtj) {
  if (room == rtj) {
    // user is already in room
  } else {
    let Mailman = new MailmanClass("join", room, User, rtj);
    Mailman.send();
    room = rtj;
  }
}
