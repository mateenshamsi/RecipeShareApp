const catchAsync = require('../utils/catchAsync')
const Recipe = require('../models/Recipe')
module.exports.showRecipes = catchAsync(async(req,res,next)=>{ 
    const recipies = await Recipe.find({})
    res.render('Recipie/recipies',{recipies})
})
module.exports.createNewRecipe = catchAsync(async(req,res)=>{ 
    
    res.render('Recipie/new')
})
module.exports.createdNewRecipe = catchAsync(async(req,res,next)=>{
    if(!req.body.recipe) throw new ExpressError(404,"Not valid")
     const recipe = new Recipe(req.body.recipe)
    recipe.image = req.files.map(f=>({url:f.path,filename:f.name}))
     recipe.author = req.user 
       await recipe.save()
       console.log(recipe)
       req.flash('success','Successfully made a new recipe')
       res.redirect(`/recipe/${recipe._id}`)      

})
module.exports.showRecipe =catchAsync(async(req,res)=>{ 
    const {id} = req.params 
    const recipie = await Recipe.findById(id).populate({ 
        path:'reviews', 
        populate:{
            path:'author',
            strictPopulate:false
        }
    }).populate('author')
    console.log(recipie)
    if(!recipie)
    { 
        req.flash('error','Can not find Recipie') 
        res.redirect('/recipe')
    }

    res.render('Recipie/show',{recipie})
})
module.exports.renderEditForm = catchAsync(async(req,res)=>{ 
    const {id} = req.params 
    const recipie = await Recipe.findById(id)
    if(recipie.author!==req.user._id)
    { 
        req.flash('error','You cant do this')
        return res.redirect(`/recipe/${recipie._id}`) 
    }
    const recipe = await Recipe.findById(id)
    
    
    res.render('Recipie/edit',{recipe})
})
module.exports.editRecipe = catchAsync(async(req,res)=>{ 
    const {id} = req.params 
    const recipie = await Recipe.findById(id) 
    
       
   const recipe =await  Recipe.findByIdAndUpdate(id,{...req.body.recipe})
   req.flash('success',`Successfully edited  ${recipe.title} recipe`)
   if(!recipie)
    { 
        req.flash('error','Can not edit Recipie') 
        res.redirect('/recipe')
    }
   res.redirect(`/recipe/${recipe._id}`)
})
module.exports.deleteRecipe = catchAsync(async(req,res)=>{ 
    const {id} = req.params 
    const recipie = await Recipe.findById(id)
    if(recipie.author===req.user._id)
    { 
        req.flash('error','You cant do this')
        return res.redirect(`/recipe/${recipie._id}`) 
    }
    
    await Recipe.findByIdAndDelete(id)
    req.flash('success',`Successfully deleted  recipe`)
  
    res.redirect('/recipe')
})