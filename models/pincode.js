const mongoose = require('mongoose')
const Schema = mongoose.Schema

const pinSchema = new Schema({
    pincode : Number,
    region : String,
    nearby : [Number]
})

module.exports = mongoose.model('Pin',pinSchema)