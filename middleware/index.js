const  validateFields  = require('./validateFields');
const  validarJWT= require('./validateJWT');
const  validateRol = require('./validateRol');
const validaterFile = require('./validateFile')

module.exports={

    validateFields, validarJWT, ...validateRol, ...validaterFile
}