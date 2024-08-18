const Router = require('express')
const router = Router()
const { uploadFile, updateFile, getFile } = require('../controllers/uploadController')
const { check } = require('express-validator')
const { validateFields, validateFileUpload } = require('../middleware')
const { allowedColletions } = require('../helpers/dbValidators')




router.post('/',validateFileUpload,uploadFile)

router.put('/:collection/:id',[
    validateFileUpload,
    check('id','is not mongoID').isMongoId(),
    check('collection').custom( c => allowedColletions( c , ['users', 'products'])),
    validateFields
], updateFile)


router.get('/:collection/:id', [
    check('id','is not mongoID').isMongoId(),
    check('collection').custom( c => allowedColletions( c , ['users', 'products'])),
    validateFields
], getFile)


module.exports = router

