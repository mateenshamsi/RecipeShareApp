const express = require('express')
const router = express.Router()
const User = require('../models/User')
router.get('/register',(req,res)=>{ 
    res.render('register')
}) 
