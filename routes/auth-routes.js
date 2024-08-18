const {Router } = require('express')
const { userDel } = require('../controllers/userController')
const { check } = require('express-validator')

const { isUser } = require('../helpers/dbValidators')
const { authPost, authGoogle } = require('../controllers/authController')
const {validarJWT, validateFields, tieneRoles,} = require('../middleware')

const router = Router()

// router.get('/', userGet)


router.post('/login', [ 
    check('email','Email is required').notEmpty(),
    check('password','Password is required').notEmpty(),
    validateFields 

],authPost)

router.post('/google', [ 
    check('id_token','id_token es necesario').notEmpty(),
    validateFields 

],authGoogle)

router.delete('/:userId', [
    validarJWT,
    tieneRoles('ADMIN_ROLES','VENTAS_ROLE'),
    check('userId','No es un id valido').isMongoId(),
    check('userId').custom(isUser),
    validateFields
],userDel)

module.exports = router

