const catchAsync = require('../utils/catchAsync')
const Recipe = require('../models/Recipe')
const Review = require('../models/Review')
module.exports.postReview =  catchAsync(async(req,res)=>{ 
    const {id} = req.params 
     const recipe = await Recipe.findById(id)
     const review = new Review(req.body) 
     review.author  = req.user._id 
     recipe.reviews.push(review)
     await   review.save()
 
     await  recipe.save()
     res.redirect(`/recipe/${recipe._id}`) 
 }) 
 module.exports.deleteReview = catchAsync(async(req,res)=>{ 
    const {id,reviewId} = req.params
    const review = await Review.findById(reviewId) 
    if(!review.author.equals(req.user._id))
    { 
       req.flash('error',"You cannot do that")
       return res.redirect(`/recipe/${id}`)
    }
await Recipe.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId) 
    res.redirect(`/recipe/${id}`) })