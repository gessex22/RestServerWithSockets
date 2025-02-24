const { Socket } = require("socket.io");
const { checkJWT } = require("../helpers/genJWT");
const { ChatMessage } = require("../models");

const chatMessage = new ChatMessage();

const socketController = async (socket = new Socket(), io) => {
  const userSocket = await checkJWT(socket.handshake.headers["x-token"]);

  if (!userSocket) {
    console.log("error valiadno el socket ex2222025");
    return socket.disconnect();
  }

  chatMessage.connectUser(userSocket);
  io.emit("active-users", chatMessage.arrUsers);
  socket.emit("recive-message", chatMessage.lastTen);

  socket.join(userSocket.id);

  socket.on("disconnect", () => {
    chatMessage.disconnectUser(userSocket.id);
    io.emit("active-users", chatMessage.arrUsers);
  });

  socket.on("recibir-mensaje", ({ uid, message }) => {
    if (uid) {
      socket
        .to(uid)
        .emit("private-message", [{  name: userSocket.name , message }]);
    } else {
      chatMessage.sendMessage(userSocket.id, userSocket.name, message);
      io.emit("recive-message", chatMessage.lastTen);
    }
  });
};

module.exports = {
  socketController,
};
