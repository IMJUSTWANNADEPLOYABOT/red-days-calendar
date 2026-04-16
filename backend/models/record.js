const mongoose = require('mongoose')



const recordSchema = new mongoose.Schema({
    date: { type: String, required: true },
    isPeriod: { type: Boolean, default: false },
    hadSex: {
        fact: { type: Boolean, default: false },
        condoms: { type: Boolean, default: true } 
    },
    ovulation: { type: Boolean, default: false },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

recordSchema.set('toJSON', { //это наглая копипаста
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

const Record = mongoose.model('Record', recordSchema)

module.exports = Record