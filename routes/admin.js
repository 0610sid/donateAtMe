const express = require('express');
const app = express();

const {isLoggedIn}  = require('../middlewares/isLoggedIn')
const {isAdmin} = require('../middlewares/isAdmin')
const Ngo = require('../models/ngo')
const Req = require('../models/req');

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static('../public'));


const router = express.Router()

router.get('/admin/set/valid',isLoggedIn, isAdmin, (req,res)=>{
    Ngo.find({valid : false, deletedreq : false}, (err,data) =>{
        if(err)
        {
            res.send(err)
        }
        else{
            res.render('admin-valid',{data})
        }
    })
})

router.get('/admin/set/all', isLoggedIn, isAdmin, (req,res)=>{
    Ngo.find({deletedreq: false}, (err,data) =>{
        if(err)
        {
            res.send(err)
        }
        else{
            res.render('admin-all',{data})
        }
    })
})

router.get('/admin/set/deleted', isLoggedIn, isAdmin, (req,res)=>{
    Ngo.find({deletedreq: true}, (err,data) =>{
        if(err)
        {
            res.send(err)
        }
        else{
            res.render('admin-deleted',{data})
        }
    })
})

router.get('/allngo',isLoggedIn,isAdmin, (req,res)=>{
    Ngo.find({}, (err,data) =>{
        if(err)
        {
            res.send(err)
        }
        else{
            res.json(data)
        }
    })
})

router.get('/allnotvalid',isLoggedIn,isAdmin, (req,res)=>{
    Ngo.find({valid : false}, (err,data) =>{
        if(err)
        {
            res.send(err)
        }
        else{
            res.json(data)
        }
    })
})

router.get('/alldeleted',isLoggedIn,isAdmin, (req,res)=>{
    Ngo.find({deletedreq : true}, (err,data) =>{
        if(err)
        {
            res.send(err)
        }
        else{
            res.json(data)
        }
    })
})

router.post('/setvalid/:id', isLoggedIn, isAdmin, async(req,res) =>{
    const {id} = req.params
    console.log(id)
    if(req.body.checkbox)
    {
        const rngo = await Ngo.findById(id)
        rngo.valid = !rngo.valid
        await rngo.save()
    }

    res.redirect('/admin/set/valid')
})

router.post('/setdeleted/:id', isLoggedIn, isAdmin, async(req,res) =>{
    const {id} = req.params
    const rngo = await Ngo.findById(id)
    rngo.deletedreq = !rngo.deletedreq
    await rngo.save()
    console.log(rngo)
    res.redirect('/admin/set/valid')
})

router.post('/perdeleted/:id', isLoggedIn, isAdmin, async(req,res) =>{
    const {id} = req.params
    await Ngo.findByIdAndDelete(id)
    console.log("deleted")
    res.redirect('/admin/set/deleted')
})

router.post('/setvalid2/:id', isLoggedIn,isAdmin, async(req,res) =>{
    const {id} = req.params
    const rngo = await Ngo.findById(id)
    rngo.valid = !rngo.valid
    await rngo.save()
    res.redirect('/admin/set/all')
})

module.exports = router;