const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('./config') 
const logger = require('./logger')

const tokenExtractor = (request, response, next) => {
    const token = request.get('authorization')
    if(token && token.startsWith('Bearer ')) {
        request.token = token.replace('Bearer ', '')
    } else {
        request.token = null
    }
    next()
}

const userExtractor = async (request, response, next) => {
    if (request.token) {
        try {
            const decodedToken = jwt.verify(request.token, config.SECRET)
            if (decodedToken.id) {
                request.user = await User.findById(decodedToken.id)
            }
        } catch (error) {
            
            return response.status(401).json({ error: 'token expired or invalid' })
        }
    }
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}


module.exports = {
    unknownEndpoint,
    tokenExtractor,
    userExtractor
}