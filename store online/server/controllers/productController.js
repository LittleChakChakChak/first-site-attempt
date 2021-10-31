const ApiError = require('../error/ApiError')
const {Product} = require('../models/models')

class ProductController {
    async create(req, res, next) {
        try {
            const {name, quantity, pieces, price, autoId, typeId} = req.body
            const product = await Product.create({name, quantity, pieces, price, autoId, typeId})

            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message()))
        }
    }

    async getAll(req,res) {
        const {autoId, typeId} = req.query
        let product;
        if(autoId && typeId) {
            product = await Product.findAll({autoId, typeId})
        }

        return res.json(product)

    }

    async getOne(req, res) {
        const {id} = req.params
        const product = await Product.findOne({where: {id}})
        return res.json(product)
    }
}

module.exports = new ProductController()


