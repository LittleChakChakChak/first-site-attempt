const Routes = require('express')
const router = new Routes()
const clientController = require('../controllers/clientController')
const authMiddlewere = require('../middleware/authMiddleware')

router.post('/registration', clientController.registration)
router.post('/login', clientController.login)
router.get('/auth', authMiddlewere, clientController.check)

module.exports = router