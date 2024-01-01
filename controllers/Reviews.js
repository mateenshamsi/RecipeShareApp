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