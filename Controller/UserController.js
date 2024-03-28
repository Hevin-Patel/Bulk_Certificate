const {user,userCreateJoi,userUpdateJoi}=require('../Models/UserModel')

const createUser=(req,res)=>{
    try{
        user.findOne({}).sort({UserId:-1})
        .then((resp)=>{
            const {error,value}=userCreateJoi.validate({
                UserId:resp.UserId+1,
                EventId:req.body.EventId,
                UserName:req.body.UserName,
                UserEmail:req.body.UserEmail,
                CertificateId:req.body.CertificateId,
                isDeleted:false
            })
    
            if(error){
                console.log(error)
                res.send({message:"Error In Validating The Event Data...Enter Correct Data."})
            }
            else{
                let Data=new user(value)
    
                Data.save()
                .then(()=>{
                    res.send({message:"User Registered Successfully."})
                })
                .catch((err)=>{
                    console.log(err)
                    res.send({message:"Error Occur In Register User..."})
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

const readUser=(req,res)=>{
    try{
        user.find({isDeleted:false})
        .then((resp)=>{
            if(!resp){
                res.send({message:"There Is No Such User..."})
            }
            else{
                res.send(resp)
            }
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

const updateUser=(req,res)=>{
    try{
        const {error,value}=userUpdateJoi.validate(req.body)
        if(error){
            console.log(error)
            res.send({message:"Enter Correct Data..."})
        }
        else{
            user.findOne({UserId:req.query.UserId,isDeleted:false})
            .then((resp)=>{
                if(resp){
                    user.updateOne(resp,value)
                    .then(()=>{
                        res.send({message:"User Updated Successfully..."})
                    })
                    .catch((err)=>{
                        console.log(err)
                        res.send({message:"Error In Updating User."})
                    })
                }
                else{
                    res.send({message:"There Is No Such User"})
                }
            })
            .catch((err)=>{
                console.log(err)
                res.send({message:"No Such User Found..."})
            })
        }
    }
    catch{
        res.send({message:"Server Error"})
    }
}

const deleteUser=(req,res)=>{
    try{
        user.findOne({UserId:req.query.UserId})
        .then((resp)=>{
            if(resp){
                user.updateOne(resp,{isDeleted:true})
                .then(()=>{
                    res.send({message:"User Deleted Successfully..."})
                })
                .catch((err)=>{
                    console.log(err)
                    res.send({message:"Error In Deleting User."})
                })
            }
            else{
                res.send({message:"There Is No Such User"})
            }   
        })
        .catch((err)=>{
            console.log(err)
            res.send({message:"No Such User Found..."})
        })
    }
    catch{
        res.send({message:"Server Error"})
    }
}

const createBulkUser=(req,res)=>{
    let users=req.body.user
    let ErrorFlag=false
    let errorFind

    users.map((value)=>{
        value.isDeleted=false
        const {error}=userCreateJoi.validate(value)
        if(error){
            ErrorFlag=true
            errorFind=error
        }
    })
    if(ErrorFlag){
        res.send({errorFind})
    }
    else{
        users.map((val)=>{
            let AllUsers=new user(val)
            AllUsers.save()
            .then(()=>{})
            .catch((err)=>{
                ErrorFlag=true
                errorFind=err
            })    
        })
        if(ErrorFlag){
            res.send({errorFind})
        }
        else{
            res.send({message:"Users Registerd Successfully."})
        }
    }
}
module.exports={createUser,readUser,updateUser,deleteUser,createBulkUser}