const  mongoose = require('mongoose');


//Schema Definition

const OptionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
     question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
    },
    votes:{
        type:Number,
        default:0
    }
},{
    timestamps:true
});




//Model Definition
const options = mongoose.model('Option',OptionSchema);
module.exports = options;