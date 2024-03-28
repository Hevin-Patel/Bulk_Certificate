const mongoose=require('mongoose')

let adminSchema=mongoose.Schema({
    Email:String,
    Password:String
})

module.exports=mongoose.model('admin',adminSchema)