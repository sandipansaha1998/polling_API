const Question = require('../../../models/question');
const Option = require('../../../models/option')






// Create question
module.exports.create = async function(req,res){
 try{

    let newQuestion = {
        title:req.body.title,
        options:[]
    }
    console.log(newQuestion)
    let question = await Question.create(newQuestion);
    console.log(question)
    return res.json(200,{
        message:'Question created',
        data:{
            questionID:question.id
        }
    })
 }catch(err){
    console.log(err)
    return res.json(400,{message:
        {
            message:'Bad Request'
    }})}
}
// get Question
module.exports.get = async function(req,res){
    try{
        let questionID = req.query.id;
    let question = await Question.findById(questionID);
    if(!question)
    {
        return res.json(400,{
            message:'No Question Found'
        })
    }
    return res.json(200,{
        message:'Question Found',
        data:question
    })
    }catch(e)
    {
        console.log(e);
        return res.json(400,{message:
            {
                message:'Bad Request'
        }})}

    }
    

// delete
module.exports.delete = async function (req,res){
   let question = await Question.findById(req.query.id);
   console.log(question)
   if(!question)
        return res.status(400).json({
            message:'No data Found'
        })
    

    for(ops of question.options)
        {
         let option = await Option.findById(ops);
         console.log(ops)
         option.deleteOne();
       
        }
    question.deleteOne();

    return res.status(200).json({
        message:'Question and associated options deleted successfully'
    })
 }

