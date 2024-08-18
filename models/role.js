const {Schema, model} = require('mongoose')



const RoleSchema = Schema({

    Rol :{
        type: String,
        required : [true, 'El rol es requerido ']
    }

})


module.exports= model('Roles', RoleSchema)