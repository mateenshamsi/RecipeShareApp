const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const Review = require('../models/Review')
const Recipe = require('../models/Recipe')

router.post('/recipe/:id/reviews',catchAsync(async(req,res)=>{ 
    const {id} = req.params 
     const recipe = await Recipe.findById(id)
     const review = new Review(req.body) 
     recipe.reviews.push(review)
     await   review.save()
 
     await  recipe.save()
     res.redirect(`/recipe/${recipe._id}`) 
 }))
 router.delete('/recipe/:id/reviews/:reviewId',catchAsync(async(req,res)=>{ 
     const {id,reviewId} = req.params
      await Recipe.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
     await Review.findByIdAndDelete(reviewId) 
     res.redirect(`/recipe/${id}`) 
 }))
 module.exports= router 