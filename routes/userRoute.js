const express = require('express')
const router = express.Router()
const User = require('../models/User')
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')
router.get('/register',(req,res)=>{ 
    res.render('User/register')
}) 
router.post('/register',catchAsync(async(req,res)=>{ 
   try{const {username,email,password} = req.body 
   const user = new User({username,email})
   const registeredUser = await User.register(user,password)
   req.login(registeredUser,(err)=>{ 
    if(err)
    { 
        next(err)
    }
    else
    { 
        console.log(registeredUser)
        req.flash('success', 'Welcome to RecipeApp')
        res.redirect('/recipe')
    }
   })
  
}
catch(e)
{ 
    req.flash('error',e)
    res.redirect('/register')
}    
})) 
router.get('/login',(req,res)=>{ 
    res.render('User/login')
})
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),(req, res)=> {
    req.flash('success','Welcome Back')
    res.redirect('/recipe');
  });
router.get('/logout',(req,res)=>{ 
    req.logout((err)=>{ 
        if(err)
        { 
            return next(err)
        }
        req.flash('success','Successfully logged out')
        res.redirect('/recipe')
    })
    
})
module.exports = router 