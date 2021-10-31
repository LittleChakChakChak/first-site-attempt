const Routes = require('express')
const router = new Routes()
const historyController = require('../controllers/hostoryController')

router.post('/', historyController.create)
router.get('', historyController.getAll)

module.exports = router