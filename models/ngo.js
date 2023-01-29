const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')
const Req = require('./req')

const ngoSchema = new Schema({
    name : {
        type : String,
        minLength : [4, 'Name should be of atleast 4 letters'],
        maxLength : 20,
        required : true
    },
    pincode : {
        type : Number,
        min : [100000 , 'Enter a valid pincode'],
        max : [999999 , 'Enter a valid pincode'],
        required : true
    },
    address : {
        type : String,
        minLength : [8, 'Enter a proper address'],
        required : true
    },
    valid : Boolean,
    housing : String,
    num : {
        type : Number,
        min : [1000000000, 'Enter a valid phone number'],
        max : [9999999999, 'Enter a valid phone number'],
        required : true
    },
    email : {
        type : String,
        required : true
    }, 
    ngoreq : [{type: Schema.Types.ObjectId, ref:'Req'}],
    imageurl : String,
    deletedreq : Boolean
})

ngoSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('Ngo',ngoSchema)