const {  v4 : uuidv4 } = require('uuid')
const path = require('path')



const uploadFileH = (files, extenValidation = ['png', 'jpg', 'jpeg','gif'],  dir = '') => {

    return new Promise ( (resolve,reject )=> {

    const {clientFile} = files
    const splitName = clientFile.name.split(`.`)
    const extension = splitName[ splitName.length - 1 ]

    if (!extenValidation.includes(extension)) {  return reject(` extension is not allowed  ${extenValidation}`)   }

    const nameTemp = uuidv4() + '.' + extension
    let uploadPath = path.join( __dirname  ,`../uploads/` , dir , nameTemp)

    clientFile.mv(uploadPath, (err) => {
        reject(`file dont  uploaded to ` + uploadPath + `by ` + err)
    },

    resolve( nameTemp)  )

    })

  }

module.exports = {

    uploadFileH
}