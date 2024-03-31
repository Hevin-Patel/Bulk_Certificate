const mongoose=require('mongoose')
const joi=require('joi')

let eventSchema=mongoose.Schema({
    EventName:String,
    EventType:String,
    NoOfParticipants:Number,
    Description:String,
    CreationDate:String,
    isGenerated:{
        type:Boolean,
        default:false},
    isDeleted:{
        type:Boolean,
        default:false}
})

const createEventJoi=joi.object({
    EventName:joi.string().required(),
    EventType:joi.string().required(),
    NoOfParticipants:joi.number(),
    Description:joi.string().required(),
    CreationDate:joi.string().required()
})

const updateEventJoi=joi.object({
    EventName:joi.string(),
    EventType:joi.string(),
    NoOfParticipants:joi.number(),
    Description:joi.string(),
    CreationDate:joi.string()
})

let event=mongoose.model('Event',eventSchema)

module.exports={event,createEventJoi,updateEventJoi}