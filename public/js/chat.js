const url = window.location.hostname.includes("localhost")
  ? "http://localhost:8000/api/auth"
  : "http:urldelservidor/gesse/";

let user = null;

let socket = null;

const textUid = document.querySelector("#textUid");
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
  socket = io({
    extraHeaders: { "x-token": localStorage.getItem("token") },
  });

  socket.on("connect", () => {
    console.log("Conexion succesfull with server ");
  });

  socket.on("disconnect", () => {
    console.log("Conexion lost with server jaja ");
  });

  socket.on("recive-message", printMessage );

  socket.on("active-users", printUsers);

  socket.on("private-message", printMessage);
};

const printMessage = (message = []) => {
  let messagesHTML = "";


  message.forEach(({ name, message }) => {
  messagesHTML += `
    <li> 
        <p>
          <span class= 'text-primary'> ${name}  </span >
          <span> ${message}  </span>
    `;
  });

  ulMessage.innerHTML =messagesHTML;
};

const printUsers = (users = []) => {
  let usertsHTML = "";
  console.log(users);

  users.forEach(({ name, uid }) => {
    usertsHTML += `
    <li> 
        <p>
          <h5 class= 'text-success'> ${name}  </h5>
          <spam class='fs-6 text-muted'> ${uid}  </spam>
    `;
  });

  ulUsers.innerHTML = usertsHTML;
};




textMessage.addEventListener("keyup", ({ keyCode }) => {
  const message = textMessage.value;
  const uid = textUid.value;

  if (keyCode !== 13) {
    return;
  }
  if (message.length === 0) {
    return;
  }

  socket.emit("recibir-mensaje", { uid, message });

  textMessage.value = "";
});





btnExit.addEventListener('click', ()=> {

    localStorage.removeItem('token');
    window.location = 'index.html';

    
    google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
    localStorage.clear();
    window.location = 'index.html';
    
  });
       
});




const main = async () => {
  await validateJWTStorage();
};

main();
