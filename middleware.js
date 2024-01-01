isLoggedIn = (req,res,next)=>{ 
    req.session.returnTo= req.originalUrl 
  
    if(!req.isAuthenticated())
    { 
        req.flash('error','YOu must be logged in')
        return res.redirect('/login')
    }
    next()
}

module.exports= isLoggedIn
