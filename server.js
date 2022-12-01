const express = require('express')
const app = express()
const moongoose =  require('mongoose')
app.use(express.json())
const userRoutes = require('./routes/userRoute')
const tourRoutes = require('./routes/tourRoute')

async function connectDB() {
     try{
         moongoose.connect('mongodb://localhost:27017/advance')
         console.log('successful')
     }catch(err){
         console.log(err)
     }
}

connectDB()
app.use('/user',userRoutes)
app.use('/tour',tourRoutes)
app.listen(3000, () =>{
    console.log('all good')
})



