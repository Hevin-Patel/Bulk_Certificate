const {event,createEventJoi,updateEventJoi}=require('../Models/EventModel')

const createEvent=(req,res)=>{
    try{
        event.findOne({}).sort({EventId:-1})
        .then((resp)=>{ 
            const {error,value}=createEventJoi.validate({
                EventId:resp.EventId+1,
                Name:req.body.Name,
                Description:req.body.Description,
                StartDate:req.body.StartDate,
                EndDate:req.body.EndDate,
                isDeleted:false
            })
    
            if(error){
                console.log(error)
                res.send({message:"Error In Validating The Event Data...Enter Correct Data."})
            }
            else{
                let Data=new event(value)
    
                Data.save()
                .then(()=>{
                    res.send({message:"Event Registered Successfully."})
                })
                .catch((err)=>{
                    console.log(err)
                    res.send({message:"Error Occur In Register Event..."})
                })
            }
        })
        .catch((err)=>{
            console.log(err)
            res.send({message:"Error Occur In Generating Unique Id By Default..."})
        })
    }
    catch{
        res.send({message:"Server Error"})
    }
}

const readEvent=(req,res)=>{
    try{
        event.find()
        .then((resp)=>{
            for(let i of resp){
                if(i.isDeleted==false){
                    res.send({resp})
                }
            }
            res.send({message:"There Is No Such Event Registered Yet."})
        })
        .catch((err)=>{
            console.log(err)
            res.send({message:"An Error Occur..."})
        })
    }
    catch{
        res.send({message:"Server Error"})
    }
}

const updateEvent=(req,res)=>{
    try{
        const {error,value}=updateEventJoi.validate(req.body)
        if(error){
            console.log(error)
            res.send({message:"Enter Correct Data..."})
        }
        else{
            event.findOne({EventId:req.query.EventId,isDeleted:false})
            .then((resp)=>{
                if(resp){
                    event.updateOne(resp,value)
                    .then(()=>{
                        res.send({message:"Event Details Updated Successfully..."})
                    })
                    .catch((err)=>{
                        console.log(err)
                        res.send({message:"Error In Updating Event."})
                    })
                }
                else{
                    res.send({message:"There Is No Such Event..."})
                }
            })
            .catch((err)=>{
                console.log(err)
                res.send({message:"No Such Event Found..."})
            })
        }
    }
    catch{
        res.send({message:"Server Error"})
    }
}

const deleteEvent=(req,res)=>{
    try{
        event.findOne({EventId:req.query.EventId})
        .then((resp)=>{
            if(resp){
                event.updateOne(resp,{isDeleted:true})
                .then(()=>{
                    res.send({message:"Event Deleted Successfully..."})
                })
                .catch((err)=>{
                    console.log(err)
                    res.send({message:"Error In Deleting Event..."})
                })
            }
            else{
                res.send({message:"There Is No Such Event."})
            }
        })
        .catch((err)=>{
            console.log(err)
            res.send({message:"No Such Event Found..."})
        })
    }
    catch{
        res.send({message:"Server Error"})
    }
}
module.exports={createEvent,readEvent,updateEvent,deleteEvent}