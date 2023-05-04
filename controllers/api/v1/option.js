const Question = require('../../../models/question');
const Option = require('../../../models/option');






module.exports.create = async function(req,res){
    if(!req.params)
        return res.json(400,{
            message:'Bad Request'
        })
        let question = await Question.findById(req.params.id).populate('options');
        if(question == null)
        return res.json(400,{
            message:'No question found'
        })
    let questionJSON = question.toJSON();
    for(ops of questionJSON.options)
    {
        if(ops.title.match(req.body.title)) 
            return res.json(400,{
                message:'Option Exsists'
            });
    }

    let option = await Option.create({
        title:req.body.title,
        question:questionJSON       

    });
    question.options.push(option);
    question.save();
    return res.json(200,{
        message:'Option created',
        data:{
            question:questionJSON,
            option:option
    }});
}

module.exports.delete = async function (req,res) {
    console.log(req.query.id)
    let option = await Option.findById(req.query.id);
    if(option == null)
        return res.status(400).json({
            message:'No data found'
        })
    console.log(option)
    let question_id = option.question;
    let question = await Question.findByIdAndUpdate(question_id,{$pull:{options:option._id}});
    option.deleteOne();
    console.log(question);
    return res.status(200).json({
        message:'Option Deleted'
    })
  }