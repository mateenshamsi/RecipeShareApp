const express = require('express')
const route = express.Router()
const catchAsync = require('../utils/catchAsync')
const Recipe = require('../models/Recipe')
const isLoggedIn = require('../middleware')
const {createNewRecipe,showRecipes,showRecipe,createdNewRecipe,renderEditForm,editRecipe,deleteRecipe} = require('../controllers/Recipe')
const ExpressError = require('../utils/ExpressError')
const multer = require('multer')
const {storage} = require('../cloudinary')

const upload = multer({storage})
route.get('/',showRecipes) 

route.get('/new',isLoggedIn,createNewRecipe)

route.post('/',isLoggedIn,upload.array('image'),createdNewRecipe) 
route.get('/:id',showRecipe) 
route.get('/:id/edit',isLoggedIn,renderEditForm) 
 
route.put('/:id',isLoggedIn,upload.array('image'),editRecipe)
route.delete('/:id',isLoggedIn,deleteRecipe) 
module.exports = route 