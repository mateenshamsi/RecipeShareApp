const express = require('express')
const route = express.Router()
const catchAsync = require('../utils/catchAsync')
const Recipe = require('../models/Recipe')
const ExpressError = require('../utils/ExpressError')
route.get('/',catchAsync(async(req,res,next)=>{ 
    const recipies = await Recipe.find({})
    res.render('Recipie/recipies',{recipies})
})) 

route.get('/new',catchAsync(async(req,res)=>{ 
    
    res.render('Recipie/new')
})) 
route.post('/',catchAsync(async(req,res,next)=>{
     if(!req.body.recipe) throw new ExpressError(404,"Not valid")
      const recipe = new Recipe(req.body.recipe)
        await recipe.save()
        req.flash('success','Successfully made a new recipe')
        res.redirect(`/recipe/${recipe._id}`)      

})) 
route.get('/:id',catchAsync(async(req,res)=>{ 
    const {id} = req.params 
    const recipie = await Recipe.findById(id).populate('reviews')


    res.render('Recipie/show',{recipie})
})) 
route.get('/:id/edit',catchAsync(async(req,res)=>{ 
    const {id} = req.params 
    const recipe = await Recipe.findById(id)
    
    
    res.render('Recipie/edit',{recipe})
})) 
 
route.put('/:id',catchAsync(async(req,res)=>{ 
    const {id} = req.params 
   const recipe =await  Recipe.findByIdAndUpdate(id,{...req.body.recipe})
   req.flash('success',`Successfully edited  ${recipe.title} recipe`)
  
   res.redirect(`/recipe/${recipe._id}`)
}))
route.delete('/:id',catchAsync(async(req,res)=>{ 
    const {id} = req.params 
    await Recipe.findByIdAndDelete(id)
    req.flash('success',`Successfully deleted  recipe`)
  
    res.redirect('/recipe')
})) 
module.exports = route 