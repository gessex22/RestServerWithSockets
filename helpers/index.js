const dbValidaros = require("./dbValidators");
const genJWT = require("./genJWT");
const googleVerify = require("./googleVerify");
const uploadFileHelper = require("./uploadFileHelper");

module.exports = {

    ...dbValidaros,
    ...genJWT,
    ...googleVerify,
    ...uploadFileHelper
}