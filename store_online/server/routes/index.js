const Routes = require('express')
const router = new Routes()
const autoRouter = require('./autoRouter') // импорт
const clientRouter = require('./clientRouter')
const historyRouter = require('./historyRouter')
const orderRouter = require('./orderRouter')
const productRouter = require('./productRouter')
const typeRouter = require('./typeRouter')

router.use('/auto', autoRouter)
router.use('/client', clientRouter)
router.use('/history', historyRouter)
router.use('/order', orderRouter)
router.use('/product', productRouter)
router.use('/type', typeRouter)

module.exports = router