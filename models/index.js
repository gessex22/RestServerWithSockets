// module.exports = const Category = require('./category')
// module.exports = const Role = require('./role')
// module.exports = const Server = require('./server')
// module.exports = const Usuario = require('./user')

const Category = require('./category')
const ChatMessage = require('./chatMessage')
const Role = require('./role')
const Server = require('./server')
const User = require('./user')
const Product = require('./product')


module.exports = {

    Category, Role, Server, User, Product, ChatMessage
}


