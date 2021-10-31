const sequelize = require('../db')
const {DataTypes} = require('sequelize')

// Создание моделей БД
const Auto = sequelize.define('auto', {
    id_auto: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    brand: {type: DataTypes.STRING, allowNull: false,},
    model: {type: DataTypes.STRING, allowNull: false,},
    VIN: {type: DataTypes.STRING, unique: true, allowNull: false,},
    img: {type: DataTypes.STRING,},
})

const Product = sequelize.define('product', {
    id_auto: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false,},
    quantity: {type: DataTypes.INTEGER, allowNull: false,},
    pieces: {type: DataTypes.INTEGER, defaultValue: 0,},
    price: {type: DataTypes.INTEGER, allowNull: false,},
    auto: {type: DataTypes.INTEGER, allowNull: false,}
})

const BasketProduct = sequelize.define('basket_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    product: {type: DataTypes.INTEGER, allowNull: false,},
    basket: {type: DataTypes.INTEGER, allowNull: false,},
    quantity: {type: DataTypes.INTEGER, allowNull: false,},
})

const Basket = sequelize.define('basket', {
    id_basket: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    client: {type: DataTypes.INTEGER, allowNull: false,},
    price_summary: {type: DataTypes.INTEGER, allowNull: false,},
})

const Client = sequelize.define('client', {
    id_client: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    last_name: {type: DataTypes.STRING, allowNull: false,},
    first_name: {type: DataTypes.STRING, allowNull: false,},
    phone: {type: DataTypes.INTEGER, unique: true, allowNull: false,},
    address: {type: DataTypes.STRING,},
    email: {type: DataTypes.STRING, unique: true, allowNull: false,},
    password: {type: DataTypes.STRING, allowNull: false,}
})

const Order = sequelize.define('order', {
    id_order: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    client: {type: DataTypes.INTEGER, allowNull: false,},
    delivery_date: {type: DataTypes.DATE, allowNull: false,},
    status: {type: DataTypes.STRING, allowNull: false,},
    payment: {type: DataTypes.STRING, allowNull: false,},
    price_summary: {type: DataTypes.INTEGER, allowNull: false,},
    basket: {type: DataTypes.STRING, allowNull: false,}
})

const HistoryOrder = sequelize.define('history_order', {
    id_history: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    order: {type: DataTypes.INTEGER, allowNull: false,}
})

const Type = sequelize.define('type', {
    id_type: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false,},
})

// Создание связей между моделями

Product.hasMany(Auto)
Auto.belongsTo(Product)

BasketProduct.hasMany(Product)
Product.belongsTo(BasketProduct)

BasketProduct.hasMany(Basket)
Basket.belongsTo(BasketProduct)

Basket.hasMany(Client)
Client.belongsTo(Basket)

Order.hasMany(Client)
Client.belongsTo(Order)

Order.hasMany(Basket)
Basket.belongsTo(Order)

HistoryOrder.hasMany(Order)
Order.belongsTo(HistoryOrder)

Product.hasMany(Type)
Type.belongsTo(Product)

// экспорт моделей
module.exports = {
    Auto,
    Product,
    BasketProduct,
    Basket,
    Client,
    Order,
    HistoryOrder,
    Type,
}