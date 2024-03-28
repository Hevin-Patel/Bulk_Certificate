const express=require('express')
const MW=require('./MiddleWare')
const {createEvent,readEvent,updateEvent,deleteEvent}=require('../Controller/EventController')

let router=express.Router()

router.post("/createEvent", createEvent)
router.get("/readEvent",readEvent)
router.put("/updateEvent",updateEvent)
router.put("/deleteEvent",deleteEvent)

module.exports=router