const express = require('express')
const mongoose = require('mongoose') 
const ExpressError = require('./utils/ExpressError') 
const catchAsync = require('./utils/catchAsync')
const recipeRoute = require('./routes/recipeRoute') 

const Recipe = require('./models/Recipe')
const Review  = require('./models/Review')
 mongoose.connect('mongodb://127.0.0.1:27017/Recipe')
 .then(()=>{ 
    console.log("Mongo Connected")
 })
 .catch((e)=>{ 
    console.log(e) 
 })
const methodOverride = require('method-override')
const app = express()
const engine =  require('ejs-mate')

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
const path = require('path')

app.engine('ejs',engine)
app.use(methodOverride('_method'))
app.set('views',path.join(__dirname,'views'))
app.get('/',(req,res)=>{ 
    res.render("home")
})

app.get('/newRecipe',catchAsync(async(req,res)=>{ 
  const recipe =   new Recipe({ 
        title: 'Spaghetti Bolognese',
        ingredients: 'Ground beef, onion, garlic, tomato sauce, spaghetti',
        instructions: '1. Cook spaghetti according to package instructions. 2. In a pan, brown ground beef with chopped onions and garlic. 3. Add tomato sauce and simmer. 4. Serve sauce over cooked spaghetti.',
     
          })
          await recipe.save() 
          res.send(recipe)
})) 
app.use('/recipe',recipeRoute)
app.post('/recipe/:id/reviews',catchAsync(async(req,res)=>{ 
   const {id} = req.params 
    const recipe = await Recipe.findById(id)
    const review = new Review(req.body) 
    recipe.reviews.push(review)
    await   review.save()

    await  recipe.save()
    res.redirect(`/recipe/${recipe._id}`) 
}))
app.delete('/recipe/:id/reviews/:reviewId',catchAsync(async(req,res)=>{ 
    const {id,reviewId} = req.params
     await Recipe.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId) 
    res.redirect(`/recipe/${id}`) 
}))
app.all('*',(req,res,next)=>{ 
    next(new ExpressError(404,"Not Found"))  
})
app.use((error,req,res,next)=>{ 
        if(!error.message) error.message="OH NO!!!"

    res.render('error',{error})
})

app.listen(3000,()=>{ 
    console.log("listening on port 3000")
})