document
  .getElementById("submitButton")
  .addEventListener("click", function (event) {
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
  });
