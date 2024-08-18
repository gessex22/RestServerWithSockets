const { response } = require("express");
const User = require('../models/user')
const jwt = require("jsonwebtoken");

const validarJWT = async (req = require,res=response, next) => {

       const token = req.header ('x-token')

       if ( !token ){
        return res.status(401).json ({
            msg: 'chingas a tu mAY por no mandarme el token'
        })
       }

       try {
        const { uid } = jwt.verify(token, process.env.PVKEY)
       const user = await User.findById (uid);

       
        if (!user){
            return res.status(401).json({
                msg: `uid no valido, usuario no existe`
            })
        }
        if (!user.status){
            return res.status(401).json({
                msg: `uid no valido, usuario no valido`
            })

        }
        req.user =user 
        req.test06072024 = '06072024'
       next() 
       } catch (error) {
        console.log(error)
            res.status(401).json({
                msg: `token no valido x-token `
            })
       }
       
}

module.exports = validarJWT