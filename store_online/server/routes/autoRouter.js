const Routes = require('express')
const router = new Routes()
const autoController = require('../controllers/autoController')

router.post('/', autoController.create)
router.get('', autoController.getAll)

module.exports = router