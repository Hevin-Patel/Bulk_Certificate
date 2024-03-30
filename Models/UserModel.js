const mongoose=require('mongoose')
const joi=require('joi')

let userSchema=mongoose.Schema({
    EventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event'
    },
    UserName:String,
    UserEmail:String,
    CertificateId:Number,
    isDeleted:{
        type:Boolean,
        default:false}
})

let userCreateJoi=joi.object({
    EventId:joi.required(),
    UserName:joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{1,30}$')).required(),
    UserEmail:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    CertificateId:joi.number().required()
})

let userUpdateJoi=joi.object({
    UserName:joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{1,30}$')),
    UserEmail:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    CertificateId:joi.number(),
})

let user=mongoose.model('User',userSchema)

module.exports={user,userCreateJoi,userUpdateJoi}