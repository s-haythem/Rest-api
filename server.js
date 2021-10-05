const express = require('express')
const connectDB = require('./config/connectDB')
const USER = require('./models/USER')
const app = express()


connectDB()

app.use(express.json())

// get all users
// http://localhost:5000/all
app.get('/all', (req,res)=> {
    USER.find()
    .then(users => res.send(users))
    .catch(err => console.log(err))
})
// add new user
// http://localhost:5000/add
app.post('/add',(req,res)=>{
    const {name, age, email, phone, address }= req.body
    const newUser= new USER({
        name,age,email,phone,address
    })
    newUser.save()
    .then(user=>res.send(user))
    .catch((err=>console.log(err))) 
  })

// edit user 
//http://localhost:5000/edit/:_id
app.put('/edit/:_id',(req,res)=>{
    const {_id}=req.params
    const {name,age,email,phone,address}=req.body
    USER.findByIdAndUpdate ({_id},{$set:{name,age,email,phone,address}})
    .then(users=>res.send(users))
    .catch((err=>console.log(err)))
  })

  //  delete user
  //  http://localhost:5000/delete/:_id
   app.delete('/delete/:_id',(req,res)=>{
    const {_id}=req.params
    USER.findByIdAndRemove ({_id})
    .then(users=>res.send(users))
    .catch((err=>console.log(err)))
  })




app.listen(5000)