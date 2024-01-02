const User = require('../models/User')
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')
module.exports.renderRegisterForm = (req,res)=>{ 
    res.render('User/register')
}
module.exports.registerUser = catchAsync(async(req,res)=>{ 
  try{ 
    const {username,email,password} = req.body 
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
})}
catch(e)
{ 
    req.flash('error',e)
    res.redirect('/register')
}    
})
module.exports.renderLoginForm =(req,res)=>{ 
    res.render('User/login')
}
module.exports.logoutUser = (req,res)=>{ 
    req.logout((err)=>{ 
        if(err)
        { 
            return next(err)
        }
        req.flash('success','Successfully logged out')
        res.redirect('/recipe')
    })
    
}