const express=require('express')
const jwt=require('jsonwebtoken')
const loginAdmin=require('../Controller/AdminController')

let router=express.Router()

router.post("/loginAdmin",loginAdmin)

module.exports=router