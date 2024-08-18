const express = require('express')
const cors = require('cors')
const { dbconection } = require('../db/configdb')
const fileUpload = require('express-fileupload')
const { socketController } = require('../../sockets/controller')
const dotenv = require('dotenv').config()


class Server{

    constructor(){

        this.app = express()
        this.port = process.env.PORT || 3000
        this.server =  require('http').createServer(this.app)
        this.io = require('socket.io')(this.server)

        this.paths = {
            auth : '/api/auth',
            users : '/api/users',
            category : '/api/category',
            product : '/api/product',
            search : '/api/search',
            upload: '/api/upload',
        }
       
        this.dbConect()
        
        this.middlewares()
        this.routes()
        this.sockets()
        
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
        this.app.use(  fileUpload({
            createParentPath: true,
            useTempFiles: true
        }))
    }

    async dbConect (){
        await dbconection()
    }
    routes(){
        this.app.use(this.paths.auth,require('../routes/auth-routes'))
        this.app.use(this.paths.users, require('../routes/user-routes'))
        this.app.use(this.paths.category, require('../routes/category-routes'))
        this.app.use(this.paths.product, require('../routes/product-routes'))
        this.app.use(this.paths.search,require('../routes/search-routes'))
        this.app.use(this.paths.upload, require('../routes/upload-routes'))
    }

    sockets(){

        this.io.on('connection', socketController)
    }
    
    
    listen(){

        this.server.listen(this.port , ()=>{

            console.log('Servidor REST online en el puerto '+ this.port)
        })
    }
    



    }






module.exports = Server