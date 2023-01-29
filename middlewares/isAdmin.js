const Ngo = require("../models/ngo")

module.exports.isAdmin = async (req, res, next) => {
    const fid = req.user._id
    const rngo = await Ngo.findById(fid)
    if( rngo.name != "admin")
    {
        res.redirect('/login')
    }
    else{
        next()
    }
}