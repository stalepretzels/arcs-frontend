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
    if (
      Notification.permission == "granted" &&
      !JSON.parse(localStorage.getItem("notifMuted"))
    ) {
      if (!document.hasFocus()) {
        new Notification(pkg.user.disName + "@" + pkg.user.ugn, {
          body: pkg.message,
        });
      }
    }
  }
}

function joinRoomLogic(rtj) {
  if (room == rtj) {
    // user is already in room
  } else {
    Mailman = new MailmanClass("join", room, User, rtj);
    Mailman.send();
    room = rtj;
  }
}

export { MailSystemClass, MailmanClass, MailboxClass };
