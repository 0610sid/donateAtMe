const express = require('express');
const app = express();

const {isLoggedIn}  = require('../middlewares/isLoggedIn');
const ngo = require('../models/ngo');
const Ngo = require('../models/ngo')
const Req = require('../models/req')
const Donor = require('../models/donor')

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static('../public'));


const router = express.Router()


router.post('/raiserequest' , async(req, res) =>{
    const fid = req.user._id
    const rngo = await Ngo.findById(fid)

    const item = [req.body.item1 , req.body.item2 , req.body.item3 , req.body.item4 , req.body.item5]
    const quant = [req.body.quant1 , req.body.quant2 , req.body.quant3 , req.body.quant4 , req.body.quant5]

    const newreq = new Req({
        category : req.body.category,
        subcategory : req.body.subcategory,
        item : item,
        quantity : quant,
        ngo : rngo
    })
    await newreq.save()

    rngo.ngoreq.push(newreq)
    await rngo.save()

    res.redirect('/ngo/pendingrequest')
})

router.get('/ngo/raiserequest', isLoggedIn, async(req,res) =>{
    const fid = req.user._id
    const rngo = await Ngo.findById(fid)
    res.render('raiserequest',{rngo})
})

router.get('/ngo/pendingrequest', isLoggedIn, async(req,res) =>{
    const fid = req.user._id
    const rngo = await Ngo.findById(fid)
    await rngo.populate({
        path : 'ngoreq',
        model : 'Req',
        populate : {
            path : 'donors',
            model : 'Donor',
            select : 'name num email quantity'
        }
    })
    res.render('pendingrequest',{rngo})
})

router.get('/ngo/changedetails', isLoggedIn, async(req,res) =>{
    const fid = req.user._id
    const rngo = await Ngo.findById(fid)
    res.render('changedetails', {rngo})
})

router.post('/ngo/delete/req/:reqid' , isLoggedIn , async(req,res) =>{
    const {reqid} = req.params
    const fid = req.user._id
    const rngo = await Ngo.findById(fid)
    await rngo.populate("ngoreq")
    await rngo.updateOne({ $pull :{ngoreq : reqid}})
    await rngo.save()
    const rreq = await Req.findById(reqid)
    await rreq.populate("donors")
    for(i of rreq.donors)
    {
        await Donor.findByIdAndDelete(i._id)
    } 
    await Req.findByIdAndDelete(reqid)
    res.redirect('/ngo/pendingrequest')
})

router.post('/updatedetails', isLoggedIn , async(req,res) =>{
    const fid = req.user._id
    const rngo = await Ngo.findById(fid)
    rngo.num = req.body.phone
    rngo.email = req.body.email
    await rngo.save()
    req.flash('success', 'Updated Details Successfully!')
    res.redirect('/ngo/changedetails')
})

router.get('/ngo/pendingrequest/books' , isLoggedIn, async(req,res) =>{
    const fid = req.user._id
    const rngo = await Ngo.findById(fid)
    await rngo.populate({
        path : 'ngoreq',
        model : 'Req',
        match : {category : 'Books'},
        populate : {
            path : 'donors',
            model : 'Donor',
            select : 'name num email quantity'
        }
    })
    res.render('pendingrequest',{rngo})
})

router.get('/ngo/pendingrequest/food' , isLoggedIn, async(req,res) =>{
    const fid = req.user._id
    const rngo = await Ngo.findById(fid)
    await rngo.populate({
        path : 'ngoreq',
        model : 'Req',
        match : {category : 'Food'},
        populate : {
            path : 'donors',
            model : 'Donor',
            select : 'name num email quantity'
        }
    })
    res.render('pendingrequest',{rngo})
})

router.get('/ngo/pendingrequest/sponsorship' , isLoggedIn, async(req,res) =>{
    const fid = req.user._id
    const rngo = await Ngo.findById(fid)
    await rngo.populate({
        path : 'ngoreq',
        model : 'Req',
        match : {category : 'Sponsorship'},
        populate : {
            path : 'donors',
            model : 'Donor',
            select : 'name num email quantity'
        }
    })
    res.render('pendingrequest',{rngo})
})

router.get('/ngo/pendingrequest/apparel' , isLoggedIn, async(req,res) =>{
    const fid = req.user._id
    const rngo = await Ngo.findById(fid)
    await rngo.populate({
        path : 'ngoreq',
        model : 'Req',
        match : {category : 'Apparel and Toileteries'},
        populate : {
            path : 'donors',
            model : 'Donor',
            select : 'name num email quantity'
        }
    })
    res.render('pendingrequest',{rngo})
})



module.exports = router;