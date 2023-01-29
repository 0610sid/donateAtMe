const express = require('express');
const app = express();
const { ngoschema } = require('../schema')
const Joi = require('joi')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const Ngo = require('../models/ngo')

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static('../public'));
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')
const router = express.Router()
const validator = require('express-joi-validation').createValidator({})

const ngoValidate = (req, res, next) => {
    const validateuser = new Ngo({
        name: req.body.name,
        pincode: req.body.pin,
        address: req.body.loct,
        username: req.body.uname,
        password: req.body.pass,
        valid: false,
        housing: req.body.hous,
        num: req.body.num,
        email: req.body.email
    })
    const { error } = validator.query(validateuser);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else {
        next();
    }
}

router.get('/login', async (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), catchAsync(async (req, res, next) => {
    const findn = await Ngo.findOne({ username: req.body.username })
    if (findn.valid == true) {
        if (findn.name == "admin") {
            res.redirect('/admin/set/valid')
        }
        else {
            res.redirect('/ngo/raiserequest')
        }
    }
    else if (findn.deletedreq) {
        res.redirect('/deletedreq')
    }  
    else {
        res.redirect('/thanks')
    }
}));

router.post('/createacc', ngoValidate, catchAsync(async (req, res, next) => {

    const newUser = new Ngo({
        name: req.body.name,
        pincode: req.body.pin,
        address: req.body.loct,
        username: req.body.uname,
        valid: false,
        housing: req.body.hous,
        num: req.body.num,
        email: req.body.email,
        deletedreq : false,
        imageurl:req.body.imgurl
    })
    const regdata = await Ngo.register(newUser, req.body.password)
    passport.use(new LocalStrategy(Ngo.authenticate()));
    req.flash('success', 'We will contact you Soon')
    res.redirect('/thanks')
}))


router.post('/logout', async (req, res) => {

    req.logOut(function (err) {
        if (err) {
            return next(err)
        }
        res.redirect('/login')  
    })
})

router.get('/thanks', (req, res) => {
    res.render('thanks');
})

router.get('/deletedreq', (req,res) =>{
    res.render('deletedreq')
})

module.exports = router;