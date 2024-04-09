const express=require('express')
const {readUser,updateUser,deleteUser,createBulkUser,downloadCertificate}=require('../Controller/UserController')

let router=express.Router()

// router.post("/createUser",createUser)
router.post("/createBulkUser",createBulkUser)
router.get("/readUser",readUser)
router.put("/updateUser",updateUser)
router.put("/deleteUser",deleteUser)
router.get("/downloadCertificate", downloadCertificate)

module.exports=router