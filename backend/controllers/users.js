const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

userRouter.post('/', async (request, response) => {
    const {username, password} = request.body

    try {
        if(!password || password.length < 3) {
            return response.status(400).json({error : 'Пароль должен быть хотя бы из 3 символов'})
            }
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(password, saltRounds)
            const user = new User({
                username,
                passwordHash
            })
            const savedUser = await user.save()
            response.status(201).json(savedUser)
    }
    catch (error) {
        logger.error(error)
        response.status(400).json({error: error})
        console.log(error)
    }
})

module.exports = userRouter