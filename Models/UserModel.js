const mongoose=require('mongoose')
const joi=require('joi')

let userSchema=mongoose.Schema({
    UserId:Number,
    EventId:Number,
    UserName:String,
    UserEmail:String,
    CertificateId:Number,
    isDeleted:Boolean
})

let userCreateJoi=joi.object({
    UserId:joi.number().required(),
    EventId:joi.number().required(),
    UserName:joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{1,30}$')).required(),
    UserEmail:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    CertificateId:joi.number().required(),
    isDeleted:joi.boolean().required()
})

let userUpdateJoi=joi.object({
    EventId:joi.number(),
    UserName:joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{1,30}$')),
    UserEmail:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    CertificateId:joi.number(),
})

let user=mongoose.model('User',userSchema)

module.exports={user,userCreateJoi,userUpdateJoi}