const url = window.location.hostname.includes("localhost")
  ? "http://localhost:8000/api/auth"
  : "http:urldelservidor/gesse/";

const socket = io();
let user = null;
let sockets = null;

const textUid = document.getElementById("#textUid");
const textMessage = document.querySelector("#textMessage");
const ulUsers = document.querySelector("#ulUsers");
const ulMessage = document.querySelector("#ulMessage");
const btnExit = document.querySelector("#btnExit");

const validateJWTStorage = async () => {
  const tokenClient = localStorage.getItem("token") || "";
  if (tokenClient.length <= 10) {
    window.location = "index.html";
    throw new Error(" not token in server");
  }

  const resp = await fetch(url, {
    headers: { "x-token": tokenClient },
  });

  const { user: usuarioDB, token: tokenDB } = await resp.json();
  localStorage.setItem("token", tokenDB);
  user = usuarioDB;
  document.title = user.name;
  await conectSocket();
};

const conectSocket = async () => {
  const socket = io({
    extraHeaders: { "x-token": localStorage.getItem("token") },
  });

  socket.on("connect", () => {
    console.log("Conexion succesfull with server ");
  });

  socket.on("disconnect", () => {
    console.log("Conexion lost with server jaja ");
  });

  socket.on("recive-message", () => {});

  socket.on("active-users", printUsers);

  socket.on("private-message", () => {});
};

const printUsers = (users = []) => {
  let usertsHTML = "";
  console.log(users)

  users.forEach(({ name, uid }) => {
    usertsHTML += `
    <li> 
        <p>
          <h5 class= 'text-success'> ${name}  </h5>
          <spam class='fs-6 text-muted'> ${uid}  </spam>
    `;
  });


    ulUsers.innerHTML = usertsHTML
};

const main = async () => {
  await validateJWTStorage();
};

main();
