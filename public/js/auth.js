const myForm = document.querySelector("form");
myForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const formData = {};

  for (let el of myForm.elements) {
    if (el.name.length > 0) formData[el.name] = el.value;
  }

  fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then(
      ({ msg, token }) => {
        if (msg) {
          return console.error(msg);
        }
        localStorage.setItem("token", token);
        window.location = "chat.html";
      }

      //
    )
    .catch((e) => console.log(e));
});

function handleCredentialResponse(response) {
  // decodeJwtResponse() is a custom function defined by you
  // to decode the credential response.
  const bodyT = { id_token: response.credential };
  //console.log(`id token: `, response.credential)           COMEWNTADOOOOOOOOOOOOOOOO

  fetch("http://localhost:8000/api/auth/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyT),
  })
    .then((resp) => resp.json())
    .then((resp) => {
    console.log(resp)
      localStorage.setItem("email", resp.user.email)
      localStorage.setItem("token", resp.token)
      window.location = "chat.html";
    })

    .catch(console.warn);
}

const button = document.getElementById("googleSignOut");

button.onclick = () => {
  google.accounts.id.disableAutoSelect();
  google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
    localStorage.clear();
    location.reload();
  });
};
