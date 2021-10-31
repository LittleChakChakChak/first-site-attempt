const {Auto} = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path');

class AutoController {
    async create(req,res,next) {
        const {brand, model, VIN} = req.body

        // фото
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))

        const auto = await Auto.create({brand, model, VIN, img: fileName})

        return res.json(auto)
    }

    async getAll(req,res) {
        const autos = await Auto.findAll()
        return res.json(autos)
    }

}

module.exports = new AutoController()