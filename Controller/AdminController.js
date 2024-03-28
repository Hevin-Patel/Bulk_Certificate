const admin=require('../Models/AdminModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const loginAdmin=(req,res)=>{
    admin.findOne({Email:req.body.Email})
    .then((resp)=>{
        let decryptedPassword=bcrypt.compareSync(req.body.Password,resp.Password)
        if(decryptedPassword){
            let token=jwt.sign({Email:resp.Email, Password:resp.Password, Role:"Admin"},'admin',{expiresIn:'30m'})
            res.send({message:"Admin Login Successfully",token})
        }
        else{
            res.send({message:"Admin Email And Password Not Match..."})
        }
    })
    .catch((err)=>{
        console.log(err)
        res.send({message:"Admin Not Found"})
    })
}

module.exports=loginAdmin