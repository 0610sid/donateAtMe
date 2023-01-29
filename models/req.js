const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Donor = require('./donor')
const Ngo = require('./ngo')

const reqSchema = new Schema({
    category :{
        type : String,
        enum :['Books','Food','Sponsorship','Apparel and Toileteries']
    },
    subcategory :{
        type : String,
        enum :['Academic','Unacademic','Food Items','Education','Medical Bills','Recreation for NGO','Household Appliances','Toiletaries','Clothes','Sports Gear']
    },
    item : [String],
    quantity : [String],
    donors : [{type: Schema.Types.ObjectId, ref:'Donor'}],
    ngo : {type:Schema.Types.ObjectId, ref:'Ngo'}    
})

module.exports = mongoose.model('Req',reqSchema)