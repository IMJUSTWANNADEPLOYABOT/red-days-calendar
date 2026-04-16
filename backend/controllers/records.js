const recordRouter = require('express').Router()
const Record = require('../models/record')
const logger = require('../utils/logger')

const { userExtractor } = require('../utils/middleware')

recordRouter.get('/', async (request, response) => {
    const user = request.user
    if(!user) {
        return response.status(401).json({error: 'Token missing or expired'})
    }

    const records = await Record.find({user: user._id})

    response.json(records)
}) 

recordRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user

    if (!user) {
        return response.status(401).json({ error: 'Token missing or invalid' })
    }

    // Фильтр: ищем по двум полям одновременно
    const filter = { 
        date: body.date, 
        user: user._id // Используем ID из экстрактора
    }

    // Данные для сохранения
    const update = {
        date: body.date,
        isPeriod: body.isPeriod,
        hadSex: body.hadSex,
        ovulation: body.ovulation,
        user: user._id
    }

    // options: 
    // new: true — вернуть обновленный объект
    // upsert: true — создать новый, если не найден
    const savedRecord = await Record.findOneAndUpdate(filter, update, {
        new: true, 
        upsert: true,
        runValidators: true
    })

    response.status(201).json(savedRecord)
})

module.exports = recordRouter