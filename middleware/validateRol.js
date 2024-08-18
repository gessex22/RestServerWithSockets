const { response } = require('express')

const esAdminRole = (req,res = response, next ) => {

if (!req.user){
return res.status(500).json({
    msg:' Se requiere verificar el rol sin validar token'

})
}

const  {rol , name } = req.user
if (rol !== 'ADMIN_USER'){

    return res.status(401).json({
        msg: 'No es administrador'
    })
}
    
next()
}

const tieneRoles = (...roles ) => {
    return (req,res = response, next) => {
        if (!req.user ){
            return res.status(500).json({
                msg: "se quiere verificar el role sin validar el token primero"
            })
        }
    
        if (!roles.includes(req.usuario.rol)){
            return res.status(401).json( {
                msg: `no tiene privilegios de ${roles}`
            })
        }
         console.log(roles)
            next()
    }
}


module.exports = {

    esAdminRole,
    tieneRoles
}