const mongoose = require('mongoose')
const recipeSchema = new mongoose.Schema({ 
    title:{ 
        type:String , 
        required:true, 
    }, 
    ingredients:{ 
        type:String, 
        required:true 
    }, 
    instructions:{ 
        type:String , 
        required:true 
    },
    image: String ,
    description:String 
})
module.exports = mongoose.model('Recipe',recipeSchema)