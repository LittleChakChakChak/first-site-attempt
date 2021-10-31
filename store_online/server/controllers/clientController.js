const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Client, Basket} = require('../models/models')

const generateJwt = (id, email) => {jwt.sign(
    {id, email},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
)}

class ClientController {
    async registration(req,res, next) {
        const {email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некоретный email или  пароль'))
        }
        const candidate = await Client.findOne({where:{email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователя с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 2) // хэширование пароля
        const client = await Client.create({email, password: hashPassword})
        const basket = await Basket.create({userId: client.id})
        const token = generateJwt(client.id, client.email)
        return  res.json({token})
    }

    async login(req,res,next) {
        const {email, password} = req.body
        const client = await Client.findOne({where: {email}})
        if (!client) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, client.password)
        if (!comparePassword) {
            return next(ApiError.internal('Неверный пароль'))
        }
        const token = generateJwt(client.id, client.email)
        return res.json({token})

    }

    async check(req,res, next) {
        const token = generateJwt(req.client.id, req.client.email)
        return res.json({token})
    }
}

module.exports = new ClientController()