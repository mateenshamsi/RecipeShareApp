const express = require('express')
const router = express.Router()
const User = require('../models/User')
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')

const { renderRegisterForm,registerUser,renderLoginForm,logoutUser} = require('../controllers/User')
router.get('/register',renderRegisterForm) 
router.post('/register',registerUser)

router.get('/login',renderLoginForm)
router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),(req, res)=> {
    req.flash('success','Welcome Back')
    res.redirect('/recipe');
  });
router.get('/logout',logoutUser)
module.exports = router 