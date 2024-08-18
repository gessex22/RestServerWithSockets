const {Router } = require('express')
const { userGet, userPut, userPost, userDel, userPatch } = require('../controllers/userController')
const { check } = require('express-validator')
const { isRole, isExist, isUser } = require('../helpers/dbValidators')


const { esAdminRole,  validarJWT,  validateFields } = require('../middleware')



const router = Router()

router.get('/', userGet)

router.put('/:userId',[
    check('userId','No es un id valido').isMongoId(),
    check('userId').custom(isUser),
    check('rol').custom(isRole),
    validateFields
],userPut)

router.post('/', [ 
    check('name', 'name is required').notEmpty() ,
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(isExist), 
    check('password', 'password is required').isLength({min: 8}),
    check('rol').custom(isRole),
    validateFields
],userPost)

router.patch ('/', userPatch)


router.delete('/:userId', [
    validarJWT, 
    esAdminRole,
    check('userId','No es un id valido').isMongoId(),
    check('userId').custom(isUser),

    validateFields
],userDel)






module.exports = router

