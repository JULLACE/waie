const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    passwordHash: String,
    allergies: [String],
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

        // the PASSWORD HASH SHOULD NOT NEVER BE REVEALED
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)
