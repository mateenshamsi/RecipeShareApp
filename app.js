const express = require('express')
const mongoose = require('mongoose') 

const Recipe = require('./models/Recipe')
 mongoose.connect('mongodb://127.0.0.1:27017/Recipe')
 .then(()=>{ 
    console.log("Mongo Connected")
 })
 .catch((e)=>{ 
    console.log(e) 
 })

const app = express() 
app.set('view engine','ejs')
const path = require('path')
app.set('views',path.join(__dirname,'views'))
app.get('/',(req,res)=>{ 
    res.render("home")
})
app.get('/recipe',async(req,res)=>{ 
    const recipies = await Recipe.find({})
    res.render('Recipie/recipies',{recipies})
})
app.get('/recipe/:id',async(req,res)=>{ 
    const {id} = req.params 
    const recipie = await Recipe.findById(id)
    res.render('Recipie/show',{recipie})
})
app.get('/newRecipe',async(req,res)=>{ 
  const recipe =   new Recipe({ 
        title: 'Spaghetti Bolognese',
        ingredients: 'Ground beef, onion, garlic, tomato sauce, spaghetti',
        instructions: '1. Cook spaghetti according to package instructions. 2. In a pan, brown ground beef with chopped onions and garlic. 3. Add tomato sauce and simmer. 4. Serve sauce over cooked spaghetti.',
     
          })
          await recipe.save() 
          res.send(recipe)
})

app.listen(3000,()=>{ 
    console.log("listening on port 3000")
})