const Mongoose = require('mongoose')
const UserSchema = new Mongoose.Schema({
    name: { type: String, required:  true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
})

const User = Mongoose.model('User', UserSchema)
module.exports = User