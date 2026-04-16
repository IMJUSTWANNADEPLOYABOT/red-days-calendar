const express = require('express')
const config = require('./utils/config')
const logger = require('./utils/logger')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const recordRouter = require('./controllers/records')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const path = require('path')

const app = express()

logger.info('Connecting to...', config.MONGODB_URI)

//дальше идёт коннект к базе данных + рутинг
mongoose
    .connect(config.MONGODB_URI, { family: 4 })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

app.use(express.json())

app.use(middleware.tokenExtractor)

app.use(express.static('dist'))

app.use('/api/users', userRouter)
app.use('/api/period', middleware.userExtractor, recordRouter)
app.use('/api/login', loginRouter)


app.use(middleware.unknownEndpoint)

module.exports = app