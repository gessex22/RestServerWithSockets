class Message {
  constructor(uid, name, message) {
    this.uid = uid;
    this.name = name;
    this.message = message;
  }
}

class ChatMessage {
  constructor() {
    this.message = [];
    this.users = {};
  }

  get lastTen() {
    return this.message.splice(0, 10);
  }

  get arrUsers() {
    return Object.values(this.users);
  }

  sendMessage(uid, name, message) {
    this.message.unshift(new Message(uid, name, message));
  }

  connectUser(userId) {
    this.users[userId.id] = userId;
  }

  disconnectUser(id) {
  console.log(this.arrUsers.length)
    console.log (delete this.users[id]) ;
      console.log(this.arrUsers.length)
      console.log('fin del metodo')
  }
}

module.exports = ChatMessage
