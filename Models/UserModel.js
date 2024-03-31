const mongoose=require('mongoose')
const joi=require('joi')

let userSchema=mongoose.Schema({
    EventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event'
    },
    UserName:String,
    UserEmail:String,
    Score:Number,
    CertificateId:String,
    isDeleted:{
        type:Boolean,
        default:false}
})

let userCreateJoi=joi.object({
    EventId:joi.string(),
    UserName:joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{1,30}$')).required(),
    UserEmail:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    Score:joi.number().required(),
    CertificateId:joi.string().required(),
    UserName:joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{1,30}$')).required(),
    UserEmail:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    CertificateId:joi.string()
})

let userUpdateJoi=joi.object({
    UserName:joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{1,30}$')),
    UserEmail:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    Score:joi.number(),
    CertificateId:joi.string()
})

let user=mongoose.model('User',userSchema)

module.exports={user,userCreateJoi,userUpdateJoi}