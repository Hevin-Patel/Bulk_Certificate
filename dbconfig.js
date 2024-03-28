const mongoose=require('mongoose')
require('dotenv').config()

let url=process.env.URL
mongoose.connect(url)
.then(()=>{
    console.log("Database Connected Successfully.")
})
.catch((err)=>{
    console.log(err)
})