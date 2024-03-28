const mongoose=require('mongoose')
const joi=require('joi')

let eventSchema=mongoose.Schema({
    EventId:Number,
    Name:String,
    Description:String,
    StartDate:Date,
    EndDate:Date,
    isDeleted:Boolean
})

const createEventJoi=joi.object({
    EventId:joi.number().required(),
    Name:joi.string().required(),
    Description:joi.string().required(),
    StartDate:joi.date().required(),
    EndDate:joi.date().required(),
    isDeleted:joi.boolean().required()
})

const updateEventJoi=joi.object({
    Name:joi.string(),
    Description:joi.string(),
    StartDate:joi.date(),
    EndDate:joi.date()
})

let event=mongoose.model('Event',eventSchema)

module.exports={event,createEventJoi,updateEventJoi}