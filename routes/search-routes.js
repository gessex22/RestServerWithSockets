const Router = require('express')
const { search } = require('../controllers/searchController')


const router = Router()

router.get('/:collection/:item',search)


module.exports = router

