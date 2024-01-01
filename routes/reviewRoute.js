const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const Review = require('../models/Review')
const Recipe = require('../models/Recipe')
const isLoggedIn = require('../middleware')
const {postReview} = require('../controllers/Reviews')
router.post('/recipe/:id/reviews',isLoggedIn,postReview)
 router.delete('/recipe/:id/reviews/:reviewId',isLoggedIn,catchAsync(async(req,res)=>{ 
     const {id,reviewId} = req.params
     const review = await Review.findById(reviewId) 
     if(!review.author.equals(req.user._id))
     { 
        req.flash('error',"You cannot do that")
        return res.redirect(`/recipe/${id}`)
     }
      await Recipe.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
     await Review.findByIdAndDelete(reviewId) 
     res.redirect(`/recipe/${id}`) 
 }))
 module.exports= router 