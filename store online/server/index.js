require('dotenv').config()
const express = require('express') // подключаем express 
const sequelize = require('./db') // подключение базы
const models = require('./models/models') // подключаем модели базы
const PORT = process.env.PORT || 5000 // получаем значение порта из .env
const cors = require('cors')// подключение пакета корс
const fileUpload = require('express-fileupload')
const router = require('./routes/index') // импорт роутера
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json()) // для парсинга json формата
app.use(express.static(path.resolve(__dirname, 'static'))) // папка со статикой (фото)
app.use(fileUpload({}))
app.use('/api', router)

// Обработка ошибок, последний Middleware
app.use(errorHandler)

/*app.get('/', (req, res) => {
    res.status(200).json({message: "WORKING!!"})
})*/

const start = async () => {
    try {

        await sequelize.authenticate() // установка подключения к БД
        await sequelize.sync() // сверка состояния БД со схемой данных
        app.listen(PORT, () => console.log('Server started on port', PORT)) // запуск сервера
    } catch (e) {
        console.log(e) // ошибки
    }
}

start()