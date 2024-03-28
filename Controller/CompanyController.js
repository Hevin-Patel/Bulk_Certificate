const {company,loginschema,editschema}=require('../Models/CompanyModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const registerCompany=(req,res)=>{
    try{
        let Pass=req.body.Password
        let encyptedPassword=bcrypt.hashSync(Pass,10)
    
        company.findOne({}).sort({Id:-1})
        .then((resp)=>{
            const {error,value}=loginschema.validate({
                Id:resp.Id+1,
                CompanyName:req.body.CompanyName,
                Password:encyptedPassword,
                Email:req.body.Email,
                PhoneNo:req.body.PhoneNo,
                Address:req.body.Address,
                GST:req.body.GST,
                isDeleted:false
            })
    
            if(error){
                console.log(error)
                res.send({message:"Error In Validating The Register Data...Enter Correct Data."})
            }
            else{
                let Data=new company(value)
    
                Data.save()
                .then(()=>{
                    res.send({message:"Company Registered Successfully."})
                })
                .catch((err)=>{
                    console.log(err)
                    res.send({message:"Error Occur In Register Company..."})
                })
            }
        })
        .catch((err)=>{
            console.log(err)
            res.send({message:"Error Occur In Generating Unique Id By Default..."})
        })
    }
    catch{
        res.send({message:"Server Error..."})
    }
}

const loginCompany=(req,res)=>{
    try{
        let Pass=req.body.Password
        company.findOne({Email:req.body.Email})
        .then((resp)=>{
            let decryptedPassword=bcrypt.compareSync(Pass,resp.Password)
            if(decryptedPassword){
                let token=jwt.sign({Email:resp.Email, Password:resp.Password, Role:"Company"},'heveen',{expiresIn:'10m'})
                console.log(resp)
                res.send({message:"Company Login Successfully",token})
            }
            else{
                res.send({message:"Company Email and Password Not Match..."})
            }
        })
        .catch((err)=>{
            console.log(err)
            res.send({message:"Company Not Found.. Please Register Company First..."})
        })
    }
    catch{
        res.send({message:"Server Error"})
    }
}

const editCompanyDetail=(req,res)=>{
    try{
        const {error,value}=editschema.validate(req.body)
        if(error){
            console.log(error)
            res.send({message:"Enter Correct Data ..."})
        }
        else{
            company.updateOne({Email:req.query.Email},value)
            .then((resp)=>{
                console.log(resp)
                res.send({message:"Details Updated Successfully.."})
            })
            .catch((err)=>{
                console.log(err)
                res.send({message:"An Error Occur In Updating Details Of Company..."})
            })
        }
    }
    catch{
        res.send({message:"Server Error"})
    }
}

const deleteCompany=(req,res)=>{
    try{
        company.findOne({Id:req.query.Id})
        .then((resp)=>{
            if(resp){
                company.updateOne(resp,{isDeleted:true})
                .then(()=>{
                    res.send({message:"Company Deleted Successfully..."})
                })
                .catch((err)=>{
                    console.log(err)
                    res.send({message:"Error In Deleting Company."})
                })
            }
            else{
                res.send({message:"There Is No Such Company"})
            }   
        })
        .catch((err)=>{
            console.log(err)
            res.send({message:"No Such Company Found..."})
        })
    }
    catch{
        res.send({message:"Server Error"})
    }
}

module.exports={registerCompany,loginCompany,editCompanyDetail}