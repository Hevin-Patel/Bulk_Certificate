const express=require('express')
const MW=require('./MiddleWare')
const {registerCompany,loginCompany,editCompanyDetail}=require('../Controller/CompanyController')

let router=express.Router()

router.post("/registerCompany",registerCompany)
router.post("/loginCompany",loginCompany)
router.put("/editCompanyDetail",MW,editCompanyDetail)

module.exports=router