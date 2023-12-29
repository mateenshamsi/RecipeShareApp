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
    description:{
        type: String,
        required:true 
    }  ,
    reviews:[{ 
        type:mongoose.Schema.Types.ObjectId , 
        ref: 'Review'
    }]
})
module.exports = mongoose.model('Recipe',recipeSchema)