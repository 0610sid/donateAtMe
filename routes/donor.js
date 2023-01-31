if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const Ngo = require('../models/ngo')
const Req = require('../models/req')
const Pin = require('../models/pincode')
const Donor = require('../models/donor')
const catchAsync = require('../utils/catchAsync')

const session = require('express-session')

const MongoStore = require('connect-mongo')(session)
const dburl = process.env.DB_URL

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use(express.static('../public'));
app.set('trust proxy', 1)

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const { default: axios } = require('axios');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })

const router = express.Router()

const store = new MongoStore({
    url : dburl,
    secret : 'heyhello',
    touchAfter: 24*60*60
})

store.on("error", function(e){
    console.log("Session Store Error",e)
})
router.use(session({
    store,
    name : 'session',
    secret: 'thisismysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

router.get('/donate', async (req, res) => {
    res.render('donate')
});

router.get('/search', async (req, res) => {
    
    const query = req.query;
    const area = await Pin.findOne({ pincode: query.pincode })
    if(area){
        const geodata = await geocoder.forwardGeocode({
            query: `${area.region},Mumbai`,
            limit: 1
        }).send()
        const a = geodata.body.features
        const data = [a[0].geometry.coordinates, area.region]
        req.session.pincode = area.pincode;
        res.send(data)
    }
    else{
        res.redirect('/donate')
    }    
})

router.get('/confirmpin', (req, res) => {
    const rpin = req.session.pincode
    res.redirect(`/donate/${rpin}/category`)
})

router.get('/donate/:pin/category', async (req, res) => {
    res.render('chosewhattodonate')
})

router.post('/storeinsession', async (req, res) => {

    req.session.cat = req.body.cat
    req.session.subcat = req.body.subcat
    const rpin = req.session.pincode
    res.redirect(`/donate/${rpin}/requests`)
})

router.get('/donate/:pin/requests', catchAsync(async (req, res) => {
    const { pin } = req.params;
    cat = req.session.cat
    subcat = req.session.subcat

    const searchedpin = await Pin.findOne({ pincode: pin });
    const nearbys = searchedpin.nearby;
    nearbys.push(pin)

    let filtered = []
    Req.find({ subcategory: subcat }, async (err, data) => {
        if (err) {
            res.send(err)
        }
        else {
            for (let j of nearbys) {
                for (let i of data) {
                    const rngo = await Ngo.findById(i.ngo)
                    if (rngo.pincode === j) {
                        await i.populate({
                            path : 'ngo',
                            model : 'Ngo',
                            select : 'name address imageurl'
                        })
                        filtered.push(i)
                    }
                }
            }
            res.render('filteredngo', { filtered })
        }
    })
}));

router.get('/donate/donordetails', async (req, res) => {
    const reqid = req.session.reqid
    const rreq = await Req.findById(reqid)
    await rreq.populate("ngo")
    res.render('ngofullinfo',{rreq})
})

router.post('/donate/reqdet/:id', async (req, res) => {
    const { id } = req.params
    req.session.reqid = id
    res.redirect('/donate/donordetails')
})

router.post('/send/donordetails' , catchAsync(async(req,res) =>{

    const reqid = req.session.reqid
    const rreq = await Req.findById(reqid)

    const newDonor = new Donor({
        name : req.body.name,
        num : req.body.number,
        email : req.body.email,
        quantity : [req.body.quant1,req.body.quant2,req.body.quant3,req.body.quant4,req.body.quant5]
    })
    await newDonor.save()
    rreq.donors.push(newDonor)
    await rreq.save()
    res.redirect('/donate')
}))

module.exports = router