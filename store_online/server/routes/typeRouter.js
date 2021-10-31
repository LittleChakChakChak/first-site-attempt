const Routes = require('express')
const router = new Routes()
const typeController = require('../controllers/typeController')

router.post('/', typeController.create)
router.get('', typeController.getAll)

module.exports = router