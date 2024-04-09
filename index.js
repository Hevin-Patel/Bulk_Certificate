const express=require('express')
const cors=require('cors')
require('dotenv').config()
let Port=process.env.PORT

// const admin=require('./Routers/AdminRoutes')
const company=require('./Routers/CompanyRoutes')
const event=require('./Routers/EventRoutes')
const user=require('./Routers/UserRoutes')
require('./dbconfig')

let app=express()

app.use(express.json())
app.use(cors())
app.set('view engine', 'ejs')
// app.use('/admin' ,admin)
app.use('/company',company)
app.use('/event',event)
app.use('/user',user)

app.listen(Port,()=>{
    console.log("Port Listen At 5000 Port.")
})