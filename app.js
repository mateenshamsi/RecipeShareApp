if(process.env.NODE_ENV!=='production')
{ 
    require('dotenv').config()
}
const db_url = process.env.URL ||"mongodb://127.0.0.1:27017/Recipe"
const express = require('express')
const mongoose = require('mongoose') 
const ExpressError = require('./utils/ExpressError') 
const catchAsync = require('./utils/catchAsync')
const reviewRoute = require('./routes/reviewRoute') 
const recipeRoute = require('./routes/recipeRoute')
const userRoute = require('./routes/userRoute')
const Recipe = require('./models/Recipe')
const Review  = require('./models/Review')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const session = require('express-session')
const User = require('./models/User')

const MongoStore = require('connect-mongo');
const store = MongoStore.create({
    mongoUrl: db_url,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'thisisasecret'
    }
});


mongoose.connect(db_url)
 .then(()=>{ 
    console.log("Mongo Connected")
 })
 .catch((e)=>{ 
    console.log(e) 
 })
const methodOverride = require('method-override')
const app = express()
const engine =  require('ejs-mate')
const secret = process.env.SECRET||"thisisasecret"
const sessionConfig = { 
    store,
    secret,
    resave:false,
    saveUninitialized:true,
    cookie:{ 
        expires:Date.now()*1000*60*60*24*7,
        httpOnly:true,
        maxAge:1000*60*60*24*7
    }
}
app.use(session(sessionConfig))
app.use(flash())
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
const path = require('path')
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'YelpCamp',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

module.exports = {
    cloudinary,
    storage
}
app.engine('ejs',engine)
app.use(methodOverride('_method'))
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))

app.use((req,res,next)=>{ 
    res.locals.currentUser = req.user 
   res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    
    next()
}) 
app.get('/',(req,res)=>{ 
    res.render("home")
})
app.use('/recipe',recipeRoute)
app.use('/',reviewRoute)
app.use('/',userRoute)
 

app.all('*',(req,res,next)=>{ 
    next(new ExpressError(404,"Not Found"))  
})
app.use((error,req,res,next)=>{ 
        if(!error.message) error.message="OH NO!!!"

    res.render('error',{error})
})
const port =3000||process.env.PORT 
app.listen(port,()=>{ 
    console.log("listening on port ")
})