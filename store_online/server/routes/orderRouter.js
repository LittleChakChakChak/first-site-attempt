const Routes = require('express')
const router = new Routes()
const orderController = require('../controllers/orderController')

router.post('/', orderController.create)
router.get('', orderController.getAll)

module.exports = router