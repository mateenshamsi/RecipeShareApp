const mongoose = require('mongoose')
const Review = require('./Review')
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
    image: [{ 
        url:String,
        filename:String
        
    }] ,
    description:{
        type: String,
        required:true 
    }  ,
    reviews:[{ 
        type:mongoose.Schema.Types.ObjectId , 
        ref: 'Review'
    }],
    author:{ 
        type:mongoose.Schema.Types.ObjectId ,
        ref:'User' 
    }
})
recipeSchema.post('findOneAndDelete',async(doc)=>{ 
    if(doc){ 
        await Review.deleteMany({ 
            _id:{ 
                $in:doc.reviews
            }
        })
    }
})
module.exports = mongoose.model('Recipe',recipeSchema)