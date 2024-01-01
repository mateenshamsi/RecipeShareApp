const express = require('express')
const mongoose = require('mongoose') 
const ExpressError = require('./utils/ExpressError') 
const catchAsync = require('./utils/catchAsync')
const reviewRoute = require('./routes/reviewRoute') 
const recipeRoute = require('./routes/recipeRoute')
const Recipe = require('./models/Recipe')
const Review  = require('./models/Review')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const session = require('express-session')
const User = require('./models/User')
const userRoute = require('./routes/userRoute')
mongoose.connect('mongodb://127.0.0.1:27017/Recipe')
 .then(()=>{ 
    console.log("Mongo Connected")
 })
 .catch((e)=>{ 
    console.log(e) 
 })
const methodOverride = require('method-override')
const app = express()
const engine =  require('ejs-mate')
const sessionConfig = { 
    secret:"thisisasecret",
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
app.engine('ejs',engine)
app.use(methodOverride('_method'))
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))
app.get('/',(req,res)=>{ 
    res.render("home")
})
app.use((req,res,next)=>{ 
    res.locals.currentUser = req.user 
   res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    
    next()
}) 
app.use('/recipe',recipeRoute)
app.use('/',reviewRoute)
app.use('/',userRoute)
app.get('/newRecipe',catchAsync(async(req,res)=>{ 
  const recipe =   new Recipe({ 
        title: 'Spaghetti Bolognese',
        ingredients: 'Ground beef, onion, garlic, tomato sauce, spaghetti',
        instructions: '1. Cook spaghetti according to package instructions. 2. In a pan, brown ground beef with chopped onions and garlic. 3. Add tomato sauce and simmer. 4. Serve sauce over cooked spaghetti.',
     
          })
          await recipe.save() 
          res.send(recipe)
})) 

app.all('*',(req,res,next)=>{ 
    next(new ExpressError(404,"Not Found"))  
})
app.use((error,req,res,next)=>{ 
        if(!error.message) error.message="OH NO!!!"

    res.render('error',{error})
})

app.listen(3000,()=>{ 
    console.log("listening on port 3000")
})