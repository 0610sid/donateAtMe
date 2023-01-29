const mongoose = require('mongoose')
const Schema = mongoose.Schema

const donorSchema = new Schema({
    name : {
        type : String,
        minLength : [4, 'Name should be of atleast 4 letters'],
        required: true
    },
    num : {
        type : Number,
        min : [1000000000, 'Enter a valid phone number'],
        max : [9999999999, 'Enter a valid phone number'],
        required: true
    },
    email : {
        type: String,
        required: true
    },
    quantity : [String]
})

module.exports = mongoose.model('Donor', donorSchema)