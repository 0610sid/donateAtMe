if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
app.use(express.urlencoded({extended : true}))
const mongoose = require('mongoose');
const path = require('path')
const Pincode = require('./models/pincode')

const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const flash = require('connect-flash')

const DonorRoutes = require('./routes/donor');
const NgoLoginRoutes = require('./routes/ngo');
const AfterLogin = require('./routes/afterlogin')
const AdminRoutes = require('./routes/admin')
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const Ngo = require('./models/ngo');

const MongoStore = require('connect-mongo')(session)

const dburl = process.env.DB_URL

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.static('public'));

// mongodb://127.0.0.1:27017/pincodes

mongoose.connect(dburl)
.then(() => console.log('Mongoup'))
.catch(e => console.log(e));

const store = new MongoStore({
    url : dburl,
    secret : 'heyhello',
    touchAfter: 24*60*60
})

store.on("error", function(e){
    console.log("Session Store Error",e)
})

const sessionConfig = {
    store,
    name: 'session',
    secret: 'mainnhijhukegasala',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24,
    }
}

app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Ngo.authenticate()))

passport.serializeUser(Ngo.serializeUser());
passport.deserializeUser(Ngo.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/',AfterLogin);
app.use('/',NgoLoginRoutes);
app.use('/',DonorRoutes);
app.use('/',AdminRoutes)

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/signup', (req,res) =>{
    res.render('signup')
})

app.get('/aboutus' , (req,res) => {
    res.render('aboutus')
})

app.all('*', (req,res)=>{
    res.status(404).render('notfound')
})

app.use((err, req, res, next) => {
   
    const {statusCode = 500} = err
    if(!err.message)
    {
        err.message = 'Oops, kay tarahi gondal zhala'
    }
    res.status(statusCode).render('error',{err})
});

const port=process.env.PORT || 5030

app.listen(port, () => {
    console.log("5030 ready to rock !! ")
});