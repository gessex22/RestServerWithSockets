const { Socket } = require("dgram")

const socketController =  (socket = new Socket) => {

    console.log('cliente conectado')
}

module.exports = {

    socketController
}