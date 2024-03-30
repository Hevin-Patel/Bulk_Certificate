const mongoose=require('mongoose')
const joi=require('joi')

let eventSchema=mongoose.Schema({
    Name:String,
    Description:String,
    StartDate:Date,
    EndDate:Date,
    isDeleted:{
        type:Boolean,
        default:false}
})

const createEventJoi=joi.object({
    Name:joi.string().required(),
    Description:joi.string().required(),
    StartDate:joi.date().required(),
    EndDate:joi.date().required()
})

const updateEventJoi=joi.object({
    Name:joi.string(),
    Description:joi.string(),
    StartDate:joi.date(),
    EndDate:joi.date()
})

let event=mongoose.model('Event',eventSchema)

module.exports={event,createEventJoi,updateEventJoi}