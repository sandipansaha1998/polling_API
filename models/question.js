const  mongoose = require('mongoose');


//Schema Definition

const QuestionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    options:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Option'
    }]
},{
    timestamps:true
});




//Model Definition
const questions = mongoose.model('Question',QuestionSchema);
module.exports = questions;