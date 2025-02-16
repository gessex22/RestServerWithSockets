const { Socket } = require("socket.io");
const { checkJWT } = require("../helpers/genJWT");
const { ChatMessage } = require("../models");

const chatMessage = new ChatMessage();

const socketController = async (socket = new Socket(), io) => {
  const userSocket = await checkJWT(socket.handshake.headers["x-token"]);

  if (!userSocket) {
    return socket.disconnect();
  }

  chatMessage.connectUser(userSocket);
  io.emit("active-users", chatMessage.arrUsers);

  socket.on("disconnect", () => {
    chatMessage.disconnectUser(userSocket.id);
    io.emit("active-users", chatMessage.arrUsers);
  });
};

module.exports = {
  socketController
};
